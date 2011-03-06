Jamine Titanium
===============

This brings JavaScript BDD framework [Pivotal Lab's Jasmine](http://github.com/pivotal/jasmine) to Titamium Mobile.

Getting Started
---------------

### Make directories and get Jasmine Titanium

    cd Resources
    mkdir spec lib vendor
    cd vendor
    git clone https://github.com/akahigeg/jasmine-titanium.git

### Writing code

* Writing specs in spec dir.
* Writing application code in lib dir.

See [Jasmine Wiki](http://pivotal.github.com/jasmine/) for more details.

### Run specs

    jasmin-titanium/script/specs.sh

Requirements
------------

* Mac OSX
* iOS SDK
* Titanium Mobile 1.6.0

I have not try to run with Android.

Titanium Mobile SDK version "1.6.0" is hard coded in specs.sh.  
Replace it to run other version. that's maybe works.

Tips
----

### specs.sh options

    -v            show list of spec descriptions.
    -s CLASSNAME  run specs for specified class only.
                  ex. -c bookmark #=> bookmark_spec.js

### make symbolic link for specs.sh in Resource dir

	# in Resources/
    ln -s vendor/jasmin-titanium/script/specs.sh specs.sh 
    ./specs.sh

save typing.

### filtering noisy log

    ./specs.sh |grep Jasmine:

### change lib and spec dir

Edit vendor/jasmin-titanium/config/runner-config.js

### include path dirty hack

    Ti.include("../../../../../../../../../lib/bookmark.js")

See [here](http://developer.appcelerator.com/question/27001/include-js-file-using-absolute-path) for more information.
