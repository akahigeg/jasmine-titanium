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
    cd jasmine-titanium
    git submodule init
    git submodule update

Using jasmine 1.0.1-release.

### Writing code

* Writing specs in spec dir.
* Writing application code in lib dir.

See [Jasmine Wiki](http://pivotal.github.com/jasmine/) for more details.

### Run specs

    jasmine-titanium/script/specs.py

Requirements
------------

* Mac OSX
* iOS SDK
* Titanium Mobile 1.7.2 or later

Not working for Android.

Tips
----

### specs.py options

    -v            show list of spec descriptions.
    -s CLASSNAME  run specs for specified class only.
                  ex. -s bookmark #=> bookmark_spec.js
    -o FILE       Write output to a file instead of STDOUT.

### make symbolic link for specs.py in Resource dir

    # in Resources/
    ln -s vendor/jasmine-titanium/script/specs.py specs.py
    ./specs.py

save typing.

### filtering noisy log

    ./specs.py |grep Jasmine:

### change lib and spec dir

Edit vendor/jasmine-titanium/config/runner-config.js
