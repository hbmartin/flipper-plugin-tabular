# Tabular Flipper Plugin

[![npm](https://img.shields.io/npm/v/flipper-plugin-tabular?color=%23FEE933)](https://www.npmjs.com/package/flipper-plugin-tabular)
[![Maven Central](https://img.shields.io/maven-central/v/io.github.hbmartin/flipper-tabular-plugin?color=6D3DEE)](https://repo.maven.apache.org/maven2/io/github/hbmartin/flipper-tabular-plugin/)
[![CI](https://github.com/hbmartin/flipper-plugin-tabular/actions/workflows/main.yml/badge.svg)](https://github.com/hbmartin/flipper-plugin-tabular/actions/workflows/main.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/hbmartin/flipper-plugin-tabular/badge)](https://www.codefactor.io/repository/github/hbmartin/flipper-plugin-tabular)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=hbmartin_flipper-plugin-tabular&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=hbmartin_flipper-plugin-tabular)
[![GitHub issues](https://img.shields.io/github/issues/hbmartin/flipper-plugin-stetho)](https://github.com/hbmartin/flipper-plugin-stetho/issues)

Display tables of data easily in Flipper

## Download

Install in your build.gradle:

```
dependencies {
  implementation 'io.github.hbmartin:flipper-tabular-plugin:0.1.0
}
```


## Usage

Instantiate `StethoFlipperPlugin` with a list of the stetho/dumper plugins to expose. Then add that plugin to Flipper. See the demo app.

```
val tabularPlugin = TabularFlipperPlugin()
client.addPlugin(tabularPlugin)
...
tabularPlugin.addRecords("channel name", listOf(records map))
```

## Contributing

* [PRs](https://github.com/hbmartin/flipper-plugin-stetho/pulls) and [bug reports / feature requests](https://github.com/hbmartin/flipper-plugin-stetho/issues) are all welcome!
* This project is linted with [ktlint](https://github.com/pinterest/ktlint) via [ktlint-gradle](https://github.com/JLLeitschuh/ktlint-gradle/tags) and performs static analysis with [detekt](https://github.com/detekt/detekt)
* Treat other people with helpfulness, gratitude, and consideration! See the [Android SE CoC](https://android.stackexchange.com/conduct)

## License

MIT License

Copyright (c) Harold Martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
