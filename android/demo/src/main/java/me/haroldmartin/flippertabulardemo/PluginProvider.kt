package me.haroldmartin.flippertabulardemo

import me.haroldmartin.flipper.tabular.TabularFlipperPlugin

object PluginProvider {
    val tabularPlugin = TabularFlipperPlugin()

    val all = listOf(tabularPlugin)
}
