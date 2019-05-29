---
layout: post
author: Ghost
title: Dry-validation custom error messages
excerpt: dry-validation with custom error messages
meta_description: null
meta_title: null
slug: dry-validation-custom-error-messages
date: '2017-04-07T03:30:00.000Z'
date_created: '2017-03-30T22:59:16.000Z'
date_updated: '2018-11-08T00:31:46.000Z'
image: ./img/pexels-photo-210585-1.jpeg
featured: false
draft: false
tags:
  - Ruby
  - Rails
---
While defining custom errors is described in [the official documentation](http://dry-rb.org/gems/dry-validation/error-messages/) I had a few issues. Here are my findings.

First of all `i18n` integration and custom messages requires you to restart the dev server **it's important**. You should do a restart after making any changes in the `yaml` file. It seems that `dry-validation` caches somehow all the error messages, which is quite annoying if you are unsure how to properly structure your translations file.

Combining namespaces and i18n is not as straight forward as you may expect. Here is the example:

**Yaml file with translations**
```yaml
pl:
  errors:
    # default messages for this locale
    filled?: This field shouldn't be blank
    str?: Something about the string requirement

    rules:
      # namespaced messages
      note: # namespace name
        rules:
          content: # checked field name
            filled?: Namespaced message
```

**Code which uses this translations**
```ruby
schema = Dry::Validation.Form do
  configure {
    config.namespace = :note
    config.messages = :i18n
  }
  required(:content).filled(:str?)
end

schema.call(params.to_unsafe_h).messages(locale: I18n.default_locale)
# expected result: {:content => ["Namespaced message"]}
```

While using `i18n` integration with a Rails application there is **no need to provide** custom `yaml` file path with:
```
schema = Dry::Validation.Form do
  configure { config.messages_file = '/path/to/my/errors.yml' }
end
```
The custom error messages will be loaded like any other translations from your `config/locales/[any-name].yml` file.


## Disclaimer

These are just my findings during integration with existing Rails App I may be mistaken at some points (or maybe even all of them). So be careful if you try to follow this path.
