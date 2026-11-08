# Design Document for 1255: Rise of Teutonics (the game).

## Genre
The game has mix of a few genres:  
- an idle game (you town progress while do nothing)
- an idle game (you hero progress while do nothing), this mode influenced by Fallout Shelter and called AutoCampaign
- an incremental game (the numbers goes up, virtually with no limits, cost of upgrades also goes up)
- a city management game (you need to build different buildings, appoint civil and military services, deal with disasters and so on)
- a (virtual) turn-based strategy, where you do explore the HoMM-like map, called Adventure Map for future references
- NOT YET DONE: turn-based Heroes-like tactical combat

## Synopsis
The game starts as you (as knight of Teutonic order) came to build a fortified city in the year of 1255 A.D. on the shores of the Baltic sea.
You start building a town, then experience a Catastrophe, after which your city moved to alternative dimension. It's the same medieval, but now enriched with non-human races, magic and stuff.
After the Cataclism, you need to find the way back to your own dimension, and not to extinct in somewhat hostile environment (double hostile to your default aligment of pious Church follower)

## Style of gameplay
You can play it in almost idle-like (occasionally visit the tab with the game)
You can play it in active like type (actively manage your city, place events, to explore and to fight on Adventure Map)
You can mix it, depending on your free time

## Systems

### GameLoop
GameLoop is the core system of the game.
The very first,basic and all-mighty system is the GameLoop.
In the base, GameLoop `ticks` every `30s` (base value, could be tuned up or down).
Every 30s in your game passes 1 season (winter, spring, summer, autumn).
Then, game calculates what happens during the season.
The function called inside the `GameLoop` called `calculateTurn`.

It calculates:
- growth of population
- money income, paid as taxes from your citizens (so income is a function from number of the citizens)
- money expenses (all them are optional, so I would cover them in Mechanics)

If enabled, it also calculates outcomes of Mechanics, which are part of the GameLoop

### Caps
There is population limit (cap), which depends on level of houses (present or not, and the current level of upgrade).
More houses means bigger population limit

There is money limit (cap), which depends on level of treasury building (present or not, and the current level of upgrade).
Higher level treasury means bigger houses means bigger population limit

### CityBuilding and Caps (or limits)
The second system introduced in the game is CityBuilding.
It allows you to build or upgrade diffrent buildings.
Most of the buildings virtually has no cap, but we agreed that we would set 20 lvl cap for the most building.
The buildings with different cap mechanics:
1) Defence line. It has only three levels: fence, wooden castle, stone castle
2) University. Basically doesn't allow to upgrade it.

Also, leveling of your houses and treasury building is essential 

## Mechanics

Random events.
So far we have those events:
Stealing, plagues, lottery win

Services and units.
Treasury guards. 
Affects chances of theft (happening), chances of theft (succeed)
Affects chances to stop the plague.

--todo mechanic--
I mean to introduce new type of guards - city militia.
City militia would affect chances of theft (happening), chances of theft (succeed)
City militia would affect chances to stop plague.
After city militia would be present, treasury guards no more would affect chances to stop the plague
--end of todo mechanic--

--todo mechanic--
I mean to introduce new defense mechanic
It would greaterly decrease chance of attack to the city and success rate of it.
--end of todo mechanic--

--probably defence upgrades--
like bowling oil, arrow slits and so on
--

Fountain && Hanging tree
If you ever played Stronghold (Stronghold Crusader) game, you know, that

Stash
Stash decreases maximum amount of money thefts could steal from you (affects random event "stealing")

Stables
Stables provide ability to hire horsed units.
brother-sergeants, brother-knights, turkopols

To hire brother-knights you need to have Stables 2nd level or greater
To hire turkopols you also need a shooting range

Level of stables affects stats of hired horsed units:
--todo--
(add more HP for mounted archers, 
--end of todo--

Map generator.
Map generator generates adventure maps for a player.
Usually it is a square map, somewhat 16x16 tiles by default.
Generator places the city, the blackmarket, some chests, some monsters to guard the chests

Hero generator.
<descr>


The Inn.
Gosh, probably the best thing we covered so far.
First, building the Inn provokes to generate map by map generator.
Second, the Inn allows you to hire heroes.
Third, it allows you launch autocampaigns (described below)

Autocampaigns


## Parameters and descriptions

## Art design

## Interface and Controls
