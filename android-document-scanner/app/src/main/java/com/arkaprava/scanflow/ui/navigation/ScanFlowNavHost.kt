package com.arkaprava.scanflow.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.arkaprava.scanflow.ui.detail.DocumentDetailScreen
import com.arkaprava.scanflow.ui.library.LibraryScreen
import com.arkaprava.scanflow.ui.settings.SettingsScreen

@Composable
fun ScanFlowNavHost(navController: NavHostController = rememberNavController()) {
    NavHost(navController = navController, startDestination = Screen.Library.route) {
        composable(Screen.Library.route) {
            LibraryScreen(
                onOpenDocument = { id -> navController.navigate(Screen.DocumentDetail.createRoute(id)) },
                onOpenSettings = { navController.navigate(Screen.Settings.route) }
            )
        }
        composable(
            route = Screen.DocumentDetail.route,
            arguments = listOf(navArgument("documentId") { type = NavType.LongType })
        ) {
            DocumentDetailScreen(onBack = { navController.popBackStack() })
        }
        composable(Screen.Settings.route) {
            SettingsScreen(onBack = { navController.popBackStack() })
        }
    }
}
