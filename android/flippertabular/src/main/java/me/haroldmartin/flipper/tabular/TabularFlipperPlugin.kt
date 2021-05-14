package me.haroldmartin.flipper.tabular

import com.facebook.flipper.core.FlipperArray
import com.facebook.flipper.core.FlipperObject
import com.facebook.flipper.plugins.common.BufferingFlipperPlugin

class TabularFlipperPlugin : BufferingFlipperPlugin() {
    override fun getId() = "tabular"

    fun addRecord(channel: String, record: Map<String, Any>) = addRecords(channel, listOf(record))

    fun addRecords(channel: String, records: List<Map<String, Any>>) {
        send("addRecords", FlipperObject.Builder().put(channel, records.toFlipperArray()).build())
    }

    fun addChannel(channel: String, columns: List<String>, paginationConfig: PaginationConfig? = null) {
        send("addChannel", FlipperObject.Builder().put(channel, columns.toFlipperArray()).build())
    }
}

@JvmName("toFlipperArrayString")
private fun Iterable<String>.toFlipperArray(): FlipperArray =
    fold(FlipperArray.Builder()) { b, string -> b.put(string) }.build()


private fun Iterable<Map<String, Any>>.toFlipperArray(): FlipperArray =
    fold(FlipperArray.Builder()) { b, row -> b.put(row.toFlipperObject()) }.build()

private fun Map<String, Any>.toFlipperObject(): FlipperObject =
    keys.fold(FlipperObject.Builder()) { b, key -> b.put(key, get(key).toString()) }.build()
