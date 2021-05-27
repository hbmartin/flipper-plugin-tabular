package me.haroldmartin.flipper.tabular

import com.facebook.flipper.core.FlipperArray
import com.facebook.flipper.core.FlipperObject
import com.facebook.flipper.core.FlipperValue

data class ChannelConfig (
//    val enableAutoScroll: Boolean = true,
//    val visibleByDefault: Boolean = true,
    val columns: List<ColumnConfig>
) {
    fun toFlipperObject(): FlipperObject =
        mapOf(
            "columns" to columns.toFlipperArray(),
            "test" to "test"
        ).toFlipperObject()
}

data class ColumnConfig(
    val key: String,
    val title: String,
    val visible: Boolean = true
) : FlipperValue {
    override fun toFlipperObject(): FlipperObject =
        mapOf(
            "key" to key,
            "title" to title,
            "visible" to visible
        ).toFlipperObject()
}

private fun Iterable<FlipperValue>.toFlipperArray(): FlipperArray =
    fold(FlipperArray.Builder()) { b, row -> b.put(row.toFlipperObject()) }.build()
