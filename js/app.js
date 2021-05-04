//imports the noise filter
import noise from '../js/shader.js';

// select the scale mode to nearest bc the game is in pixelart
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

//global declarations
let w = window.innerWidth;
let h = window.innerHeight;
// gets data and time
let date = new Date();
let hours = date.getHours();
//sprites container
let sprites = [];
// containers
let startGame = new PIXI.Container()
let scenary = new PIXI.Container()


//creates the app instance
const app = new PIXI.Application({
    width: w,
    height: h
});

//create the canvas on the #gamediv div
document.querySelector("#gamediv").appendChild(app.view);

//loaders
const loader = PIXI.Loader.shared;
loader.add('farMountains', '../images/sprites/farmountains.png');
loader.add('mountains', '../images/sprites/mountains.png');
loader.add('hills', '../images/sprites/hills.png');
loader.add('plants', '../images/sprites/plants.png');
loader.add('tree', '../images/sprites/tree.png');
loader.add('ground', '../images/sprites/ground.png');


loader.onComplete.add(loaded);
function loaded() {
    console.log('f');
    app.stage.addChild(scenary)
    scenary.filters = [noise]
}
/*
//load the right image depending on the date
//checks for morning (6am to 12am) afternoon (12 to 17) evening (17 to 20) night(20 to 6)
if(hours > 6 && hours < 12){
    //load moutains
    app.loader.add('mountains', '../images/sprites/morning/morning.jpg')
    //load terrain
    app.loader.add('ground')
    //load sakura
    app.loader.add('sakura')
    //load player
    app.loader.add('player')
    //load tree leaves
    app.loader.add('leaves')
    //load nav
    app.loader.add('nav')
} else if (hours >= 12 && hours < 17) {
    //load moutains
    app.loader.add('mountains','../images/sprites/afternoon/afternoon.jpg')
    //load terrain
    app.loader.add('ground')
    //load sakura
    app.loader.add('sakura')
    //load player
    app.loader.add('player')
    //load tree leaves
    app.loader.add('leaves')
    //load nav
    app.loader.add('nav')
} else if (hours >= 17 && hours <   0) {
    //load moutains
    app.loader.add('mountains', '../images/sprites/evening/evening.jpg')
     //load terrain
    app.loader.add('ground')
    //load sakura
    app.loader.add('sakura')
    //load player
    app.loader.add('player')
    //load tree leaves
    app.loader.add('leaves')
    //load nav
    app.loader.add('nav')
} else {
    //load moutains
    app.loader.add('mountains', '../images/sprites/night/night.jpg')
    //load terrain
    app.loader.add('ground')
    //load sakura
    app.loader.add('sakura')
    //load player
    app.loader.add('player')
    //load tree leaves
    app.loader.add('leaves')
    //load nav
    app.loader.add('nav')
}
*/
loader.load((loader, resources) => {

    // adding the sprites picked from the loader
    sprites.farMountains = PIXI.Sprite.from(loader.resources.farMountains.texture);
    sprites.mountains = PIXI.Sprite.from(loader.resources.mountains.texture);
    sprites.hills = PIXI.Sprite.from(loader.resources.hills.texture);
    sprites.plants = PIXI.Sprite.from(loader.resources.plants.texture);
    sprites.tree = PIXI.Sprite.from(loader.resources.tree.texture)
    sprites.ground = PIXI.Sprite.from(loader.resources.ground.texture)
    
    //farMoutains set
    scenary.addChild(sprites.farMountains)
    sprites.farMountains.width = w
    sprites.farMountains.height = h
    
    //moutains set
    scenary.addChild(sprites.mountains)
    sprites.mountains.width = w
    sprites.mountains.height = h
    
    //hills set
    scenary.addChild(sprites.hills)
    sprites.hills.width = w
    sprites.hills.height = h
    
    //plants set
    scenary.addChild(sprites.plants)
    sprites.plants.width = w
    sprites.plants.height = h
    
    //tree set
    scenary.addChild(sprites.tree)
    sprites.tree.width = w
    sprites.tree.height = h
    
    //ground set
    scenary.addChild(sprites.ground)
    sprites.ground.width = w
    sprites.ground.height = h
    // needs to load the leaves falling
    // needs to load the player 
    // needs to load the interactive parts
    // checar horario, cada horario um cenario com iluminaçao e vibe diferente
    /* 
        serão geradas 4 cenarios:
        manha - sol nascendo, iluminaçao amarelada/laranjada, vento calmo, vibe de tempo fresco
        tarde - sol em no topo, iluminaçao mais azulada, vento mais forte, vibe de tempo mais quente
        fim de tarde - sol no canto, iluminaçao laranjada, vendo forte, vibe de tempo ameno
        noite, lua no céu, vento forte, vibe bem fresca
    */
});




