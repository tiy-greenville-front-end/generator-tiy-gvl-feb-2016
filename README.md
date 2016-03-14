### Yeoman TIY Generator

This is a [Yeoman](http://yeoman.io/) generator made specifically for students at The Iron Yard and is used as an introduction to Yeoman & npm. It includes a specific set of tools that we use throughout our course and purposefully omits certain ones until we need them.

### What is Included
* Sass
* jQuery
* Underscore

### What is Optional

* Bootstrap
* Backbone
* React

### Installation & Usage

To install:

```sh
npm install -g generator-tiy-gvl
```

To update:

```sh
npm update -g generator-tiy-gvl
```

This is used like any other Yeoman generator. Simply navigate to your new project folder and run:

```sh
# Important: *run this inside the project directory*
yo tiy-gvl
```

## npm Tasks

There are a few specific tasks so feel free to check out the `package.json` but the most used one will be.

* `npm run watch` - Starts a server and watches for changes, also livereload
