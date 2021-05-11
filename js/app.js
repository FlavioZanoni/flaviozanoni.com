//imports the noise filter
import time from '../js/shader.js';

// select the scale mode to nearest bc the game is in pixelart
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
 

//global declarations
let w = window.innerWidth;
let h = window.innerHeight;
//sprites container
let sprites = [];
// containers
let startGame = new PIXI.Container();
let scenary = new PIXI.Container();

//creates the app instance
const app = new PIXI.Application({
    width: w,
    height: h
});


//create the canvas on the #gamediv div
document.querySelector("#gamediv").appendChild(app.view);

//loaders
const loader = PIXI.Loader.shared;

loader.add('background', '../images/sprites/background.png')
loader.add('sky', '../images/sprites/sky.png');
loader.add('tree', '../images/sprites/tree.png');
loader.add('ground', '../images/sprites/ground.png');
loader.add('player', '../images/sprites/armored.png');

loader.onComplete.add(loaded);

function loaded() {
    console.log('[app] => Loaded');
    scenary.filters = [time];
    app.stage.addChild(scenary);
    createPlayer();
    app.ticker.add(gameLoop);
}

loader.load((loader, resources) => {
    
    // adding the sprites picked from the loader
    sprites.background = PIXI.Sprite.from(loader.resources.background.texture)
    sprites.tree = PIXI.Sprite.from(loader.resources.tree.texture);
    sprites.ground = PIXI.Sprite.from(loader.resources.ground.texture);
    sprites.sky = PIXI.Sprite.from(loader.resources.sky.texture);
    //sky set
    scenary.addChild(sprites.sky);
    sprites.sky.width = w;
    sprites.sky.height = h;
    
    // backgorund set
    scenary.addChild(sprites.background);
    sprites.background.width = w;
    sprites.background.height = h;
    
    //tree set
    scenary.addChild(sprites.tree);
    sprites.tree.width = w;
    sprites.tree.height = h;
    
    //ground set
    scenary.addChild(sprites.ground);
    sprites.ground.width = w;
    sprites.ground.height = h;
    
    // needs to load the leaves falling
    // needs to load the player 
    // needs to load the interactive parts
});

function createPlayer() {
    sprites.player = PIXI.Sprite.from(loader.resources.player.texture);
    // player set
    sprites.player.width = w / 16;
    sprites.player.height = h / 10;
    sprites.player.x = app.view.width / 2;
    sprites.player.y = app.view.height / 2; 
    app.stage.addChild(sprites.player);
}

// lsiteners and movement
let keys = {};
window.addEventListener("keydown", (e) => { keys[e.key] = true });
window.addEventListener("keyup", (e) => { keys[e.key] = false});

function gameLoop() {
    // w
    if (keys["w"]) {
        /* if (!player.playing) {
            player.textures = playerSheet.walkNorth;
            player.play();
        } */
        sprites.player.y -= 5;
    }
    // a
    if (keys["a"]) {
        /*  if (!player.playing) {
            player.textures = playerSheet.walkWest;
            player.play();
        } */
        sprites.player.x -= 5;
    }
    // s
    if (keys["s"]) {
        /* if (!player.playing) {
            player.textures = playerSheet.walkSouth;
            player.play();
        } */
        sprites.player.y += 5;
    }
    // d
    if (keys["d"]) {
        /* if (!player.playing) {
            player.textures = playerSheet.walkEast;
            player.play();
        } */
        sprites.player.x += 5;
    }
}


// how to animate?
var renderer = new PIXI.autoDetectRenderer(w, h);
function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);
    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(scenary);
}
animate()




