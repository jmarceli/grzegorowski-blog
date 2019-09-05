---
layout: post
author: jan
title: >-
  Integration tests with Jest, Selenium and BrowserStack - part 1 - simple
  example
excerpt: >-
  An example of Jest Selenium and BrowserStack setup for running cross-browser
  compatibility tests easily.
meta_description: >-
  BrowserStackLocal executable used with local HTML test file for running
  Selenium-based Javascript cross-browser compatibility tests with Jest.
meta_title: null
slug: integration-tests-with-jest-selenium-and-browserstack
date_created: "2018-11-20T10:58:51.000Z"
date_updated: "2018-11-04T18:01:19.000Z"
feature_image: >-
  img/photo-1513611771808-7e8ab7f1dec6.jpg
featured: false
draft: false
tags:
  - javascript
  - tools
---

Although there is much useful information on the official BrowserStack website, you will certainly have a lot of questions when you run tests for the first time. I will try to explain how to deal with it based on a simple example which uses Jest and Selenium.

**There is no problem in running [Jest](https://jestjs.io) with BrowserStack, despite the lack of documentation or examples.**

TLDR; Check the [example repository](https://github.com/jmarceli/jest-selenium-browserstack-example) it should be self-explanatory.

## Starting point

I have Selenium-based tests that I can run locally. How do I load BrowserStack and run tests against their browsers?

It seems that it is quite simple and typical task.

Here is an example of a basic Selenium test powered by Jest. It will be used to show how to integrate existing code with [BrowserStack Automate](https://www.browserstack.com/docs?product=automate) testing service.

**test/local.test.js**

```javascript
import { Builder, By, until } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";
import path from "path";

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

describe("webdriver", () => {
  let driver;

  beforeAll(async () => {
    const options = new firefox.Options();
    options.headless();
    driver = new Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(options)
      .build();

    // eslint-disable-next-line no-undef
    await driver.get("file://" + path.join(__dirname, "test.html"));
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("test", async () => {
    const btn = await getElementById(driver, "test-button");
    await btn.click();

    const output = await getElementById(driver, "output");
    const outputVal = await output.getAttribute("value");

    expect(outputVal).toEqual("Something");
  });
});
```

As you can see, this is a simple example in which after clicking on **#myBtn** we expect to have **Something** as value of the **#output** input HTML element. Here's tested code.

**test/jest-selenium-browserstack-example.js**

```javascript
var JestSeleniumBrowserStackExample = (function(exports) {
  "use strict";

  var write = function write(elementId) {
    var el = document.getElementById(elementId);
    el.value = "Something";
  };

  exports.write = write;

  return exports;
})({});
```

Here is a local HTML file used for testing in browser.

**test/test.html**

```html
<html>
  <head>
    <script
      src="./jest-selenium-browserstack-example.js"
      type="text/javascript"
    ></script>
  </head>
  <body>
    <button onClick='JestSeleniumBrowserStackExample.write("output")' id="copy">
      write
    </button>
    <input id="output" value="not working" />
  </body>
</html>
```

All files listed above are available inside [test folder of Github example repository](https://github.com/jmarceli/jest-selenium-browserstack-example/tree/master/test). You may run `yarn test:local` in cloned repository to check if everything is working as expected.

> NOTE! In order to run Selenium tests locally you will have to download and install approperiate driver, which is geckodriver in this case. It may be downloaded directly from [official Mozilla repository](https://github.com/mozilla/geckodriver/releases) .

## Solution

The following solution will use [Automate with Local Testing](https://www.browserstack.com/automate/node#setting-local-tunnel) for running fully automated tests on selected version of OS and browser.
In order to simplify things a bit, I assume that you're working on a Unix system (e.g. Ubuntu, Mac OS X). Windows commands will be different only when it comes to **BrowserStackLocal** executable.

### 1. What is BrowserStackLocal?

After reading https://www.browserstack.com/automate/node you may already know that **BrowserStackLocal** is "something" that can be useful in tests.
Unfortunately, I didn't find any clear information about how to use it for integration with test (maybe I didn't look carefully enough).

For starters, just run [downloaded](https://www.browserstack.com/automate/node#local-testing-getting-started) **BrowserStackLocal** to check if it works. You will have to provide the `--key` argument with your BrowserStack key (as in [official docs](https://www.browserstack.com/automate/node#doc-platform-tab)) e.g. `Asdafklwe12312kldfasfmaMD`:

```bash
./BrowserStackLocal --key [YOUR_BROWSERSTACK_KEY]
```

As a result, you will get some output. Exact messages doesn't matter, just make sure that there are no errors at this point.
Now run it with additional `--folder $(pwd)`.

```bash
./BrowserStackLocal --key [YOUR_BROWSERSTACK_KEY] --folder $(pwd)
```

As you can see on the output, the contents of the current folder will be available for your tests under unique URL `http://[YOUR_BROWSERSTACK_USERNAME].browserstack.com` where `[YOUR_BROWSERSTACK_USERNAME]` is your BrowserStack username.

### 2. Adjust/rewrite tests

By default, our test is run using the local Selenium webdriver e.g. `geckodriver` (for Firefox). We would like to run it with remote BrowserStack OS and browser. Exact BrowserStack webdriver settings are defined inside `capabilities` object.
Here is an example:

```javascript
// for more options check https://www.browserstack.com/automate/capabilities
const capabilities = {
  build: require("../package.json").version,
  project: "jest-selenium-browserstack-example",
  browserName: "chrome",
  os: "Windows",
  "browserstack.local": true,
  "browserstack.user": "[YOUR_BROWSERSTACK_USERNAME]",
  "browserstack.key": "[YOUR_BROWSERSTACK_KEY]",
};
```

With the above configuration, you will run tests using the Google Chrome browser on Windows. Here is the code that initiates the driver.

```javascript
driver = new webdriver.Builder()
  .usingServer("http://hub-cloud.browserstack.com/wd/hub")
  .withCapabilities(capabilities)
  .build();
```

Remember to import the Selenium webdriver before using the above code.

```javascript
import webdriver from "selenium-webdriver";
```

All this is described on the [official documentation pages](https://www.browserstack.com/automate/node).

The last important thing is to replace:

```javascript
await driver.get("file://" + path.join(__dirname, "test.html"));
```

with:

```javascript
await driver.get(
  `http://${capabilities["browserstack.user"]}.browserstack.com/test.html`,
);
```

Because local files are not directly available in the Browser Stack, you can access them only through a webserver (which serves files from **BrowserStackLocal** `--folder`). This makes sense if you think about running tests on multiple OSes because thanks to this webserver you don't have to copy files from one machine to the other, all you have to do is access the internal URL.

At this stage, if you manually connect to BrowserStack using `./BroserStackLocal --key [bs_key] --folder $(pwd)` executed in the same folder as the test files, you should be able to completet all tests.

> NOTE! BrowserStack Selenium tests may require setting a Jest timeouts (default is 5s). This is especially true for connecting and disconnecting which tends to be time consuming process. I would advise something around 10-15s.

If you clone [example repository](https://github.com/jmarceli/jest-selenium-browserstack-example) initiate **BrowserStackLocal** with `test/` directory inside `--folder` argument and then run `yarn test:manual` to view the results.

Here is the test code described above https://github.com/jmarceli/jest-selenium-browserstack-example/blob/master/test/manual.test.js.

### 3. Automate BrowserStackLocal connection

Going further, it's time to go for more automated/autonomous approach.
If you don't want (and probably you should not) to implement NodeJS wrapper for `./BrowserStackLocal`, use the official one [browserstack-local-nodejs](https://github.com/browserstack/browserstack-local-nodejs).
This package will handle the download of approperiate binary files for you and can serve as an interface between your tests and the `BrowserStackLocal` executable.

> To be honest I don't like the **browserstack-local-nodejs** package at all (callbacks, hard to debug, unused variables and more), but since this the official BrowserStack repository, we can hope that it will be maintained.

Let's continue with examples.

Here is how you may wrap `start` and `stop` methods from **browserstack-local-nodejs** to make them work with my beloved async/await syntax.

```javascript
const connect = async () =>
  new Promise((resolve, reject) => {
    local.start(BrowserStackLocalArgs, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

const disconnect = async () =>
  new Promise((resolve, reject) => {
    local.stop(function(error) {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
```

Now you can use `await start()` and `await stop()` which is much more convenient.
Don't forget to initialize **browserstack-local-nodejs** first, with:

```javascript
const local = new browserstack.Local();
```

and set approperiate args for executable with:

```javascript
const BrowserStackLocalArgs = {
  key: "[YOUR_BROWSERSTACK_KEY]",
  // verbose: true,
  onlyAutomate: true,
  // eslint-disable-next-line
  folder: __dirname,
};
```

Then connect with BrowserStack by awaiting for `start()` function.
You should do this **before** running the webdriver.
Here's how `beforeAll()` looks like for your tests:

```javascript
beforeAll(async () => {
  try {
    // BrowserStackLocal has to be ready before webdriver initialization
    await start();
    driver = new webdriver.Builder()
      .usingServer("http://hub-cloud.browserstack.com/wd/hub")
      .withCapabilities(capabilities)
      .build();

    await driver.get(
      `http://${capabilities["browserstack.user"]}.browserstack.com/test.html`,
    );
  } catch (error) {
    console.error("connetion error", error);
  }
  // IMPORTANT! Selenium and Browserstack needs more time than regular Jest
}, 10000);
```

The tests should not require any changes. Remember about disconnecting from BrowserStack after finishing tests.
You can do it with:

```javascript
afterAll(async () => {
  try {
    await driver.quit(); // ~ 11 s !
    await stop(); // ~ 3 s
  } catch (error) {
    console.error("disconnection error", error);
  }
  // IMPORTANT! Selenium and Browserstack needs a lot of time!
}, 20000);
```

> NOTE! At least in my case the disconnection after testing takes really long, which is why I set 20 seconds as a `afterAll` timeout.

> NOTE! If the waiting time is too short, you'll probably run into this message: **Jest did not exit one second after the test run has completed**. When it appears, check your system process/task manager and kill BrowserStackLocal process(es) which may not close/stop correctly.

This is it. If you have any questions do not hestitate to ask and check out a sample repository that should help you a lot (I hope).

If you clone [example repository](https://github.com/jmarceli/jest-selenium-browserstack-example) just run `yarn test:automate` to view the results.

Here is the test code described above https://github.com/jmarceli/jest-selenium-browserstack-example/blob/master/test/automate.test.js.

In the part 2 of this "series" I will present a way to run tests for many browsers and OSes at once, see https://www.grzegorowski.com/integration-tests-with-jest-selenium-and-browserstack-part-2/.

## Sources

- https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html - Selenium documentation
- https://github.com/Hyddan/se-runner-browserstack-example#readme - first inspiration for automated tests with BrowserStack
- https://github.com/browserstack/browserstack-local-nodejs - finally a working example of BrowserStack integration
- https://www.browserstack.com/automate/node - useful official NodeJS documentation
- https://blog.evantahler.com/testing-javascript-applications-with-selenium-async-await-and-jest-7580ed074f2b - nice setup of Jest and Selenium without BrowserStack
- https://www.browserstack.com/local-testing#modifiers - BrowserStackLocal argument list
- https://github.com/Hyddan/se-runner - one of the inspirations (uses Grunt and Jasmine)
