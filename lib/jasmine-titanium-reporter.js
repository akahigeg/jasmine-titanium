var TitaniumReporter;
if (!jasmine) {
  throw new Exception("jasmine library does not exist in global namespace!");
}
TitaniumReporter = (function() {
  TitaniumReporter.prototype.verbose = false;
  TitaniumReporter.prototype.indent = 0;
  TitaniumReporter.prototype.current = {
    description: "",
    indicator: "",
    logs: []
  };
  TitaniumReporter.prototype.total = {
    passed: 0,
    failed: 0
  };
  function TitaniumReporter(verbose) {
    if (verbose == null) {
      verbose = false;
    }
    this.verbose = verbose;
  }
  TitaniumReporter.prototype.reportRunnerStarting = function(runner) {
    this.startedAt = new Date;
    this.info("Runner Started.");
    return this.flushLog();
  };
  TitaniumReporter.prototype.reportRunnerResults = function(runner) {
    var message, pr;
    if (this.verbose) {
      this.info("");
    }
    pr = this.total.passed > 1 ? "s" : "";
    message = "Runner TOTAL: " + this.total.passed + " of " + (this.total.passed + this.total.failed) + (" spec" + pr + " passed.");
    if (this.total.failed === 0) {
      this.info(message);
    } else {
      this.error(message);
    }
    this.info("Runner Finished.");
    return this.flushLog();
  };
  TitaniumReporter.prototype.reportSpecStarting = function(spec) {
    if (spec.suite.description !== this.current.description) {
      this.debug(spec.suite.description);
      this.current.description = spec.suite.description;
    }
    return this.indent = 1;
  };
  TitaniumReporter.prototype.reportSpecResults = function(spec) {
    var description, result, _i, _len, _ref;
    description = '- ' + spec.description + ' ... ';
    if (spec.results().passed()) {
      this.debug(description + "Passed.");
      this.current.indicator += ".";
      this.total.passed += 1;
    } else {
      this.current.indicator += "F";
      this.total.failed += 1;
    }
    _ref = spec.results().getItems();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      result = _ref[_i];
      if (result.type === 'log') {
        this.info(result.toString());
      } else if (result.type === 'expect' && (result.passed != null) && !result.passed()) {
        this.indent = 0;
        if (!this.verbose) {
          this.error(spec.suite.description);
        }
        this.indent = 1;
        this.error(description + "Failed.");
        this.error("  => " + result.message);
      }
    }
    return this.indent = 0;
  };
  TitaniumReporter.prototype.reportSuiteResults = function(suite) {
    var message, pr, results;
    if (!suite.parentSuite) {
      this.debug("");
      message = "Suite TOTAL: ";
    } else {
      message = "  ";
    }
    results = suite.results();
    pr = results.passedCount > 1 ? "s" : "";
    message = message + results.passedCount + " of " + results.totalCount + (" expectation" + pr + " passed.");
    if (results.passedCount === results.totalCount) {
      this.debug(message);
    } else {
      this.error(message);
    }
    if (!suite.parentSuite) {
      return this.flushLog(suite);
    }
  };
  TitaniumReporter.prototype.log = function(str, logLevel) {
    var message;
    if (!logLevel || str.match(/Jasmine waiting for something to happen/)) {
      return;
    }
    message = "Jasmine: " + Array(this.indent + 1).join("  ") + str;
    if (logLevel.match(/warn|info/)) {
      message = " " + message;
    }
    if (this.verbose || logLevel !== "debug") {
      return this.current.logs.push({
        level: logLevel,
        message: message
      });
    }
  };
  TitaniumReporter.prototype.flushLog = function(suite) {
    var log, _i, _len, _ref;
    if (suite) {
      if (this.verbose || this.current.logs.some(function(e) {
        return e.level === "error";
      })) {
        Ti.API.debug("Jasmine: ");
        Ti.API.debug("Jasmine: " + suite.description + "===========================================");
      }
      Ti.API.info(" Jasmine: " + this.current.indicator);
      this.current.indicator = "";
    }
    _ref = this.current.logs;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      log = _ref[_i];
      Ti.API[log.level](log.message);
    }
    return this.current.logs = [];
  };
  TitaniumReporter.prototype.error = function(str) {
    return this.log(str, "error");
  };
  TitaniumReporter.prototype.warn = function(str) {
    return this.log(str, "warn");
  };
  TitaniumReporter.prototype.info = function(str) {
    return this.log(str, "info");
  };
  TitaniumReporter.prototype.debug = function(str) {
    return this.log(str, "debug");
  };
  return TitaniumReporter;
})();
jasmine.TitaniumReporter = TitaniumReporter;