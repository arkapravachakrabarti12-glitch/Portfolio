package com.arkaprava.scanflow.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.arkaprava.scanflow.data.local.dao.DocumentDao
import com.arkaprava.scanflow.data.local.entity.ScannedDocument

@Database(entities = [ScannedDocument::class], version = 1, exportSchema = false)
abstract class ScanFlowDatabase : RoomDatabase() {
    abstract fun documentDao(): DocumentDao
}
