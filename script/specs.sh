#!/bin/sh

# Parse options
while getopts s:v OPT
do
    case $OPT in
        "s" ) CLASSNAME="$OPTARG";;
        "v" ) VERBOSE="true";;
        * ) echo "Usage: $CMDNAME [-s CLASSNAME] [-v]" 1>&2
            exit 1;;
    esac
done

# Get "Resource" dir
IFS=/; set -- `pwd`; IFS= ;
RESOURCE_DIR=""
for name in $*
do
    RESOURCE_DIR="${RESOURCE_DIR}/${name}"
    if [ "${name}" = "Resources" ]
    then
        break
    fi
done

# Run specs
cd $RESOURCE_DIR

cat > temp_runner_options.js << EOF
var runner_options = { classname:"$CLASSNAME", verbose:"$VERBOSE" };
EOF

cp app.js app.js.backup
cp vendor/jasmine-titanium/lib/jasmine-titanium-app.js app.js

/Library/Application\ Support/Titanium/mobilesdk/osx/1.6.1/iphone/builder.py run `pwd`/..

cp app.js.backup app.js
rm app.js.backup temp_runner_options.js
