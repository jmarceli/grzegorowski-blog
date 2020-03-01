# The smallest possible Gatsby theme

## File structure

```bash
src/
  auto-pages/ - pages with paths according to file names e.g. author.js -> /author
  templates/ - used only inside gatsby-node.js inside createPage() function
  styles/ - global stylings
  components/ - reusable components which builds pages
  utils/ - helper methods shared across other files
```

TODO: Eliminate `auto-pages/` dir and move page creation entirely to `gatsby-node.js` script.

## Quick Start

```bash
mkdir my-site
cd my-site
yarn init
# install gatsby-theme-minimal and it's dependencies
yarn add gatsby react react-dom gatsby-theme-minimal
```

Then add the theme to your `gatsby-config.js`. We'll use the long form
here for education purposes.

```javascript
module.exports = {
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-minimal",
      options: {},
    },
  ],
};
```

That's it, you can now run your gatsby site using

```bash
yarn gatsby develop
```

Note that this site doesn't _do_ anything, so you're see a missing
resources error. Create a simple page in `src/pages/index.js` to see a
page on the root url.

```javascript
import React from "react";

export default () => <div>My Site!</div>;
```

## Doing more with themes

You can use this as a place to start when developing themes. I
generally suggest using [yarn
workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) like the
[gatsby-theme-examples repo
does](https://github.com/ChristopherBiscardi/gatsby-theme-examples),
but using `yarn link` or `npm link` is a viable alternative if you're
not familiar with workspaces.
