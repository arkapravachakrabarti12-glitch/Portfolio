package com.arkaprava.scanflow.ui.theme

import android.os.Build
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val LightColors = lightColorScheme(
    primary = ScanBlue40,
    secondary = ScanGreen40,
    background = Neutral99,
    surface = Neutral99,
    surfaceVariant = Neutral95,
    onBackground = Neutral10,
    onSurface = Neutral10
)

private val DarkColors = darkColorScheme(
    primary = ScanBlue80,
    secondary = ScanGreen80,
    background = Neutral10,
    surface = Neutral20,
    surfaceVariant = Neutral20,
    onBackground = Neutral90,
    onSurface = Neutral90
)

@Composable
fun ScanFlowTheme(
    darkTheme: Boolean,
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val context = LocalContext.current
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ->
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        darkTheme -> DarkColors
        else -> LightColors
    }
    MaterialTheme(
        colorScheme = colorScheme,
        typography = ScanFlowTypography,
        content = content
    )
}
