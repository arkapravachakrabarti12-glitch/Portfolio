package com.arkaprava.scanflow.ocr

import android.graphics.BitmapFactory
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import java.io.File
import javax.inject.Inject
import javax.inject.Singleton

/** On-device text recognition used to make scanned documents full-text searchable. */
@Singleton
class TextRecognitionHelper @Inject constructor() {

    private val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

    suspend fun recognizeText(pages: List<File>): String = withContext(Dispatchers.Default) {
        pages.mapNotNull { file ->
            runCatching {
                val bitmap = BitmapFactory.decodeFile(file.path) ?: return@runCatching null
                val text = recognizer.process(InputImage.fromBitmap(bitmap, 0)).await().text
                bitmap.recycle()
                text
            }.getOrNull()
        }.filter { it.isNotBlank() }.joinToString(separator = "\n")
    }
}
