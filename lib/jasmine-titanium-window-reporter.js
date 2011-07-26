var TitaniumWindowReporter;
if (!jasmine) {
	throw new Exception("jasmine library does not exist in global namespace!");
}
TitaniumWindowReporter = (function() {
	TitaniumWindowReporter.prototype.verbose = false;
	TitaniumWindowReporter.prototype.total = {
		passed: 0,
		failed: 0
	};
	function TitaniumWindowReporter(verbose) {
		if (verbose == null) {
			verbose = false;
		}
		this.verbose = verbose;

		this.summaryWin = Ti.UI.createWindow({
			title : '最新のテスト結果',
			backgroundColor : '#fff',
			tabBarHidden:true
		});
		this.currentTab = Ti.UI.createTab({
			title : 'Current',
			window : this.summaryWin
		});
		this.historyTab = Ti.UI.createTab({
			title : 'History'
		});

		var tabGroup = Titanium.UI.createTabGroup();
		tabGroup.addTab(this.currentTab);
		tabGroup.addTab(this.historyTab);
		tabGroup.setActiveTab(0);
		tabGroup.open({
			transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});

	}

	TitaniumWindowReporter.prototype.reportRunnerStarting = function(runner) {
		this.startedAt = new Date;
		return true;
	};
	TitaniumWindowReporter.prototype.reportRunnerResults = function(runner) {

		function format(dt) {
			return dt.getFullYear() +"/" + (dt.getMonth() + 1) + "/" + dt.getDay() + " " + dt.getHours() +":" + dt.getMinutes() + ":" + dt.getSeconds() +"." + dt.getMilliseconds();
		}

		var pr = this.total.passed > 1 ? "s" : "";

		var color ;
		if (this.total.failed === 0) {
			color = "#006400";
		} else {
			color = "red";
		}
		var sections = [];

		var me  = this;

		var section1 = Titanium.UI.createTableViewSection();
		section1.headerTitle = "開始";
		var row1 = Titanium.UI.createTableViewRow({
			title: format(this.startedAt)
		});
		section1.add(row1);
		sections.push(section1);

		var section2 = Titanium.UI.createTableViewSection();
		section2.headerTitle = "終了";
		var row2 = Titanium.UI.createTableViewRow({
			title: format(new Date)
		});
		section2.add(row2);
		sections.push(section2);

		var section3 = Titanium.UI.createTableViewSection();
		section3.headerTitle = "実行結果";
		var row3 = Titanium.UI.createTableViewRow({
			title: this.total.passed + " of " + (this.total.passed + this.total.failed) + (" spec" + pr + " passed."),
			color : color
		});
		section3.add(row3);

		if (this.verbose || this.total.failed > 0) {
			var row4 = Titanium.UI.createTableViewRow({
				title: '詳細を表示する',
				hasChild : true
			});
			section3.add(row4);

			row4.addEventListener('click', function(e) {
				var suites = runner.topLevelSuites();
				me.createSuiteView(suites, "詳細");
			});
		}
		sections.push(section3);

		var list = Ti.UI.createTableView({
			color : color,
			style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
			data: sections
		});

		this.summaryWin.add(list);
	};
	TitaniumWindowReporter.prototype.reportSpecResults = function(spec) {
		if (spec.results().passed()) {
			this.total.passed += 1;
		} else {
			this.total.failed += 1;
		}
	};
	TitaniumWindowReporter.prototype.createSpecView = function(items, title) {
		var data = [];
		var messages = [];
		for (var i = 0, l = items.length; i < l; i++) {
			var result = items[i];
			if (result.type === 'expect' && (result.passed != null) && !result.passed()) {
				data.push({
					title : result.message
				});
			}
		}
		var list = Ti.UI.createTableView({
			data : data,
			style: Titanium.UI.iPhone.TableViewStyle.GROUPED
		});

		var win = Ti.UI.createWindow({
			title : title,
			tabBarHidden:true
		});
		win.add(list);
		this.currentTab.open(win, {
			animated: true
		});

	};
	TitaniumWindowReporter.prototype.createRow = function(suiteOrSpec) {
		return Ti.UI.createTableViewRow({
			title: suiteOrSpec.description,
			hasChild : suiteOrSpec instanceof jasmine.Suite && suiteOrSpec.children().length > 0,
			hasDetail: !(suiteOrSpec instanceof jasmine.Suite) && !suiteOrSpec.results().passed(),
			suiteOrSpec : function() {
				return suiteOrSpec;
			},
			color : this.fontColor(suiteOrSpec)
		});
	};
	TitaniumWindowReporter.prototype.fontColor = function(suiteOrSpec) {
		if (suiteOrSpec.results().passed()) {
			color = "#006400";
		} else {
			color = "red";
		}
		return color;
	},
	TitaniumWindowReporter.prototype.createSuiteView = function(suites, title) {
		var me = this;
		var data = [];
		for (var i = 0, l = suites.length; i < l; i++) {
			var suite = suites[i];
			if (this.verbose || !suite.results().passed()) {
				data.push(this.createRow(suite));
			}
		}
		var list = Ti.UI.createTableView({
			data : data,
			style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		});

		list.addEventListener('click', function(e) {
			if(e.row.hasChild) {
				var suite = e.rowData.suiteOrSpec();
				var suites = suite.children();
				me.createSuiteView(suites, suite.description);
			} else if (e.row.hasDetail) {
				var spec = e.rowData.suiteOrSpec();
				var items = spec.results().getItems();
				me.createSpecView(items, spec.description);
			}
		});
		var win = Ti.UI.createWindow({
			title : title,
			tabBarHidden:true
		});
		win.add(list);
		this.currentTab.open(win, {
			animated: true
		});

	};
	return TitaniumWindowReporter;
})();
jasmine.TitaniumWindowReporter = TitaniumWindowReporter;
