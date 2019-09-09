# Gatsby blog https://www.grzegorowski.com

Content (blog posts) are located inside `blog/content/posts` directory.
Images should be placed inside `blog/content/posts/img`, those images will be automatically processed by the Gatsby images engine, so there is no need to preprocess them.

## Run development version

In order to preview changes it is useful to run page through development server with `yarn develop` command.

## Release new version

Here is how to release a new version after adding new content or updating an existing page:

1. `yarn build` - builds new Gatsby content to `blog/public/` dir
2. `yarn release` - deploys content of `blog/public/` to Github Pages
3. Wait for changes propagation

---

author: Jan Grzegorowski
