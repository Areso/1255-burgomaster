# JS
This folder contains all JS code for the game.  
`game.js` - contains the game code  
`config.js` - contains the game's config, and should be loaded before `game.js`  
`dom.js` - handles work with UI. A target file with UI interactions, except the tab ones.  
`lib_dialogue.js` - contains code, responsible for the modal dialogs so far  
## tab_*
Such files contain code, which run on the corresponding tab  
Although, the code from the `tab_*.js` files could be invoked in any part of the game  
Most likely, game.js invokes the functions from the `tab_*.js` files  
for example, game loading runs over all the game, and updates info on the all tabs
## mech_*
Means mechanic. These files, as a rule, don't affect any particular tab.  
Still, they could invoke changing of the UI inside themselves.  
`mech_online.js` handles all interactions with optional game backend
## objects_*
Such files contain array of objects.  
For an example, `objects_artifacts.js` contains all the supported artifacts  
Be careful with this one - it included in game.js