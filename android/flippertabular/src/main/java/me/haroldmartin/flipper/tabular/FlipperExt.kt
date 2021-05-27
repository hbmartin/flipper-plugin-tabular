package me.haroldmartin.flipper.tabular

import com.facebook.flipper.core.FlipperObject

internal fun Map<String, Any>.toFlipperObject(): FlipperObject =
    keys.fold(FlipperObject.Builder()) { b, key -> b.put(key, get(key)) }.build()
