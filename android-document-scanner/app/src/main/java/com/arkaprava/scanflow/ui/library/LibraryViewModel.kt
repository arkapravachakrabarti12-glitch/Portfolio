package com.arkaprava.scanflow.ui.library

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
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import javax.inject.Inject

enum class SortOrder { DATE_DESC, DATE_ASC, NAME_ASC, PAGES_DESC }

data class LibraryUiState(
    val documents: List<ScannedDocument> = emptyList(),
    val query: String = "",
    val sortOrder: SortOrder = SortOrder.DATE_DESC,
    val selectedIds: Set<Long> = emptySet(),
    val isProcessing: Boolean = false
) {
    val isSelectionMode get() = selectedIds.isNotEmpty()
}

@HiltViewModel
class LibraryViewModel @Inject constructor(
    private val repository: DocumentRepository,
    private val pdfFileManager: PdfFileManager,
    private val textRecognitionHelper: TextRecognitionHelper
) : ViewModel() {

    private val query = MutableStateFlow("")
    private val sortOrder = MutableStateFlow(SortOrder.DATE_DESC)
    private val selectedIds = MutableStateFlow<Set<Long>>(emptySet())
    private val isProcessing = MutableStateFlow(false)

    @OptIn(kotlinx.coroutines.ExperimentalCoroutinesApi::class)
    val uiState: StateFlow<LibraryUiState> = combine(
        query.flatMapLatest { repository.search(it) },
        query,
        sortOrder,
        selectedIds,
        isProcessing
    ) { docs, currentQuery, sort, selected, processing ->
        LibraryUiState(
            documents = sortDocuments(docs, sort),
            query = currentQuery,
            sortOrder = sort,
            selectedIds = selected,
            isProcessing = processing
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), LibraryUiState())

    private fun sortDocuments(docs: List<ScannedDocument>, order: SortOrder) = when (order) {
        SortOrder.DATE_DESC -> docs.sortedByDescending { it.updatedAt }
        SortOrder.DATE_ASC -> docs.sortedBy { it.updatedAt }
        SortOrder.NAME_ASC -> docs.sortedBy { it.title.lowercase(Locale.getDefault()) }
        SortOrder.PAGES_DESC -> docs.sortedByDescending { it.pageCount }
    }

    fun onQueryChange(value: String) {
        query.value = value
    }

    fun onSortOrderChange(value: SortOrder) {
        sortOrder.value = value
    }

    fun toggleSelection(id: Long) {
        selectedIds.update { current -> if (id in current) current - id else current + id }
    }

    fun clearSelection() {
        selectedIds.value = emptySet()
    }

    fun importScanResult(result: GmsDocumentScanningResult) {
        viewModelScope.launch {
            isProcessing.value = true
            runCatching {
                val pageUris = result.pages.orEmpty().map { it.imageUri }
                if (pageUris.isEmpty()) return@runCatching
                val folder = pdfFileManager.createDocumentFolder()
                val pageFiles = pdfFileManager.importScanResult(folder, pageUris, result.pdf?.uri)
                val ocrText = textRecognitionHelper.recognizeText(pageFiles)
                val now = System.currentTimeMillis()
                val title = "Scan " + SimpleDateFormat("MMM d, yyyy HH:mm", Locale.getDefault()).format(Date(now))
                repository.addDocument(
                    ScannedDocument(
                        title = title,
                        folderPath = folder.path,
                        pageCount = pageFiles.size,
                        ocrText = ocrText,
                        createdAt = now,
                        updatedAt = now
                    )
                )
            }
            isProcessing.value = false
        }
    }

    fun deleteSelected() {
        viewModelScope.launch {
            val toDelete = uiState.value.documents.filter { it.id in selectedIds.value }
            toDelete.forEach { pdfFileManager.deleteFolder(File(it.folderPath)) }
            repository.deleteDocuments(toDelete)
            clearSelection()
        }
    }
}
