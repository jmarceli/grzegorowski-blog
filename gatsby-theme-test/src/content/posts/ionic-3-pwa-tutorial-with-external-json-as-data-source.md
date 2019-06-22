---
layout: post
author: Ghost
title: Ionic 3 PWA tutorial with external JSON as data source
excerpt: null
meta_description: null
meta_title: null
slug: ionic-3-pwa-tutorial-with-external-json-as-data-source
date: null
date_created: '2017-04-24T23:04:46.000Z'
date_updated: '2017-04-27T11:41:56.000Z'
image: null
featured: false
draft: true
tags: []
---
This is a modified version of the official Ionic Framework tutorial available on the [Ionic docs pages](http://ionicframework.com/docs/intro/tutorial/). I will try to describe here how to modify a default *tutorial* App to make it display external JSON data and then deploy it as a PWA ([Progressive Web Application]() which is a cool feature of Ionic 3 Framework.

In order to get started, you will need some basic skills like using a terminal (console) and writing simple commands.

## First step
I assume that you are familiar with the `npm` or at least have it installed on your system, if that's the case just open a terminal and execute:
```bash
npm install -g ionic
```
It will install the Ionic CLI and make it available for future use. If you need more details `-g` option installs npm packages globally.

Just to make sure you can now restart your terminal (or open a new terminal window) and check if `ionic -v` outputs anything. It should print something like this:

![ionic -v sample output](ionic-v)

## The CLI magic
Navigate to the folder where you want to create your brand new tutorial Ionic App. In my case it was something like:
```bash
cd ~/nodejs/ionic
```
Then generate tutorial App using previously installed Ionic CLI:
```bash
ionic start ionic2pwa tutorial --v2
```

![Ionic 3 tutorial App generation](ionic-start-tutorial-app)

Now you should have a directory named `ionic2pwa` with Ionic based App inside.

![Ionic tutorial App inside a directory](ionic-app-content)

Don't let `--v2` option mislead you. It actually doesn't mean that your App will be based on `2.x` Ionic Framework (go and check `package.json` yourself). As far as I know it only means that your App will be based on the Ionic 2 templates, but I may be mistaken. If you won't provide `--v2` option you will get a CLI error (because of the *tutorial* template used for generation).

> At this point I would recommend you to initialize and use some kind of version management system e.g. Git, but that's not something I'm going to describe there.


## "Run it" as a third step
That's not something very interesting but just to make sure that everything works as expected you may try to run your CLI generated App. Use:
```bash
ionic serve
```
![ionic serve terminal command](ionic-serve)

This command will output some progress related info and eventually it should fire a new browser tab with your tutorial App ready to use. By default, it will be available under http://localhost:8100/ and will look similar to the screen below:

![ionic serve command result](ionic-tutorial-app)

A *tutorial* App doesn't do anything useful but it looks OK and shows some basic stuff. Make a few clicks here and there if you want to explore it further, it's just a set of basic Ionic components gathered in one place.

> I'm not going to explain here the structure of the App folders but if you want more details head to the official [docs tutorial](http://ionicframework.com/docs//intro/tutorial/project-structure/).

## Add a page via Ionic CLI
The [official tutorial](http://ionicframework.com/docs//intro/tutorial/adding-pages/) already explains the process of manually adding new pages but you may want to view a different approach, so here it is.

> Use a CLI Luke

In order to add a page just run [a generate command](http://ionicframework.com/docs/cli/generate/) (or `g` as a shorthand):
```bash
ionic g page peopleList
```

![Ionic 3 generate new page with CLI](ionic-g-page)

That's it. Your page is ready... Or is it?

Generate command gives you a very basic page structure, so the **HTML**, **CSS** and **JS** files (technically .scss and .ts). These are of course just empty files with a minimal code inside, which is good.

For starters make sure that you have run `ionic serve` in some of your opened terminal windows. This is necessary to view the results and track the bugs lurking around.

In order to add a new page to the navigation edit *src/app/app.component.ts* file and import it with:
```js
import { PeopleListPage } from '../pages/people-list/people-list';
```
Then use it by appending the new page to `this.pages` array:
```js
// set our app's pages
this.pages = [
  { title: 'Hello Ionic', component: HelloIonicPage },
  { title: 'My First List', component: ListPage },
  { title: 'People List', component: PeopleListPage }
];
```
As you may notice there is now an error visible inside the console where you run the `ionic serve` command. It is there because by default generated page component is named *PeopleList* not *PeopleListPage*. I would like to keep naming conventions from the generated tutorial project so I have to rename `PeopleList` to `PeopleListPage` in **src/pages/people-list/people-list.ts** and **src/pages/people-list/people-list.module.ts** files (it should be fairly simple just replace all occurces of `PeopleList` with a new name).

Now you should see your new page available through page main navigation.

![Ionic 3 App with the new page](ionic-navigation-new-page)

Now navigating to the new page will generate an obese bug report talking about missing ngModule. Something like this:

>Uncaught (in promise): Error: No component factory found for PeopleListPage. Did you add it to @NgModule.entryComponents? Error: No component factory found for PeopleListPage. Did you add it to @NgModule.entryComponents?...

This looks scary but fear not and head to the **src/app/app.module.ts** file. It's enough to just add a few lines.
First of all import newly added page (like we did before):
```js
import { PeopleListPage } from '../pages/people-list/people-list';
```
Then add it to the `declarations` and `entryComponents` arrays to make them look as follows (don't forget about trailing commas):
```js
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    PeopleListPage
  ],
```
```js
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    PeopleListPage
  ],
```
That's it. Your page is now up and running. It's maybe not as useful as you would like it to be but keep reading to make it much more interesting.

![Ionic 3 generated blank page](ionic-tutorial-new-page)

Yup! It's blank you got me.

## Enchance the page
For starters open up the *src/pages/people-list/people-list.html* which is the main template file of your new page. Then based on the other pages modify this file to make it look like this:

![Ionic 3 improved blank page](ionic-tutorial-page-improved)

This will require a few modifications.
```html
<ion-header>

  <ion-navbar>
    <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>People List</ion-title>
  </ion-navbar>

</ion-header>

<ion-content padding>

Here will be the list

</ion-content>
```

So basically I've modified the `<ion-header>` part by adding the navbar similar to the other pages with appropriate `<ion-title>` element. Then I've improved the `<ion-content>` with a placeholder text.

At this point, you have a fully functional useless page with some content and menu.

## External JSON (much more fun?)
Our new nearly blank page is not as fancy as we want it to be. Let it get some external data from a JSON data source. I would use the Random User Generator (https://randomuser.me) for sample data endpoint but it may be any other valid JSON API (or even just a file available through the HTTP).

In order to get started I would once more use Ionic CLI generator, but this time it will create a data provider for my external source.
```bash
ionic g provider PeopleService
```
The provider code available at *src/providers/people-service.ts* looks promising but it needs more work to be fully functional. You will have to fill the PeopleService class code with the following content:
```js
export class PeopleService {
  protected data;
  protected http;

  constructor(http: Http) {
    //console.log('Hello PeopleService Provider');
    this.data = null;
    this.http = http;
  }

  load() {
    if (this.data) {
      // data is already loaded
      return Promise.resolve(this.data);
    }

    // data not available
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('https://randomuser.me/api/?results=10')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
```
The data downloaded with `this.http.get` will be available as a Promise result after fetching it from the https://randomuser.me/api/?results=10. You may check mentioned URL from your browser ins order to get some knowledge about its structure.

Having a data provider ready it's now time to use it inside the People List Page. Newly added lines has some comments with an explanation:

```js
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Import the provider
import { PeopleService } from '../../providers/people-service';

@IonicPage()
@Component({
  selector: 'page-people-list',
  templateUrl: 'people-list.html',
  providers: [PeopleService] // Use it in the component
})
export class PeopleListPage {
  public people: Array<any>; // expect an array with unknown content

  constructor(public navCtrl: NavController, public navParams: NavParams, public peopleService: PeopleService) {
    this.loadPeople(); // try to load external data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeopleList');
  }

  // use previously defined provider for fetching data
  loadPeople() {
    this.peopleService.load()
      .then(data => {
        this.people = data.results;
        console.log(this.people);
      });
  }
}
```

It looks promising but as you may notice the People List page generates an error message similar to the following:

>Uncaught (in promise): Error: No provider for Http! Error at d (http://localhost:8100/build/polyfills.js:3:3991) at injectionError...

If you investigate this issue further you will realize that this is just a missing module which is generating this error. In order to solve this you will have to import an `HttpModule` to the *src/app/app.module.ts* file and the add it to the `imports` array which is defined inside the `@NgModule`.

Now your page content is still the same but after a few template modifications, you will get the desired result.
Open *src/pages/people-list/people-list.html* template file and remove `<ion-content>` placeholder text.
Add following code inside the content tags to make them look as follows:
```js
<ion-content padding>

  <ion-list>
    <ion-item *ngFor="let person of people">
      <ion-avatar item-left>
        <img src="{{person.picture.thumbnail}}">
      </ion-avatar>
      <h2>{{person.name.first}} {{person.name.last}}</h2>
      <p>{{person.email}}</p>
    </ion-item>
  </ion-list>

</ion-content>
```
This is simple Ionic specific items list which is generated by iterating over the people dataset fetched by the provider service.

Now after saving changes you can open the People List page and view the results. You should see something similar to this.

![Ionic 3 external JSON loaded to the template](ionic-tutorial-external-json)

## Request spinner (preloader)
You may notice that after opening the People List page there is a short period when list content is not ready (it is retrieved from the external URL). Wouldn't be nice to show the user that something is happening in the background and he should wait for a while?

That is probably the main purpose of the `<ion-spinner>` component. Here is how it might be used with our sample App.

*src/pages/people-list/people-list.html*

```js
<ion-content padding>

  <ion-spinner *ngIf="!people"></ion-spinner>
  <ion-list *ngIf="people">
    <ion-item *ngFor="let person of people">
      <ion-avatar item-left>
        <img src="{{person.picture.thumbnail}}">
      </ion-avatar>
      <h2>{{person.name.first}} {{person.name.last}}</h2>
      <p>{{person.email}}</p>
    </ion-item>
  </ion-list>

</ion-content>
```
As you may see I've just added `<ion-spinner>` component with `*ngIf` condition for spinner and list to show one of them depending on the data loading stage.

That's all now after visiting People List page you should see the default Ionic spinner during the data loading.

## Deploy
The deploy part is fairly easy because you will use one or more predefined commands depending on the target device. As I titled this article a PWA tutorial I would like to demonstrate a browser deploy.

Let's start with adding a browser as a deploying platform.
```bash
// TODO: add browser deploy info
```

## Summary
Making a tutorial App in Ionic is not so hard and event with small modifications it might be useful for a data presentation.

**Sources:**

http://blog.ionic.io/10-minutes-with-ionic-2-calling-an-api/
http://ionicframework.com/docs/
https://forum.ionicframework.com/t/deploying-pwa/73749/4
