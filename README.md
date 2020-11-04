###Project FrontEnd

### Where to find the project
Here is the Github repository :
 ```
https://github.com/DulcheE/Projet-Front-End-Development
 ```

### The project's concept
The goal of this project is to create a website using the VueX technology, by receiving data from an API, which is : https://opentdb.com/api_config.php


Our project consists of a Game that mixes the following ideas :
* A trivia game : you are asked questions about various subjects
* A Rogue-like : you frantically go through a dungeon with growing difficulty

Basically, you go through a dungeon, slaying foes. Each foe you encounter will question you on a given theme. Each time you answer wrongly, you lose an HP ; answer correctly, and he'll lose one HP. If you slay him, GG ! Collect your reward, and choose your next dungeon. You can also use items and spells to aid you in your quest (although this will probably not end up in the final project, since it was the least required feature).

We also aim to implement a scoreboard and an account system to keep track your scores, and the overall higher scores (although we don't use a database (yet ?), so we keep some hardcoded values instead)


## Getting Started
The programmation is fully completed, but we have a small requirement : downloading the dependencies.
Don't worry ! We've got you covered.


```
Download the project.
To fully end the download, open a console tab where the project is located, and enter :
  $npm install
  
To make the server operationnal, please enter :
  $npm run serve
```
 

## Using the API open Trivia Database
We use the following API : https://opentdb.com/api_config.php
It allows to search Trivia questions about various parameters :
* category : History, General Knowledge...
* difficulty : easy - medium - hard
* type : True / False or Multiple choices

  
## Using an Event Bus
The key feature of this game (at least, from the backend perspective), is that EVERYTHING is centralized over a file, called GameMaster.vue.
It's goal is to emit events accordingly to what happens in game (ex : make the timer start, make the player gain an HP, make the enemy lose an HP...). Any other file can detect the events emitted, and interact accordingly.

Implementing this event bus made the development so much smoother...


## Authors

It was made by the following Efrei Paris students :
* **BEGEOT Hugues** - [his Git repository](https://github.com/opsilonn)
* **BONI François** - [his Git repository](https://github.com/scorpionsdu78)
* **DULCHE Eddy** - [his Git repository](https://github.com/DulcheE)
* **NAGELS Kevin** - ???

See also the list of [contributors](https://github.com/DulcheE/Projet-Front-End-Development/graphs/contributors) who participated in this project.

Note : we are currently in our 4th year (2019-20), in a Software Engineering cursus.
