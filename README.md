Audio Tags
==========

**Custom audio... with less boilerplate**

An experimental thingie bridging Web Components with Web Audio.

First presented at Cascadia JS 2013. Grab the slides for the talk [here](http://soledadpenades.com/files/t/cascadiajs-audio-tags/).

The main idea is to be able to express modular audio setups in a declarative way, using web components.

Why? For prototyping, learning, whatever, and also... because why not?

## To check it out

Open the `examples` folder and go through them.

## How to use

A `dist` folder is provided with `AudioTags.bundle.css` and `AudioTags.bundle.js`. To use Audio Tags in your project you need to load them first, then `register` them, and wait for the `DOMComponentsLoaded`. Or in other words this is the minimum code you'd need:

````html
<!doctype html>
<html>
	<head>
		<meta charset="utf8">
		<title>Registering AudioTags example</title>
		<link href="../../dist/AudioTags.bundle.css" rel="stylesheet" media="all" />
	</head>
	<body>
		<!--Audio Tags here-->
		<script src="../../dist/AudioTags.bundle.js" type="text/javascript"></script>
		<script>
			window.addEventListener('DOMComponentsLoaded', function() {
				require('AudioTags').register();
			}, false);
		</script>
	</body>
</html>
````

## How to build

* clone the repo
* you need node installed in your system and `browserify` as global (`npm install -g browserify`)
* cd to the folder where you cloned the project, then just run `build.sh`

Hopefully magic will happen.

As long as you're using something like Bash. I don't think it'll work in Windows but I'm happy to be proved wrong.

## What is missing

* When nodes are inserted or removed after initial page load.
* The examples are kinda ugly.
* The build system is pretty raw (`build.sh`).
* Since we're depending on x-tags and including it on the bundle, what do we do to play nice with other libraries that use x-tag such as Brick?
* Some other oddities.
* Waveshaper is pretty unfinished and many other things are not quite done.
* This is a prototype and I'm officially inviting you to fork this repository and play with the code. Maybe even send a PR. Let's discuss!

