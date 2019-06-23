---
layout: post
author: ghost
title: >-
  Integration tests with Jest, Selenium and BrowserStack - part 2 - multiple
  browsers
excerpt: >-
  Running automatically tests for multiple browsers and OSes with BrowserStack
  service.
meta_description: >-
  Use Jest with BrowserStack to run integration tests for multiple browsers and
  OSes.
meta_title: null
slug: integration-tests-with-jest-selenium-and-browserstack-part-2
date: '2018-11-03T02:58:00.000Z'
date_created: '2018-11-06T02:33:54.000Z'
date_updated: '2018-11-04T18:17:34.000Z'
image: >-
  ./img/photo-1517607537732-619ace47ec9e.jpg
featured: false
draft: false
tags:
  - Frontend
  - Javascript
---
As described in [part 1](https://www.grzegorowski.com/integration-tests-with-jest-selenium-and-browserstack/) you can run Jest based tests with BrowserStack service. Now I will show how they can be automatically run against many browsers and OSes.

## Parametrized tests

Probably the most simple way to convert [single-browser automatic Browserstack test](https://github.com/jmarceli/jest-selenium-browserstack-example/blob/master/test/automate.test.js) to multi browser/OS is parametrization using enironment variables. Here is how it might be done regarding example test file [test/automate.test.js](https://github.com/jmarceli/jest-selenium-browserstack-example/blob/master/test/automate.test.js).

Replace the following lines from `capabilities` object:

```javascript
  browserName: 'chrome',
  os: 'Windows',
```

with:

```javascript
  browserName: process.env.BROWSER,
  os: process.env.OS,
```

This is it! Now you may run tests against any browser and OS available in BrowserStack service.
Example:

```bash
OS=Windows BROWSER=chrome yarn jest ./test/parametrized.test.js
```

Provided that your parametrized tests file path is: `./test/parametrized.test.js`

Running against multiple browsers and OSes might be achieved by chaining execution of commands like:

```bash
OS=Windows BROWSER=chrome yarn jest ./test/parametrized.test.js && OS=Windows BROWSER=firefox yarn jest ./test/parametrized.test.js
```

or (if you don't care about possible previous command errors):

```bash
OS=Windows BROWSER=chrome yarn jest ./test/parametrized.test.js; OS=Windows BROWSER=firefox yarn jest ./test/parametrized.test.js
```

As you may expect, this is not the most effective method, because the connection to BrowserStack service is opened and closed for each command executed.

## Sequential tests

Another option is to write a sequential test wrapper that will run selected tests against browsers defined in the `config.json` file one after another. It is a bit more complicated as it requires tests code refactoring.

Here is an example content of a `config.json`:

```json
{
  "browsers": [
    {
      "browserName": "internet explorer",
      "version": "10.0"
    },
    {
      "browserName": "chrome",
      "version": "22.0"
    }
  ],
}
```

The file structure is based on the official `example/config.json` from https://www.browserstack.com/automate/node#wd. Check the https://www.browserstack.com/automate/capabilities for list of all available keys.

The general idea is to connect to BrowserStackLocal, run tests for all browsers defined inside the `config.json` file and finally disconnect. To achieve this, we will use the `beforeAll` and `afterAll` hooks to handle BrowserStack connection. After establishing a connection with BrowserStackLocal we will loop through all browser versions from config file and run tests for each of them. Here's how it can look.

```javascript
import webdriver from 'selenium-webdriver';
import browserstack from 'browserstack-local';

const local = new browserstack.Local();
const until = webdriver.until;
const By = webdriver.By;

const config = require('./config.json');

const BrowserStackLocalArgs = {
  key: '',
  onlyAutomate: true,
  folder: __dirname,
};

const start = async () =>
  new Promise((resolve, reject) => {
    local.start(BrowserStackLocalArgs, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

const stop = async () =>
  new Promise((resolve, reject) => {
    local.stop(function(error) {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

const getElementById = async (driver, id, timeout = 5000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

beforeAll(async () => {
  await start();
}, 20000);

afterAll(async () => {
  await stop();
}, 20000);

for (const browser of config.browsers) {
  let driver;
  const capabilities = {
    os: 'Windows',
    build: '0.1.0',
    project: 'jest-selenium-browserstack-example',
    'browserstack.local': true,
    'browserstack.user': '',
    'browserstack.key': BrowserStackLocalArgs.key,
    ...browser,
  };

  describe(
    'selenium webdriver',
    () => {
      beforeAll(async () => {
        driver = await new webdriver.Builder()
          .usingServer('http://hub-cloud.browserstack.com/wd/hub')
          .withCapabilities(capabilities)
          .build();
        console.log('driver start');
      }, 20000);

      afterAll(async () => {
        await driver.quit();
        console.log('driver quit');
      }, 20000);

      describe(`desc ${capabilities.browserName}`, () => {
        test(`test ${capabilities.browserName}`, async () => {
          console.log('tests start');
          await driver.get(
            `http://${
              capabilities['browserstack.user']
            }.browserstack.com/test.html`,
          );
          const btn = await getElementById(driver, 'test-button');
          await btn.click();

          const output = await getElementById(driver, 'output');
          const outputVal = await output.getAttribute('value');

          expect(outputVal).toEqual('Something');
          console.log('tests end');
        });
      });
    },
    30000,
  );
}
```

Although it seems quite easy, you need to take care of several things:

1. `describe` can not use `async` function, so there is no way to prepare `driver` instance to use directly inside `describe` block, it can be used only inside `test` body, which may be asynchronous
2. Jest scoping is a topic which is worth refreshing to fully understand what is going on in the presented code https://jestjs.io/docs/en/setup-teardown#scoping
3. `beforeAll` and `afterAll` are scoped by `describe` blocks and what is more important both of them supports asynchronous function as an argument
4. Remember about timeouts, default 5s is often not enough

More details and sample files can be found in this repository https://github.com/jmarceli/jest-selenium-browserstack-example, especially in `test/sequential.test.js` file.

## Sources

https://www.browserstack.com/automate/node
https://www.browserstack.com/list-of-browsers-and-platforms?product=automate
