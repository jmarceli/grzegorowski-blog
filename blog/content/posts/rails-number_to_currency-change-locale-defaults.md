---
layout: post
author: jan
title: Rails number_to_currency change locale defaults
excerpt: null
meta_description: null
meta_title: null
slug: rails-number_to_currency-change-locale-defaults
date_created: '2017-04-22T00:09:25.000Z'
date_updated: '2018-01-15T23:54:45.000Z'
feature_image: null
featured: false
draft: false
tags: []
---
ActiveSupport `number_to_currency` helper method may be extremely useful if you deal with prices/wages inside your app. By default `number_to_currency` uses your current locale default settings which are OK in most cases but sometimes you may want to change them.

In my case, I have to always display trailing zeros for each price. By default `number_to_currency` doesn't display them at least for a locale which I was using.

I found an option called `strip_insignificant_zeros`, which is/was **not documented** in the official `number_to_currency` [docs](http://api.rubyonrails.org/classes/ActionView/Helpers/NumberHelper.html). Setting it to `true` for each `number_to_currency` execution seems like a bad idea (not DRY at all).

Fortunately, you may define global locale default options inside your e.g. **config/locales/en.yml** like so:
```yaml
en:
  number:
    currency:
      format:
        strip_insignificant_zeros: false
```

The same format might be used for other `number_to_currency` options e.g.
```yaml
en:
  number:
    currency:
      format:
        delimiter: ' '
        format: '%n %u'
        precision: 2
        separator: ','
        strip_insignificant_zeros: false
        unit: 'PLN'
```

One more hint about `number_to_currency` usage is using:
```ruby
ActiveSupport::NumberHelper.number_to_currency(123.12)
```
if you need to use it outside the View.

Some other places where people talk about this:

- [https://stackoverflow.com/questions/23781427/activeadmin-number-to-currency-helper](https://stackoverflow.com/questions/23781427/activeadmin-number-to-currency-helper)
- [https://apidock.com/rails/ActionView/Helpers/NumberHelper/number_to_currency](https://apidock.com/rails/ActionView/Helpers/NumberHelper/number_to_currency)
- [https://stackoverflow.com/questions/7237592/number-to-currency-locale-converting](https://stackoverflow.com/questions/7237592/number-to-currency-locale-converting)
