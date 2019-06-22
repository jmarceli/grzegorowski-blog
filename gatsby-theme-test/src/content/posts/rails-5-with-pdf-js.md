---
layout: post
author: Ghost
title: Rails 5 with PDF.js
excerpt: null
meta_description: A short tutorial about using pdfjs_viewer-rails gem with Rails 5 application.
meta_title: Using PDF.js inside Rails 5 application
slug: rails-5-with-pdf-js
date: '2017-05-30T06:07:04.000Z'
date_created: '2017-04-16T02:49:13.000Z'
date_updated: '2018-03-19T02:01:16.000Z'
image: >-
  ./img/photo-1504355080015-bba52674577b.jpg
featured: false
draft: false
tags:
  - Rails
  - Ruby
---
Opening PDFs directly on the web page was one of the requirements for my recent project. The obvious choice was to use the PDF.js library but using it directly is not as easy as I expect. You have to ensure separate page for PDF viewing and a lot of additional assets.
Fortunately, there is a gem (as usually) which does all of this for you. A [pdfjs_viewer-rails](https://github.com/senny/pdfjs_viewer-rails) works as a mountable rails engine so you don't need to worry about anything. Here is the setup process.

## Add gem to the project

Modify your `Gemfile` file, add the following line:
```ruby
gem 'pdfjs_viewer-rails'
```

Then add necessary routes inside `config/routes.rb`:
```ruby
mount PdfjsViewer::Rails::Engine => "/pdfjs", as: 'pdfjs'
```
Put that line anywhere between
```ruby
Rails.application.routes.draw do
  # e.g. here
end
```
lines.

If you want to have an `<iframe>` with PDF.js preview just add the following lines to one of you view files e.g. `app/views/layouts/application.html.erb`:
```html
<body>
  <iframe src="<%= link_to "display using the full viewer", pdfjs.full_path(file: "/sample.pdf") %>"></iframe>
</body>
```
