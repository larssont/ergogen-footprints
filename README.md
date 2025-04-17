# Ergogen Footprints

This repo contains a variety of KiCad footprints for Ergogen that I've made or modified while designing keyboards.

Feel free to use any of them in your projects; I hope you find them useful!

Most of these were created from scratch, however a few were made using [kicad2ergogen](https://github.com/genteure/kicad2ergogen). A handy tool if you want to quickly convert some KiCad footprints to work with Ergogen. 

## Installation

The simplest way to use these footprints is to clone the repo directly into the `footprints` folder in your personal project.

If your project is already a Git repository, you can add this repo as a submodule inside the `footprints` folder.

```
git submodule add https://github.com/larssont/ergogen-footprints.git footprints/larssont
```

A folder named `larssont` should now exist within the footprints folder of the current directory.

## How To Use

In order to use the custom footprints, simply prepend the name of the footprint with the folder they are located in. Assuming you followed the above install steps, you can use the `piezo` footprint for instance like this:

```
      piezo:
        what: larssont/piezo # <- Note the name
        where:
          - ref: piezo
        params:
          A: P1
          B: GND
````

## License

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.
