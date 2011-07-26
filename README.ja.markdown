Jamine Titanium
===============

JavaScriptのBDDフレームワークである[Pivotal Lab's Jasmine](http://github.com/pivotal/jasmine)をTitanium Mobile上で動作させるためのものです。

Getting Started
---------------

### 準備

    cd Resources
    mkdir spec lib vendor
    cd vendor
    git clone https://github.com/akahigeg/jasmine-titanium.git
    cd jasmine-titanium
    git submodule init
    git submodule update

利用しているJamineのバージョンは1.0.1-releaseです。

### コードを書く

* spec以下にスペックを作成する
* lib以下に実コードを作成する

詳しくは[Jasmineのサイト](http://pivotal.github.com/jasmine/)を参照。

### スペックを実行する

    jasmine-titanium/script/specs.py

動作環境
--------

* Mac OSX
* iOS SDK
* Android SDK (experimental)
* Titanium Mobile 1.7.2 or later

Tips
----

### specs.pyのオプション

    -v            実行の際にスペックの詳細を表示する
    -s CLASSNAME  指定したクラス名のスペックのみを実行する
                  ex. -s bookmark #=> bookmark_spec.js
    -o FILE       出力を標準出力の代わりにファイルに保存する
    -p PLATFORM, --platform=PLATFORM
                  android または iphone. [default: iphone]
    --android-sdk=ANDROID_SDK_PATH
                  Android SDKのパスを指定
    -r REPORTER, --reporter=REPORTER
                  結果の出力を画面上のHTMLにするかコンソールにするか (androidはHTMLのみ) [defulat: html]

### specs.pyのシンボリックリンクをResource以下に張る

    # in Resources/
    ln -s vendor/jasmine-titanium/script/specs.py specs.py
    ./specs.py

実行がちょっと楽になります。

### テスト以外のTitaniumのログを抑制する

    ./specs.py |grep Jasmine:

### コードをlibやspec以外に置きたい場合

vendor/jasmine-titanium/config/runner-config.jsを変更してしてください。
