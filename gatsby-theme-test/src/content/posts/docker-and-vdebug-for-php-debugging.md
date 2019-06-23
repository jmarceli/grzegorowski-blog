---
layout: post
author: ghost
title: Docker and Vdebug for PHP debugging
excerpt: null
meta_description: >-
  How to setup Vdebug Vim debugger with separate Docker container for each
  project. Automatic path_maps  thanks to the vim-projectroot plugin.
meta_title: Docker and Vdebug setup for PHP DBGP debugging
slug: docker-and-vdebug-for-php-debugging
date: '2017-06-17T17:05:00.000Z'
date_created: '2017-06-17T17:05:16.000Z'
date_updated: '2017-06-22T12:13:11.000Z'
image: ./img/docker-vdebug-php.jpg
featured: false
draft: false
tags:
  - Vim
  - Web developer toolset
---
Docker is a great tool but unfortunately when you have a separate container for each web project you may start having issues with the debugger path mappings. In this short article, I will describe how to setup Vdebug which is a Vim DBGP debugger to work with multiple Docker containers. I'm not sure but maybe it will be also somehow useful for other debuggers/setups.

The solution described below assumes that you have a `docker-compose.yml` file in the directory which is mapped as your web root folder in the Docker container. If you don't have such configuration you may place e.g. empty `.projectroot` file but it will be less convenient as it will require remembering about this additional step.

## Docker with Vdebug

When you use Docker each project has same web server root path which is something like `/app` or `/var/www` or something similar. In my case, it is `/app` for every container I've run via Docker.

This is a problem for the debugger because it doesn't know how to map remote file paths to your local file system during the debug process. If you are using Vim with Vdebug you may setup a custom `path_maps` option, but it is impossible to map multiple local paths to one remote path `/app` (which is the case with a Docker containers) e.g.

```vim
let g:vdebug_options = {
  'path_maps': {
    '/app': '/Users/username/projects/myproject1',
    '/app': '/Users/username/projects/myproject2'
  }
}
```

This problem is described here on the [Github issue](https://github.com/joonty/vdebug/issues/197).

As for now, the only solution seems to be changing the paths mapping during the start of the Vim editor. In order to achieve full automation of this process, you will have to install another Vim plugin which is [vim-projectroot](https://github.com/dbakker/vim-projectroot).

After a **vim-projectroot** installation put the following line inside your `.vimrc` file:

```vim
" PROJECTROOT
let g:rootmarkers = ['.projectroot', 'docker-compose.yml', '.git', '.hg', '.svn', '.bzr','_darcs','build.xml']
```

This way your project root will be automatically discovered by your `docker-compose.yml` file location (or any other file on the list).

Now it's time to setup the automatic Vdebug `path_maps`. In your `.vimrc` add following lines:
```vim
function! SetupDebug()
  let g:vdebug_options['path_maps'] = {'/app': call('projectroot#get', a:000)}
  " Hack to override vdebug options
  source ~/.vim/bundle/vdebug/plugin/vdebug.vim
endfunction
autocmd VimEnter * :call SetupDebug()
```

A short description of the code above.
It will execute `SetupDebug()` function each time you open a Vim editor (check the [VimEnter event](http://vimdoc.sourceforge.net/htmldoc/autocmd.html)). Thanks to the installed **vim-projectroot** plugin the editor can "guess" what is your current project root path and adjust `vdebug_options` accordingly.
The example above assumes that your Docker container web server points at `/app` folder and that you have a `docker-compose.yml` file in your local filesystem application root folder.

Now each time you open a new Vim editor it will reassign `path_maps` option to match your current project root with the Docker web server root.

## Example

Provided that your `docker-compose.yml` file is inside `/Users/username/projects/myproject` folder and your Docker container maps this folder to the `/app` directory e.g.
```docker
version: '2'
services:
  your_container_name:
    volumes:
      - $PWD:/app
```
When you start the Vim in any of the `/Users/username/projects/myproject` subdirectories your `path_maps` will become:
```vim
'/app': '/Users/username/projects/myproject'
```
This should result in correct path mappings inside Vdebug debugger.

## Hints

You may check current Vdebug options values by executing in the Vim command line:
```vim
:echo g:vdebug_options
```

If you are having some more troubles with the Docker + Vdebug setup feel free to leave a comment below.
