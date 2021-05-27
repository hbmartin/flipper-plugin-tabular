/**
 * Copyright (c) 2021 Harold Martin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package me.haroldmartin.flipper.tabular

import com.facebook.flipper.core.FlipperObject

internal fun Map<String, Any>.toFlipperObject(): FlipperObject =
    keys.fold(FlipperObject.Builder()) { b, key -> b.put(key, get(key)) }.build()
