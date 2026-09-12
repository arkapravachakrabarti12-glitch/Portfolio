package com.arkaprava.scanflow.data.repository

import com.arkaprava.scanflow.data.local.dao.DocumentDao
import com.arkaprava.scanflow.data.local.entity.ScannedDocument
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject
import javax.inject.Singleton

interface DocumentRepository {
    fun observeDocuments(): Flow<List<ScannedDocument>>
    fun search(query: String): Flow<List<ScannedDocument>>
    fun observeDocument(id: Long): Flow<ScannedDocument?>
    suspend fun getDocument(id: Long): ScannedDocument?
    suspend fun addDocument(document: ScannedDocument): Long
    suspend fun updateDocument(document: ScannedDocument)
    suspend fun deleteDocuments(documents: List<ScannedDocument>)
    suspend fun renameDocument(id: Long, newTitle: String)
}

@Singleton
class DocumentRepositoryImpl @Inject constructor(
    private val dao: DocumentDao
) : DocumentRepository {

    override fun observeDocuments(): Flow<List<ScannedDocument>> = dao.observeAll()

    override fun search(query: String): Flow<List<ScannedDocument>> =
        if (query.isBlank()) dao.observeAll() else dao.search(query.trim())

    override fun observeDocument(id: Long): Flow<ScannedDocument?> = dao.observeById(id)

    override suspend fun getDocument(id: Long): ScannedDocument? = dao.getById(id)

    override suspend fun addDocument(document: ScannedDocument): Long = dao.insert(document)

    override suspend fun updateDocument(document: ScannedDocument) = dao.update(document)

    override suspend fun deleteDocuments(documents: List<ScannedDocument>) {
        documents.forEach { dao.delete(it) }
    }

    override suspend fun renameDocument(id: Long, newTitle: String) {
        val document = dao.getById(id) ?: return
        dao.update(document.copy(title = newTitle, updatedAt = System.currentTimeMillis()))
    }
}
