const { join } = require('path');
const allure = require('allure-commandline');
const { default: WDIOVideoReporter } = require('wdio-video-reporter');

exports.config = {
    hostname: 'localhost',
    port: 4723,
    path: '/wd/hub',
    // user: "lojaebac_gBJk0x",
    // key: "dQfHqx13fxpsVg1Ns1Yc",

    // services: ['appium'],
    // services: ['browserstack'],
    specs: [
        './test/specs/**/*.spec.js'
    ],
    suites: {
        products: [
            './test/specs/products.spec.js',
            './test/specs/search.spec.js'
        ]
    },
    framework: 'mocha',
    capabilities: [
        {

            "platformName": "iOS",
            "appium:deviceName": "iPhone Simulator",
            "appium:platformVersion": "17",
            "appium:automationName": "XCUITest",
            "appium:app": `${process.cwd()}/app/loja-ebac.app` 

        }
    ],
    waitforTimeout: 20000,
    mochaOpts: {
        timeout: 300000
    },
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        [video, {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }]
    ],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: function (test, scenario, { error, duration, passed }) {
        if (error) {
            driver.takeScreenshot()
        }
    },
    beforeSuite: async function () {
        //verificar se o app ja esta instalado e executando
        let state = await driver.queryAppState("br.art.ebaconline")
        if (state !== 4) {
            await driver.launchApp()
        }
    },
    afterSuite: async function () {
        //fechar o app
        await driver.closeApp()
    },
    maxInstances: 1

}