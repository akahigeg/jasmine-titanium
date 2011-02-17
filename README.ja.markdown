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

### コードを書く

* spec以下にスペックを作成する
* lib以下に実コードを作成する

詳しくは[Jasmineのサイト](http://pivotal.github.com/jasmine/)を参照。

### スペックを実行する

    jasmin-titanium/script/specs.sh

動作環境
--------

* Mac OSX
* iOS SDK
* Titanium Mobile 1.5.1

Android環境でもspecs.shをちょっといじればいけるかもしれません。

Titanium MobileのSDKのバージョンがspecs.shにベタ書きのため、1.5.1でしか動きません。  
逆に言うとspecs.shを書き換えればどのバージョンでも動きます（たぶん）

Tips
----

### specs.shのオプション

    -v            実行の際にスペックの詳細を表示する
    -s CLASSNAME  指定したクラス名のスペックのみを実行する
                  ex. -c bookmark #=> bookmark_spec.js

### specs.shのシンボリックリンクをResource以下に張る

	# in Resources/
    ln -s vendor/jasmin-titanium/script/specs.sh specs.sh 
    ./specs.sh

実行がちょっと楽になります。

### テスト以外のTitaniumのログを抑制する

    ./specs.sh |grep Jasmine:

### コードをlibやspec以外に置きたい場合

vendor/jasmin-titanium/config/runner-config.jsを変更してしてください。

### インクルードパス問題の解決

    Ti.include("../../../../../../../../../lib/bookmark.js")

参考:[TitaniumのインクルードパスをResourcesからの相対パスで指定する方法](http://higelog.brassworks.jp/?p=1130)
