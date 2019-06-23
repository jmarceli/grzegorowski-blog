---
layout: post
author: ghost
title: Meteor node-simple-schema and Meteor.users collection
excerpt: null
meta_description: >-
  How to use node-simple-schema validations with Meteor.users collection (Meteor
  accounts system).
meta_title: null
slug: meteor-node-simple-schema-and-meteor-users-collection
date: '2017-07-14T15:41:45.000Z'
date_created: '2017-07-14T15:00:18.000Z'
date_updated: '2017-07-14T15:48:52.000Z'
image: ./img/pexels-photo-30257.jpg
featured: false
draft: false
tags:
  - meteor
---
If you use Meteor you have to come across the [node-simple-schema](https://github.com/aldeed/node-simple-schema) formerly known as `meteor-simple-schema`. This is definitely a great package which eases data validation a lot by allowing you to define some schema for your MongoDB (which is schema-less DB).
Whereas creating a schema for your custom data type is easy (just follow the `node-simple-schema` docs), integration with external packages may require some knowledge. As an example I will describe the process of writing a basic schema for the Accounts Meteor functionality and the [accounts-password](https://docs.meteor.com/api/passwords.html) package.

## Educated guesses

There is no official documentation about Meteor Accounts and `node-simple-schema` integration, so (probably) the only way is to make some educated guesses about the internal structure of `Meteor.users` collection. The first place to look at is http://docs.meteor.com/api/accounts.html#Meteor-users (here is the relevant code):

```javascript
{
  _id: 'QwkSmTCZiw5KDx3L6',  // Meteor.userId()
  username: 'cool_kid_13', // Unique name
  emails: [
    // Each email address can only belong to one user.
    { address: 'cool@example.com', verified: true },
    { address: 'another@different.com', verified: false }
  ],
  createdAt: new Date('Wed Aug 21 2013 15:16:52 GMT-0700 (PDT)'),
  profile: {
    // The profile is writable by the user by default.
    name: 'Joe Schmoe'
  },
  services: {
    facebook: {
      id: '709050', // Facebook ID
      accessToken: 'AAACCgdX7G2...AbV9AZDZD'
    },
    resume: {
      loginTokens: [
        { token: '97e8c205-c7e4-47c9-9bea-8e2ccc0694cd',
          when: 1349761684048 }
      ]
    }
  }
}
```

After reading this short example you may have a general idea about the structure of data stored inside `users` collection. Based on that knowledge let's write some `SimpleSchema` related code:

```javascript
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const User = new SimpleSchema({
  username: { type: String, label: "Username" },
  services: { type: Object, blackbox: true },
  emails: { type: Array, optional: true },
  createdAt: Date,
  profile: { type: Object, blackbox: true, optional: true },
}, { tracker: Tracker });

export { User };
```

This seems to be the minimal working schema example for the Meteor `users` collection. As far as I know the `_id` field doesn't require to be defined inside SimpleSchema.

## Adding accounts-password validation

If you are using `accounts-password` package (like I do) you may also specify the exact `services.password` keys for password type validation. Here is how it may look:

```javascript
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const User = new SimpleSchema({
  username: { type: String, label: "Username" },
  services: Object,
  'services.password': Object,
  'services.password.bcrypt': { type: String, label: "Password" },
  'services.resume': { type: Object, blackbox: true, optional: true },
  emails: { type: Array, optional: true },
  createdAt: Date,
  profile: { type: Object, blackbox: true, optional: true },
}, { tracker: Tracker });

export { User };
```

The above example assumes that you are using only `password` package for other packages (e.g. `accounts-facebook`) you will have to specify correct `services.[package-name]` keys (e.g. `services.facebook.id`, `services.facebook.accessToken`).
Another thing worth noting is the `services.resume` key which is required in order to login user properly, because the data about existing sessions is stored inside `resume` object.

In order to check if your schema works correctly you may execute a command like:
```javascript
Accounts.createUser({ password: 'some_password', username: 'test123' })
```
From the Meteor interactive shell, you can open it when the meteor server is running with `meteor shell` command.

## Conclusion

It's fairly easy to validate existing/external package data with `node-simple-schema` if only you know the internal structure of the validated data. If you are adding the validation to the existing app you may find it useful to check the database first with `meteor mongo` and `db.[your_collection].find()` to ensure that the collection structure matches your expectations.
