package com.arkaprava.scanflow.pdf

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.pdf.PdfDocument
import android.net.Uri
import dagger.hilt.android.qualifiers.ApplicationContext
import java.io.File
import java.io.FileOutputStream
import java.util.UUID
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Owns on-disk storage for scanned documents: a private folder per document
 * holding ordered page_NN.jpg files, a merged document.pdf and a thumb.jpg
 * preview. ML Kit's own result URIs point at its cache, so everything is
 * copied here to survive beyond the scanning session.
 */
@Singleton
class PdfFileManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val rootDir: File
        get() = File(context.filesDir, "scans").apply { mkdirs() }

    fun createDocumentFolder(): File {
        val folder = File(rootDir, UUID.randomUUID().toString())
        folder.mkdirs()
        return folder
    }

    /** Copies a freshly scanned session's pages (and PDF, if provided) into [folder]. */
    fun importScanResult(folder: File, pageUris: List<Uri>, pdfUri: Uri?): List<File> {
        val pageFiles = pageUris.mapIndexed { index, uri ->
            copyUriToFile(uri, File(folder, pageFileName(index + 1)))
        }
        if (pdfUri != null) {
            copyUriToFile(pdfUri, pdfFile(folder))
        } else {
            rebuildPdf(folder, pageFiles)
        }
        generateThumbnail(folder, pageFiles.firstOrNull())
        return pageFiles
    }

    /** Appends a follow-up scan session's pages to an existing document and rebuilds its PDF. */
    fun appendPages(folder: File, newPageUris: List<Uri>) {
        val existingCount = pagesOf(folder).size
        newPageUris.forEachIndexed { index, uri ->
            copyUriToFile(uri, File(folder, pageFileName(existingCount + index + 1)))
        }
        rebuildPdf(folder)
        generateThumbnail(folder, pagesOf(folder).firstOrNull())
    }

    /** Deletes one page image, renumbers the rest and rebuilds the PDF + thumbnail. */
    fun deletePage(folder: File, pageFile: File) {
        pageFile.delete()
        val renumbered = pagesOf(folder).mapIndexed { index, file ->
            val target = File(folder, pageFileName(index + 1))
            if (file != target) file.renameTo(target)
            target
        }
        rebuildPdf(folder, renumbered)
        generateThumbnail(folder, renumbered.firstOrNull())
    }

    fun pagesOf(folder: File): List<File> =
        folder.listFiles { file -> file.name.startsWith("page_") }
            ?.sortedBy { it.name }
            ?: emptyList()

    fun pdfFile(folder: File) = File(folder, "document.pdf")

    fun thumbnailFile(folder: File) = File(folder, "thumb.jpg")

    fun deleteFolder(folder: File) {
        folder.deleteRecursively()
    }

    private fun rebuildPdf(folder: File, pages: List<File> = pagesOf(folder)) {
        val pdfDocument = PdfDocument()
        pages.forEachIndexed { index, pageFile ->
            val bitmap = BitmapFactory.decodeFile(pageFile.path) ?: return@forEachIndexed
            val pageInfo = PdfDocument.PageInfo.Builder(bitmap.width, bitmap.height, index + 1).create()
            val page = pdfDocument.startPage(pageInfo)
            page.canvas.drawBitmap(bitmap, 0f, 0f, null)
            pdfDocument.finishPage(page)
            bitmap.recycle()
        }
        FileOutputStream(pdfFile(folder)).use { pdfDocument.writeTo(it) }
        pdfDocument.close()
    }

    private fun generateThumbnail(folder: File, sourcePage: File?) {
        sourcePage ?: return
        val options = BitmapFactory.Options().apply { inSampleSize = 4 }
        val bitmap = BitmapFactory.decodeFile(sourcePage.path, options) ?: return
        FileOutputStream(thumbnailFile(folder)).use { out ->
            bitmap.compress(Bitmap.CompressFormat.JPEG, 80, out)
        }
        bitmap.recycle()
    }

    private fun copyUriToFile(uri: Uri, destination: File): File {
        context.contentResolver.openInputStream(uri)?.use { input ->
            destination.outputStream().use { output -> input.copyTo(output) }
        }
        return destination
    }

    private fun pageFileName(pageNumber: Int) = "page_%02d.jpg".format(pageNumber)
}
