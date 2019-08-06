---
layout: post
author: jan
title: Ionic 3 Framework - setFocus on opened modal input
excerpt: null
meta_description: null
meta_title: null
slug: ionic-3-framework-setfocus-of-an-input
date: '2018-04-20T03:41:00.000Z'
date_created: '2018-04-25T22:59:15.000Z'
date_updated: '2018-09-15T12:13:23.000Z'
feature_image: >-
  img/photo-1528916484197-ce92c83dc038.jpg
featured: false
draft: false
tags:
  - frontend
  - javascript
---
Use `ngAfterViewChecked()` Angular hook and execute `.setFocus()` inside it.

While working with the Ionic 3 Framework I came across (as it turns out) popular problem of autofocusing an input after showing a component on the page.

The most popular answer to this problem advises to use `setTimeout`:
```js
ionViewLoaded() {
    setTimeout(() => {
        this.myInput.setFocus();
    },150);
}
```

I hate such workarounds so I've decided to dig deeper. While none of the available [Ionic lifecycle hooks](https://blog.ionicframework.com/navigating-lifecycle-events/) works in that case there are also [Angular lifecycle hooks](https://angular.io/guide/lifecycle-hooks). It turns out that `ngAfterViewChecked` is the one I was looking for:

```js
ngAfterViewChecked() {
    this.myInput.setFocus()
}
```

So that is clean `setFocus()` solution for Ionic without using `setTimeout()` workaround.

## Sidenote
In order to be able to refer to the input element with `this.myInput` you have to define it inside your Component as a ViewChild.

Here is the example of Modal Component which will autofocus its input after showing itself on the page.
Javascript:
```js
@Component({
  selector: 'location-modal-create',
  templateUrl: 'modal-create.html'
})
export class LocationCreateModal {
  private location: FormGroup;

  @ViewChild('myInput') myInput;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder
  ) {
    this.location = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.params = params;
    this.viewCtrl = viewCtrl;
  }

  ngAfterViewChecked() {
    this.myInput.setFocus()
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
```

Html:
```html
<ion-header>
  <ion-toolbar>
    <ion-title>
      New Location
    </ion-title>
    <ion-buttons end>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="close" hideWhen="ios"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <form [formGroup]="location" (ngSubmit)="submit()">

    <ion-item>
      <ion-label floating>Location name</ion-label>
      <ion-input #myInput formControlName="name" type="text"></ion-input>
    </ion-item>

    <div padding *ngIf="location.valid">
      <button ion-button block>Create Location</button>
    </div>
    <div padding *ngIf="!location.valid">
      <button ion-button block disabled outline>Please fill Location data</button>
    </div>

  </form>
</ion-content>
```

## Sources
https://forum.ionicframework.com/t/setting-focus-to-an-input-in-ionic/62789/36
https://stackoverflow.com/questions/42693567/not-been-able-to-set-focus-to-my-ion-input-as-i-enter-the-page/43193925
