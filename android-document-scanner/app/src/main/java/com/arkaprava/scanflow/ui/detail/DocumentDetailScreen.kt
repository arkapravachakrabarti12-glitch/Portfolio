package com.arkaprava.scanflow.ui.detail

import android.content.Context
import android.content.Intent
import android.print.PrintAttributes
import android.print.PrintManager
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddAPhoto
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.DeleteOutline
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Print
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.core.content.FileProvider
import androidx.hilt.navigation.compose.hiltViewModel
import coil.compose.AsyncImage
import com.arkaprava.scanflow.R
import com.arkaprava.scanflow.pdf.PdfPrintAdapter
import com.arkaprava.scanflow.scan.rememberDocumentScannerLauncher
import kotlinx.coroutines.launch
import java.io.File

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DocumentDetailScreen(
    onBack: () -> Unit,
    viewModel: DocumentDetailViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    var showRenameDialog by remember { mutableStateOf(false) }
    var showDeleteDialog by remember { mutableStateOf(false) }

    val addPages = rememberDocumentScannerLauncher(
        onResult = { result -> viewModel.appendScanResult(result) }
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(uiState.document?.title.orEmpty()) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = stringResource(R.string.back))
                    }
                },
                actions = {
                    IconButton(onClick = { showRenameDialog = true }) {
                        Icon(Icons.Filled.Edit, contentDescription = stringResource(R.string.rename))
                    }
                    IconButton(onClick = {
                        uiState.document?.let { document ->
                            val pdfFile = File(document.folderPath, "document.pdf")
                            if (pdfFile.exists()) sharePdf(context, pdfFile)
                        }
                    }) {
                        Icon(Icons.Filled.Share, contentDescription = stringResource(R.string.share))
                    }
                    IconButton(onClick = {
                        uiState.document?.let { document ->
                            val pdfFile = File(document.folderPath, "document.pdf")
                            if (pdfFile.exists()) printPdf(context, pdfFile, document.title)
                        }
                    }) {
                        Icon(Icons.Filled.Print, contentDescription = stringResource(R.string.print))
                    }
                    IconButton(onClick = { showDeleteDialog = true }) {
                        Icon(Icons.Filled.Delete, contentDescription = stringResource(R.string.delete))
                    }
                }
            )
        },
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = addPages,
                icon = { Icon(Icons.Filled.AddAPhoto, contentDescription = null) },
                text = { Text(stringResource(R.string.add_pages)) }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize()
        ) {
            if (uiState.isProcessing) {
                LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
            }

            if (uiState.pages.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text(stringResource(R.string.no_pages))
                }
            } else {
                val pagerState = rememberPagerState(pageCount = { uiState.pages.size })
                HorizontalPager(
                    state = pagerState,
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth()
                ) { index ->
                    AsyncImage(
                        model = uiState.pages[index],
                        contentDescription = null,
                        contentScale = ContentScale.Fit,
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(16.dp)
                    )
                }
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(stringResource(R.string.page_indicator, pagerState.currentPage + 1, uiState.pages.size))
                    TextButton(onClick = {
                        uiState.pages.getOrNull(pagerState.currentPage)?.let { page ->
                            viewModel.deletePage(page)
                        }
                    }) {
                        Icon(Icons.Filled.DeleteOutline, contentDescription = null)
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(stringResource(R.string.delete_page))
                    }
                }
            }
        }
    }

    if (showRenameDialog) {
        var text by remember { mutableStateOf(uiState.document?.title.orEmpty()) }
        AlertDialog(
            onDismissRequest = { showRenameDialog = false },
            title = { Text(stringResource(R.string.rename)) },
            text = { OutlinedTextField(value = text, onValueChange = { text = it }, singleLine = true) },
            confirmButton = {
                TextButton(onClick = {
                    viewModel.renameDocument(text.trim())
                    showRenameDialog = false
                }) { Text(stringResource(R.string.save)) }
            },
            dismissButton = {
                TextButton(onClick = { showRenameDialog = false }) { Text(stringResource(R.string.cancel)) }
            }
        )
    }

    if (showDeleteDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteDialog = false },
            title = { Text(stringResource(R.string.delete_document_title)) },
            text = { Text(stringResource(R.string.delete_document_message)) },
            confirmButton = {
                TextButton(onClick = {
                    showDeleteDialog = false
                    coroutineScope.launch {
                        viewModel.deleteDocument()
                        onBack()
                    }
                }) { Text(stringResource(R.string.delete)) }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteDialog = false }) { Text(stringResource(R.string.cancel)) }
            }
        )
    }
}

private fun sharePdf(context: Context, pdfFile: File) {
    val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", pdfFile)
    val intent = Intent(Intent.ACTION_SEND).apply {
        type = "application/pdf"
        putExtra(Intent.EXTRA_STREAM, uri)
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
    }
    context.startActivity(Intent.createChooser(intent, null))
}

private fun printPdf(context: Context, pdfFile: File, title: String) {
    val printManager = context.getSystemService(Context.PRINT_SERVICE) as PrintManager
    printManager.print(title, PdfPrintAdapter(pdfFile, title), PrintAttributes.Builder().build())
}
