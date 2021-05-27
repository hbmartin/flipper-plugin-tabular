/**
 * Copyright (c) 2021 Harold Martin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

    fun configureChannel(channel: String, configuration: ChannelConfig) {
        send("configureChannels", FlipperObject.Builder().put(channel, configuration.toFlipperObject()).build())
    }
}

private fun Iterable<Map<String, Any>>.toFlipperArray(): FlipperArray =
    fold(FlipperArray.Builder()) { b, row -> b.put(row.toFlipperObject()) }.build()
