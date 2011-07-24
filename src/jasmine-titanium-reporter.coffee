throw new Exception("jasmine library does not exist in global namespace!") if !jasmine

class TitaniumReporter
    verbose: false
    indent: 0

    current: {description: "", indicator: "", logs: []}
    total: {passed: 0, failed: 0}

    constructor: (verbose = false)->
        @verbose = verbose

    reportRunnerStarting: (runner)->
        @startedAt = new Date
        @info("Runner Started.")
        @flushLog()

    reportRunnerResults: (runner)->
        @info("") if @verbose
        pr = if @total.passed > 1 then "s" else ""
        message = "Runner TOTAL: " + @total.passed + " of " + (@total.passed + @total.failed) + " spec#{pr} passed."
        if @total.failed == 0 then @info(message) else @error(message)

        @info("Runner Finished.")
        @flushLog()

    reportSpecStarting: (spec)->
        if spec.suite.description != @current.description
            @debug(spec.suite.description)
            @current.description = spec.suite.description
        @indent = 1

    reportSpecResults: (spec)->
        description = '- ' + spec.description + ' ... '
        if spec.results().passed()
            @debug(description + "Passed.")
            @current.indicator += "."
            @total.passed += 1
        else
            @current.indicator += "F"
            @total.failed += 1

        for result in spec.results().getItems()
            if result.type == 'log'
                @info(result.toString())
            else if (result.type == 'expect' && result.passed? && !result.passed())
                @indent = 0
                @error(spec.suite.description) if !@verbose
                @indent = 1
                @error(description + "Failed.")
                @error("  => " + result.message)
        @indent = 0

    reportSuiteResults: (suite)->
        if !suite.parentSuite
            @debug("")
            message = "Suite TOTAL: "
        else
            message = "  "

        results = suite.results()

        pr = if results.passedCount > 1 then "s" else ""
        message = message + results.passedCount + " of " + results.totalCount + " expectation#{pr} passed."
        if (results.passedCount == results.totalCount)
            @debug(message)
        else
            @error(message)

        @flushLog(suite) if !suite.parentSuite

    log: (str, logLevel)->
        return if !logLevel || str.match(/Jasmine waiting for something to happen/)

        message = "Jasmine: " + Array(@indent + 1).join("  ") + str

        message = " " + message if logLevel.match(/warn|info/)
        @current.logs.push({level:logLevel, message:message}) if @verbose || logLevel != "debug"

    flushLog: (suite)->
        if suite
            if @verbose || @current.logs.some((e)-> e.level == "error")
                Ti.API.debug("Jasmine: ")
                Ti.API.debug("Jasmine: " + suite.description + "===========================================")

            Ti.API.info(" Jasmine: " + @current.indicator)
            @current.indicator = ""

        Ti.API[log.level](log.message) for log in @current.logs
        @current.logs = []

    error: (str)->  @log(str, "error")
    warn: (str)->  @log(str, "warn")
    info: (str)->  @log(str, "info")
    debug: (str)->  @log(str, "debug")

jasmine.TitaniumReporter = TitaniumReporter
