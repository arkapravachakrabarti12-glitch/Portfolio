package com.arkaprava.scanflow.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Sort
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.arkaprava.scanflow.ui.library.SortOrder

@Composable
fun SortMenu(current: SortOrder, onSelect: (SortOrder) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    IconButton(onClick = { expanded = true }) {
        Icon(Icons.Filled.Sort, contentDescription = "Sort")
    }
    DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
        val labels = linkedMapOf(
            SortOrder.DATE_DESC to "Newest first",
            SortOrder.DATE_ASC to "Oldest first",
            SortOrder.NAME_ASC to "Name (A-Z)",
            SortOrder.PAGES_DESC to "Most pages"
        )
        labels.forEach { (order, label) ->
            DropdownMenuItem(
                text = { Text(if (order == current) "✓ $label" else label) },
                onClick = {
                    onSelect(order)
                    expanded = false
                }
            )
        }
    }
}
