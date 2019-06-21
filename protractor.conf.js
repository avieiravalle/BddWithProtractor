exports.config = {
    directConnect: true,
    //highlightDelay: 3000,
    
    restartBrowserBetweenTests: false,
    getPageTimeout: 50000,
    allScriptsTimeout: 30000,

    capabilities: {
      shardTestFiles: true,
      browserName: 'chrome',
      chromeOptions: {
        args: [
          "--headless",
          "--disable-gpu",
          "--window-size=1024,768",
        ],
      },
    },
    cucumberOpts: {
        require: [
            'features/stepDefinitions/google.js' // accepts a glob
        ],
       
       // format: ['json:results.json', 'progress', 'pretty:output.txt'],
        strict: true,
        'no-colors': true,
        tags:false,
        // ...
    },

    // set to "custom" instead of cucumber.
    framework: 'custom',

    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    // require feature files
    specs: [
        'features/*.feature' // accepts a glob
    ],

    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();

    },

    beforeLaunch: function () {
        setTimeout(function () {
          browser.driver.executeScript(function () {
            return {
              width: window.screen.availWidth,
              height: window.screen.availHeight
            }
          }).then(function (result) {
            browser.driver.manage().window().setSize(result.width, result.height)
          })
        })
      },

      afterLaunch: function () {
        var reporter = require('cucumber-html-reporter')
    
        var options = {
          theme: 'bootstrap',
          jsonFile: 'results.json',
          output: 'report/cucumber_report.html',
          reportSuiteAsScenarios: true,
          launchReport: true,
          storeScreenshots: false,
          metadata: {
            'App Version': '0.0.1',
            'Test Environment': 'STAGING',
            'Browser': 'Chrome  69.0.3497.100',
            'Platform': 'OSX',
            'Parallel': 'Scenarios',
            'Executed': 'Remote'
          }
        }
        reporter.generate(options)
      }
};
