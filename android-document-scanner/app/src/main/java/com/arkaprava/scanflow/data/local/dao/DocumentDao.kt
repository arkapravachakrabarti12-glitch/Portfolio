package com.arkaprava.scanflow.data.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.arkaprava.scanflow.data.local.entity.ScannedDocument
import kotlinx.coroutines.flow.Flow

@Dao
interface DocumentDao {

    @Query("SELECT * FROM documents ORDER BY updatedAt DESC")
    fun observeAll(): Flow<List<ScannedDocument>>

    @Query(
        """
        SELECT * FROM documents
        WHERE title LIKE '%' || :query || '%' OR ocrText LIKE '%' || :query || '%'
        ORDER BY updatedAt DESC
        """
    )
    fun search(query: String): Flow<List<ScannedDocument>>

    @Query("SELECT * FROM documents WHERE id = :id")
    fun observeById(id: Long): Flow<ScannedDocument?>

    @Query("SELECT * FROM documents WHERE id = :id")
    suspend fun getById(id: Long): ScannedDocument?

    @Insert
    suspend fun insert(document: ScannedDocument): Long

    @Update
    suspend fun update(document: ScannedDocument)

    @Delete
    suspend fun delete(document: ScannedDocument)
}
