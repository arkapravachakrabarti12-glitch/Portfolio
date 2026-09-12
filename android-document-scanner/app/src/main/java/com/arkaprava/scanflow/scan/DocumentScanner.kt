package com.arkaprava.scanflow.scan

import android.app.Activity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.IntentSenderRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import com.google.mlkit.vision.documentscanner.GmsDocumentScanning
import com.google.mlkit.vision.documentscanner.GmsDocumentScannerOptions
import com.google.mlkit.vision.documentscanner.GmsDocumentScanningResult

private fun scannerOptions(): GmsDocumentScannerOptions =
    GmsDocumentScannerOptions.Builder()
        .setGalleryImportAllowed(true)
        .setPageLimit(30)
        .setResultFormats(
            GmsDocumentScannerOptions.RESULT_FORMAT_JPEG,
            GmsDocumentScannerOptions.RESULT_FORMAT_PDF
        )
        .setScannerMode(GmsDocumentScannerOptions.SCANNER_MODE_FULL)
        .build()

/**
 * Wraps Google's ML Kit Document Scanner (auto edge detection, auto capture,
 * manual crop/rotate/filter adjustment and multi-page capture all happen
 * inside its own full-screen UI) behind a single launch callback.
 */
@Composable
fun rememberDocumentScannerLauncher(
    onResult: (GmsDocumentScanningResult) -> Unit,
    onCancelled: () -> Unit = {},
    onError: (Exception) -> Unit = {}
): () -> Unit {
    val activity = LocalContext.current as Activity
    val scanner = remember { GmsDocumentScanning.getClient(scannerOptions()) }

    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.StartIntentSenderForResult()
    ) { activityResult ->
        if (activityResult.resultCode == Activity.RESULT_OK) {
            val scanResult = GmsDocumentScanningResult.fromActivityResultIntent(activityResult.data)
            if (scanResult != null) onResult(scanResult) else onCancelled()
        } else {
            onCancelled()
        }
    }

    return remember {
        {
            scanner.getStartScanIntent(activity)
                .addOnSuccessListener { intentSender ->
                    launcher.launch(IntentSenderRequest.Builder(intentSender).build())
                }
                .addOnFailureListener(onError)
        }
    }
}
