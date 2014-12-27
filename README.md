3w
==

Simple express server for static file delivering.
When it comes to setting up a simple Http server to expose a specific dir, we have bunch of options.
One of the usual way of doing that which has a tone of restrictions, is using `python` like:

```
python -m SimpleHTTPServer 8080
```

which allows me to expose the current dir as a http server on the specific port number.
I created **3w** as an alternative with bunch of advanced features.
Being able to set up http proxies is one of the useful features which saves a lot of pain when developing a web application.
Http proxies are not provided in the current version but they will be soon with a nice and useful way of setting up the configuration.
