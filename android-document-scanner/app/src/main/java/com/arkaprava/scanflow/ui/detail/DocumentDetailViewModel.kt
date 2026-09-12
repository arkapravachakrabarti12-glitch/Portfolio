package com.arkaprava.scanflow.ui.detail

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.arkaprava.scanflow.data.local.entity.ScannedDocument
import com.arkaprava.scanflow.data.repository.DocumentRepository
import com.arkaprava.scanflow.ocr.TextRecognitionHelper
import com.arkaprava.scanflow.pdf.PdfFileManager
import com.google.mlkit.vision.documentscanner.GmsDocumentScanningResult
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.io.File
import javax.inject.Inject

data class DocumentDetailUiState(
    val document: ScannedDocument? = null,
    val pages: List<File> = emptyList(),
    val isProcessing: Boolean = false
)

@HiltViewModel
class DocumentDetailViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val repository: DocumentRepository,
    private val pdfFileManager: PdfFileManager,
    private val textRecognitionHelper: TextRecognitionHelper
) : ViewModel() {

    private val documentId: Long = checkNotNull(savedStateHandle["documentId"])
    private val isProcessing = MutableStateFlow(false)

    val uiState: StateFlow<DocumentDetailUiState> = combine(
        repository.observeDocument(documentId),
        isProcessing
    ) { document, processing ->
        DocumentDetailUiState(
            document = document,
            pages = document?.let { pdfFileManager.pagesOf(File(it.folderPath)) }.orEmpty(),
            isProcessing = processing
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), DocumentDetailUiState())

    fun renameDocument(newTitle: String) {
        if (newTitle.isBlank()) return
        viewModelScope.launch { repository.renameDocument(documentId, newTitle) }
    }

    fun deletePage(page: File) {
        viewModelScope.launch {
            val document = repository.getDocument(documentId) ?: return@launch
            isProcessing.value = true
            val folder = File(document.folderPath)
            pdfFileManager.deletePage(folder, page)
            val remainingPages = pdfFileManager.pagesOf(folder)
            val ocrText = textRecognitionHelper.recognizeText(remainingPages)
            repository.updateDocument(
                document.copy(
                    pageCount = remainingPages.size,
                    ocrText = ocrText,
                    updatedAt = System.currentTimeMillis()
                )
            )
            isProcessing.value = false
        }
    }

    fun appendScanResult(result: GmsDocumentScanningResult) {
        viewModelScope.launch {
            val document = repository.getDocument(documentId) ?: return@launch
            isProcessing.value = true
            val folder = File(document.folderPath)
            val newUris = result.pages.orEmpty().map { it.imageUri }
            pdfFileManager.appendPages(folder, newUris)
            val allPages = pdfFileManager.pagesOf(folder)
            val ocrText = textRecognitionHelper.recognizeText(allPages)
            repository.updateDocument(
                document.copy(
                    pageCount = allPages.size,
                    ocrText = ocrText,
                    updatedAt = System.currentTimeMillis()
                )
            )
            isProcessing.value = false
        }
    }

    suspend fun deleteDocument() {
        val document = repository.getDocument(documentId) ?: return
        pdfFileManager.deleteFolder(File(document.folderPath))
        repository.deleteDocuments(listOf(document))
    }
}
