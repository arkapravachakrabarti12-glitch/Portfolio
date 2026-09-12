package com.arkaprava.scanflow.ui.navigation

sealed class Screen(val route: String) {
    data object Library : Screen("library")
    data object Settings : Screen("settings")
    data object DocumentDetail : Screen("document/{documentId}") {
        fun createRoute(documentId: Long) = "document/$documentId"
    }
}
