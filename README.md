<p align="center">
  <img width="255" height="255" src="./logo-githarpon.png">
</p>

# Introduction

Cette application est une preuve de concept pour notre projet Git Harpon.

Elle permet d'ouvrir un terminal depuis n'importe quel système d'exploitation. De plus, l'application est disponible en anglais et en français.

Pour cela, nous avons utilisé :

- Angular v7.0.3
- Electron v3.0.8
- Electron Builder v20.28.1
- Bootstrap 4
- le [kit de démarrage](https://github.com/maximegris/angular-electron) de maximegris

# Prérequis

Pour assurer le fonctionnement de cette application depuis n'importe quel OS, il est nécessaire d'avoir installé Node.js.

Nous utiliserons aussi yarn.

### Installation de Node.js
**Windows et macOS**

Il suffit de se rendre sur le site de [Node.js](https://nodejs.org/en/download/).

**Linux**

```sudo apt install nodejs```

```sudo apt install npm```

 ⚠️ Ne faites jamais de ```sudo npm``` sous Linux et macOS ⚠️



### Installation de yarn

**Windows**

Lancer simplement la commande ```npm install -g yarn```

**Linux et macOS**

Il existe un problème de permissions sur Linux et macOS. Pour résoudre ce dernier, il existe deux solutions :

- Changer les permissions du répertoire /usr/local/
- Changer le préfixe de npm

La procédure à suivre est disponible [ici](https://www.youtube.com/watch?v=bxvybxYFq2o).

Une fois cela fait, lancer 
```npm install -g yarn```

## Getting Started

Cloner le répertoire

```git clone https://gitlab.com/Nemtecl/open-terminal.git```

Installer les dépendances 

```yarn install```


## Commandes disponibles


Comme expliqué plus haut, nous avons utilisé le kit de démarrage. Le fichier package.json contenait des commandes très utiles, que nous avons donc utilisées.

|Commande|Description|
|--|--|
|`yarn start`| Exécution de l'application en mode développement avec hot reload. |
|`yarn ng:serve:web`| Exécution de l'application dans un navigateur. |
|`yarn build`| Build l'application. Les fichiers de build se trouvent dans le dossier /dist. |
|`yarn build:prod`| Build l'application avec Angular aot. Les fichiers de build se trouvent dans le dossier /dist. |
|`yarn electron:linux`| Sous Linux, build l'application et crée un `.AppImage`. |
|`yarn electron:windows`| Sous Windows, build l'application et crée un `.exe`, exécutable pour les systèmes en 32 et 64 bits. |
|`yarn electron:mac`|  Sous macOS, build l'application et crée un `.dmg` contenant le `.app`. |

⚠️ Il faut supprimer le dossier release avant d'en regénérer un autre ⚠️

## Ajouter un package

```yarn add [package]```

## Supprimer un package

```yarn remove [package]```

## Ajouter un module natif à Node.js

L'application étant lancée avec Electron, il est possible d'ajouter des modules natifs à Node.js.
Pour cela, il suffit de les ajouter au service ElectronService. Plusieurs modules sont déjà disponibles (Child Process, File System, OS, etc.).


# Contributeurs
 * [Cyrielle Angoula Meka]()
 * [Julien Besnier](https://github.com/BesnierJulien)
 * [Martin Blondel](https://github.com/Philiippe)
 * [Clément Droun](https://github.com/Nemtecl)
 * [Antoine Guillory](https://github.com/antoineguillory)
 * [Julien Lamy](https://github.com/JulienLamy76)
