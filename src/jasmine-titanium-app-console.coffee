Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-app.js")

Ti.include("/vendor/jasmine-titanium/jasmine/lib/jasmine.js")
Ti.include("/vendor/jasmine-titanium/lib/jasmine-titanium-reporter.js")

Ti.include(lib) for lib in JasmineTitaniumApp.libs
Ti.include(spec) for spec in JasmineTitaniumApp.specs

jasmine.getEnv().addReporter(new jasmine.TitaniumReporter(JasmineTitaniumApp.verbose))
jasmine.getEnv().execute()
