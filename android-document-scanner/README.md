# ScanFlow — Android Document Scanner

A native Android app for capturing, organizing, and sharing scanned
documents, built with Kotlin and Jetpack Compose.

## Features

- **Auto-capture scanning** — Google's ML Kit Document Scanner drives the
  capture flow: automatic edge/corner detection, auto-capture, manual
  crop/rotate adjustment, color filters (photo / grayscale / B&W), and
  multi-page capture in a single session, all in its own polished full-screen
  UI (`GmsDocumentScanning`, `SCANNER_MODE_FULL`).
- **Gallery import** — pick existing photos of a document instead of using
  the camera.
- **Add pages later** — reopen any saved document and scan more pages into
  it; the PDF is rebuilt automatically.
- **On-device OCR** — ML Kit Text Recognition extracts text from every page
  so documents are full-text searchable, without any network call.
- **Library** — a searchable, sortable (newest/oldest/name/page count) grid
  of every scanned document with a live thumbnail, plus multi-select batch
  delete.
- **Document viewer** — swipe through pages, delete an individual page
  (the PDF and thumbnail are regenerated), rename the document, share as
  PDF, or print via the system print dialog.
- **Light / dark / system theme**, with Material You dynamic color on
  Android 12+.
- All data stays on-device: pages, the merged PDF, and a thumbnail are
  stored in an app-private directory, indexed by a Room database.

## Tech stack

| Layer            | Choice                                                  |
|-------------------|---------------------------------------------------------|
| Language          | Kotlin                                                   |
| UI                | Jetpack Compose + Material 3                             |
| Navigation        | Navigation Compose                                       |
| DI                | Hilt                                                     |
| Persistence       | Room (document metadata + OCR text index)                |
| Preferences       | Jetpack DataStore (theme)                                |
| Scanning          | ML Kit Document Scanner (`play-services-mlkit-document-scanner`) |
| OCR               | ML Kit Text Recognition                                  |
| Image loading     | Coil                                                     |
| PDF generation    | `android.graphics.pdf.PdfDocument` / `PdfPrintAdapter` for printing |

## Architecture

Simple MVVM, one package per feature:

```
data/
  local/          Room database, DAO, entity
  preferences/     DataStore-backed theme preference
  repository/      DocumentRepository (single source of truth for the UI)
di/                Hilt modules
ocr/               ML Kit text recognition wrapper
pdf/               On-disk storage: page files, merged PDF, thumbnails, printing
scan/              Composable wrapper around the ML Kit scanning intent
ui/
  library/         Document grid, search, sort, batch delete
  detail/          Page viewer, rename, delete page, add pages, share/print
  settings/        Theme picker
  theme/           Compose Material 3 theme
  navigation/       NavHost + routes
```

Each scanned document lives in its own folder under
`context.filesDir/scans/<uuid>/`: `page_01.jpg`, `page_02.jpg`, …,
`document.pdf`, and `thumb.jpg`. Room only stores the folder path plus
metadata (title, page count, OCR text, timestamps), so the page images and
PDF are always regenerated from the same source of truth.

## Building

This project targets **minSdk 26 / compileSdk 34** and uses the Gradle
version catalog (`gradle/libs.versions.toml`). Open the
`android-document-scanner/` folder directly in Android Studio (Koala or
newer) and let it sync, or from the command line:

```bash
./gradlew assembleDebug
```

> **Note:** this project was authored in a sandboxed environment without
> access to Google's Maven repository (`dl.google.com`), so the build could
> not be executed or verified end-to-end here. The Android Gradle Plugin,
> AndroidX, Room, Hilt, and ML Kit are all served from that repository, so
> a real Android Studio / CI environment with normal internet access is
> required to build it. The Gradle wrapper (`gradlew`) is included and
> pinned to Gradle 8.7.

### Permissions

- `CAMERA` — used internally by the ML Kit scanning UI.

No other permissions are required; scanned files are stored in app-private
storage and shared out via a `FileProvider`.

## Possible next steps

- Drag-to-reorder pages within a document.
- Folders/tags for organizing the library beyond search and sort.
- Cloud backup/export (Drive, etc.).
- Custom camera + OpenCV-based capture pipeline as a fallback for devices
  without Google Play services.
