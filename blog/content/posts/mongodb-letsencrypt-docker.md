---
layout: post
author: jan
title: MongoDB + Letsencrypt + Docker
excerpt: null
meta_description: null
meta_title: null
slug: mongodb-letsencrypt-docker
date_created: '2018-02-18T02:01:20.000Z'
date_updated: '2019-03-03T16:20:05.000Z'
feature_image: img/docker-containers.jpg
featured: false
draft: false
tags: []
---
How to setup MongoDB Docker container to use Let's Encrypt SSL certificate with autorenewal support?
That's something which should be much easier to do than it is now.


https://docs.docker.com/engine/api/v1.36/#operation/SystemEvents
Example:
```sh
curl -G -v --unix-socket /var/run/docker.sock http:/events --data-urlencode 'filters={"container":["nginx-mongo"]}'
```

Filter **nginx-mongo** container restarts:

```sh
curl -G -v --unix-socket /var/run/docker.sock http:/events --data-urlencode 'filters={"container":["nginx-mongo"],"event":["restart"]}'
```

This should work (but doesn't):

```sh
while read l; do echo "OK"; done < <(curl -GET -s --unix-socket /var/run/docker.sock http:/events --data-urlencode 'filters={"container":["nginx-mongo"],"event":["restart"]}')
```

Such command may trigger **mongodb.pem** key+cert file generation by:
```sh
awk 1 /etc/nginx/certs/srp.predictail.com.key /etc/nginx/certs/srp.predictail.com.crt > /mongo-ssl/mongodb.pem
```

### Sources:

https://stackoverflow.com/questions/878600/how-to-create-a-cron-job-using-bash-automatically-without-the-interactive-editor
https://askubuntu.com/questions/640055/concatenate-two-files-and-separate-them-with-a-newline
https://docs.mongodb.com/manual/tutorial/configure-ssl/
https://medium.com/lucjuggery/about-var-run-docker-sock-3bfd276e12fd
