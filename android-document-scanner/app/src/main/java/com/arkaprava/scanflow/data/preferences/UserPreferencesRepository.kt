package com.arkaprava.scanflow.data.preferences

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dataStore by preferencesDataStore(name = "scanflow_settings")

enum class AppTheme { SYSTEM, LIGHT, DARK }

@Singleton
class UserPreferencesRepository @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val themeKey = stringPreferencesKey("app_theme")

    val theme: Flow<AppTheme> = context.dataStore.data.map { prefs ->
        val stored = prefs[themeKey]
        stored?.let { runCatching { AppTheme.valueOf(it) }.getOrNull() } ?: AppTheme.SYSTEM
    }

    suspend fun setTheme(theme: AppTheme) {
        context.dataStore.edit { it[themeKey] = theme.name }
    }
}
