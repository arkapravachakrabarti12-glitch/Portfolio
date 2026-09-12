package com.arkaprava.scanflow.di

import android.content.Context
import androidx.room.Room
import com.arkaprava.scanflow.data.local.ScanFlowDatabase
import com.arkaprava.scanflow.data.local.dao.DocumentDao
import com.arkaprava.scanflow.data.repository.DocumentRepository
import com.arkaprava.scanflow.data.repository.DocumentRepositoryImpl
import dagger.Binds
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): ScanFlowDatabase =
        Room.databaseBuilder(context, ScanFlowDatabase::class.java, "scanflow.db").build()

    @Provides
    fun provideDocumentDao(database: ScanFlowDatabase): DocumentDao = database.documentDao()
}

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindDocumentRepository(impl: DocumentRepositoryImpl): DocumentRepository
}
