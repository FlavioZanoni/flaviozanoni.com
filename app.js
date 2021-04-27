var w = window.innerWidth;
var h = window.innerHeight;

// select the scale mode to nearest bc the game is in pixelart
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
    width: w,
    height: h
});

//create the canvas on the #gamediv div
document.querySelector("#gamediv").appendChild(app.view);

// gets data and time
let date = new Date();
let hours = date.getHours();


//loaders
app.loader.add('farMountains', '../images/sprites/farmountains.png')
app.loader.add('mountains', '../images/sprites/mountains.png')
app.loader.add('hills', '../images/sprites/hills.png')
app.loader.add('plants', '../images/sprites/plants.png')
app.loader.add('tree', '../images/sprites/tree.png')
app.loader.add('ground', '../images/sprites/ground.png')

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


app.loader.load((loader, resources) => {

    // adding the sprites picked from the loader
    farMountains = PIXI.Sprite.from(app.loader.resources.farMountains.texture)
    mountains = PIXI.Sprite.from(app.loader.resources.mountains.texture)
    hills = PIXI.Sprite.from(app.loader.resources.hills.texture)
    plants = PIXI.Sprite.from(app.loader.resources.plants.texture)
    tree = PIXI.Sprite.from(app.loader.resources.tree.texture)
    ground = PIXI.Sprite.from(app.loader.resources.ground.texture)

    let startGame = new PIXI.Container()
    let scenary = new PIXI.Container()

    
    //farMoutains set
    scenary.addChild(farMountains)
    farMountains.width = w
    farMountains.height = h
    
    //moutains set
    scenary.addChild(mountains)
    mountains.width = w
    mountains.height = h
    
    //hills set
    scenary.addChild(hills)
    hills.width = w
    hills.height = h
    
    //plants set
    scenary.addChild(plants)
    plants.width = w
    plants.height = h
    
    //tree set
    scenary.addChild(tree)
    tree.width = w
    tree.height = h
    
    //ground set
    scenary.addChild(ground)
    ground.width = w
    ground.height = h
    
    app.stage.addChild(scenary)

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