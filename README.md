[![Angular Logo](./logo-angular.jpg)](https://angular.io/) [![Electron Logo](./logo-electron.jpg)](https://electron.atom.io/) 
#[Monaco Editor](https://github.com/Microsoft/monaco-editor)

# Introduction

This is an integration example to use Monaco editor in Electron app that uses Angular framework.

The following projects have been used:

 *  Maxime GRIS's ultralight Angular + Electron boilerplate: https://github.com/maximegris/angular-electron
 *  Teradata's fantastic Angular wrapper around Monaco editor: https://github.com/Teradata/covalent-code-editor
 *  And of course Monaco editor: https://microsoft.github.io/monaco-editor/

# Details

I made the following modification on orignal code:
 *  Teradata's original wrapper are able to used in non-electron environment. This code is removed, because I focused to Electron
 *  Because this boilerplate uses Angular CLI, I had to make some modification in ```MonacoEditorWrapperComponent``` constructor, to determine the proper application path
 *  The wrapper uses the Monaco editor that is in the node_modules, musn't copy the assets directory

# Main parts

 *  ```/src/electron-load.js```
 *  this script is loaded by angular.json
 *  ```/src/component/monaco-wrapper```


# Run, Build, etc
copy-pasted from original boilerplate:

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

# Contributors
 * [Clément](https://github.com/Nemtecl)
