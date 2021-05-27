package me.haroldmartin.flippertabulardemo

import me.haroldmartin.flipper.tabular.ChannelConfig
import me.haroldmartin.flipper.tabular.ColumnConfig
import me.haroldmartin.flipper.tabular.TabularFlipperPlugin

object PluginProvider {
    val tabularPlugin = TabularFlipperPlugin().apply {
        configureChannel(
            channel = "analytics",
            configuration = ChannelConfig(
                columns = listOf(ColumnConfig(key = "is_good", title="Configured Title"))
            )
        )
    }

    val all = listOf(tabularPlugin)
}
