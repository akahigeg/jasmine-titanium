wv = Ti.UI.createWebView()
wv.html = "

<html>
<head>
  <title>Jasmine Spec Runner</title>

  <link rel='stylesheet' type='text/css' href='vendor/jasmine-titanium/jasmine/lib/jasmine.css'>
  <script type='text/javascript' src='vendor/jasmine-titanium/jasmine/lib/jasmine.js'></script>
  <script type='text/javascript' src='vendor/jasmine-titanium/jasmine/lib/jasmine-html.js'></script>
  <script src='lib/a.js'></script>
  <script src='spec/a_spec.js'></script>
  <script src='spec/hoge_spec.js'></script>
  <script type='text/javascript'>
    (function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var trivialReporter = new jasmine.TrivialReporter();

      jasmineEnv.addReporter(trivialReporter);

      jasmineEnv.specFilter = function(spec) {
        return trivialReporter.specFilter(spec);
      };

      var currentWindowOnload = window.onload;

      window.onload = function() {
        if (currentWindowOnload) {
          currentWindowOnload();
        }
        execJasmine();
      };

      function execJasmine() {
        jasmineEnv.execute();
      }

    })();
  </script>
</head>

<body>
</body>
</html>

    "

window = Ti.UI.createWindow()
window.add(wv)
window.open()

