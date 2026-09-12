package com.arkaprava.scanflow.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * [folderPath] points at an app-private directory holding this document's
 * page_NN.jpg files, its merged document.pdf and a thumb.jpg preview.
 */
@Entity(tableName = "documents")
data class ScannedDocument(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val folderPath: String,
    val pageCount: Int,
    val ocrText: String,
    val createdAt: Long,
    val updatedAt: Long
)
