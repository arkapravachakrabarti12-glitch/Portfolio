package com.arkaprava.scanflow

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import com.arkaprava.scanflow.data.preferences.AppTheme
import com.arkaprava.scanflow.ui.navigation.ScanFlowNavHost
import com.arkaprava.scanflow.ui.settings.SettingsViewModel
import com.arkaprava.scanflow.ui.theme.ScanFlowTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val settingsViewModel: SettingsViewModel = hiltViewModel()
            val theme by settingsViewModel.theme.collectAsState()
            val systemDark = isSystemInDarkTheme()

            ScanFlowTheme(
                darkTheme = when (theme) {
                    AppTheme.SYSTEM -> systemDark
                    AppTheme.LIGHT -> false
                    AppTheme.DARK -> true
                }
            ) {
                ScanFlowNavHost()
            }
        }
    }
}
