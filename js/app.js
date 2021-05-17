//imports the noise filter
import time from '../js/shader.js';

// select the scale mode to nearest bc the game is in pixelart
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
 
//global declarations
let w = window.innerWidth;
let h = window.innerHeight;
let rotation = .04;
let paused;
let click = 0;
//sprites container
let mplayer = [];
let sprites = [];
// containers
let startGame = new PIXI.Container();
let player = new PIXI.Container();
let scenary = new PIXI.Container();

//creates the app instance
const app = new PIXI.Application({
    width: w,
    height: h
});

//howler
let tracks = {
    "planet": new Howl({
        src: ['../sounds/music/Andr3w_-_Planet_140_BPM.mp3'],
        autoplay: true,
        volume: 0.1
    }),
    "cloud": new Howl({
        src: ['../sounds/music/Andr3w_-_Cloud_140_BPM.mp3',],
        volume: 0.1
    }),
    "fun": new Howl({
        src: ['../sounds/music/Andr3w_-_Fun_147_BPM.mp3'],
        volume: 0.1
    }),
    "chill": new Howl({
        src: ['../sounds/music/Andr3w_-_Chill_140_BPM.mp3'],
        volume: 0.1
    })
};

function isPlaying() {
    if (tracks.planet.playing()) {
        return 'planet';
    } else if (tracks.cloud.playing()) {
        return 'cloud';
    } else if (tracks.fun.playing()) {
        return 'fun';
    } else if (tracks.chill.playing()) {
        return 'chill';
    }
}

//create the canvas on the #gamediv div
document.querySelector("#gamediv").appendChild(app.view);

//loaders
const loader = PIXI.Loader.shared;
//player
loader.add('disk', '../images/sprites/player/disk.png');
loader.add('tray', '../images/sprites/player/tray.png');
loader.add('next', '../images/sprites/player/next.png');
loader.add('prev', '../images/sprites/player/prev.png');
loader.add('pause', '../images/sprites/player/pause.png');
loader.add('resume', '../images/sprites/player/resume.png');

//game
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
    app.stage.addChild(player);
    createPlayer();
    app.ticker.add(gameLoop);
}
//sound func
// mute/desmute
function demute() {
    let saveseek;
    let playing = isPlaying();
    click++;

    if (click == 1){
        if (playing == 'planet'){
            tracks.planet.pause();
            paused = 1;
            saveseek = tracks.planet.seek();
            rotation = 0;
        } else if (playing == 'cloud'){
            tracks.cloud.pause();
            paused = 2;
            saveseek = tracks.cloud.seek();
            rotation = 0;
        } else if (playing == 'fun'){
            tracks.fun.pause();
            paused = 3;
            saveseek = traks.fun.seek();
            rotation = 0;
        } else if (playing == 'chill'){
            tracks.chill.pause();
            paused = 4;
            saveseek = tracks.chill.seek();
            rotation = 0;
        }
    } else if (click == 2) {

        if (paused == 1) {
            tracks.planet.play();
            tracks.planet.seek(saveseek);
            rotation = .04;
        } else if (paused == 2) {
            tracks.cloud.play();
            tracks.cloud.seek(saveseek);
            rotation = .04;
        } else if (paused == 3) {
            tracks.fun.play();
            tracks.fun.seek(saveseek);
            rotation = .04;
        } else if (paused == 4) {
            tracks.chill.play();
            tracks.chill.seek(saveseek);
            rotation = .04;
        } else {
            console.log('que foi porra')
        }
        click = 0;
    }
}

// next track
function nextTrack() {
    if (tracks.planet.playing()) {
        tracks.planet.stop();
        tracks.cloud.play();
        console.log('[sound] => next: Cloud');
    } else if (tracks.cloud.playing()) {
        tracks.cloud.stop();
        tracks.fun.play();
        console.log('[sound] => next: Fun');
    } else if (tracks.fun.playing()) {
        tracks.fun.stop();
        tracks.chill.play();
        console.log('[sound] => next: Chill');
    } else if (tracks.chill.playing()) {
        tracks.chill.stop();
        tracks.planet.play();
        console.log('[sound] => next: Planet');
    } else {
        console.log('[sound] => Err01');
    }
}

function backTrack() {
    if (tracks.planet.playing()) {
        tracks.planet.stop();
        tracks.chill.play();
        console.log('[sound] => next: Chill');
    } else if (tracks.cloud.playing()) {
        tracks.cloud.stop();
        tracks.planet.play();
        console.log('[sound] => next: Planet');
    } else if (tracks.fun.playing()) {
        tracks.fun.stop();
        tracks.cloud.play();
        console.log('[sound] => next: Cloud');
    } else if (tracks.chill.playing()) {
        tracks.chill.stop();
        tracks.fun.play();
        console.log('[sound] => next: Fun');
    } else {
        console.log('[sound] => Err01');
    }

}

function redirect() {
    window.location.href = "https://soundcloud.com/user-102055220";
}

loader.load((loader, resources) => {
    
    // adding the sprites picked from the loader
    //music
    mplayer.disk = PIXI.Sprite.from(loader.resources.disk.texture);
    mplayer.tray = PIXI.Sprite.from(loader.resources.tray.texture);
    mplayer.next = PIXI.Sprite.from(loader.resources.next.texture);
    mplayer.prev = PIXI.Sprite.from(loader.resources.prev.texture);
    mplayer.pause = PIXI.Sprite.from(loader.resources.pause.texture);
    mplayer.resume = PIXI.Sprite.from(loader.resources.resume.texture);

    player.addChild(mplayer.tray);
    mplayer.tray.width = 120;
    mplayer.tray.height = 45;
    mplayer.tray.x = -20
    mplayer.tray.y = -10

    //next
    player.addChild(mplayer.next);
    mplayer.next.width = 25;
    mplayer.next.height = 25;
    mplayer.next.interactive = true;
    mplayer.next.buttonMode = true;
    mplayer.next.on('pointerdown', nextTrack);
    
    //prev
    player.addChild(mplayer.prev);
    mplayer.prev.width = 25;
    mplayer.prev.height = 25;
    mplayer.prev.interactive = true;
    mplayer.prev.buttonMode = true;
    mplayer.prev.on('pointerdown', backTrack)

    //play / pause
    player.addChild(mplayer.resume);
    mplayer.resume.width = 25;
    mplayer.resume.height = 25;
    mplayer.resume.interactive = true;
    mplayer.resume.buttonMode = true;
    mplayer.resume.on('pointerdown', demute);

    player.addChild(mplayer.disk);
    mplayer.disk.width = 60;
    mplayer.disk.height = 60;
    mplayer.disk.anchor.set(0.5);
    mplayer.disk.interactive = true;
    mplayer.disk.buttonMode = true;
    mplayer.disk.on('pointerdown', redirect);

    player.x = w - 200;
    player.y = h - 900 ;
    
    mplayer.prev.x = -5;
    mplayer.prev.y = 2;

    mplayer.resume.x = 22;
    mplayer.resume.y = 2;

    mplayer.next.x = 50;
    mplayer.next.y = 2;

    mplayer.disk.x = 110;
    mplayer.disk.y = 15;


    //game
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
    sprites.player.width = w / 8;
    sprites.player.height = h / 4;
    sprites.player.x = app.view.width / 2;
    sprites.player.y = app.view.height / 2; 
    app.stage.addChild(sprites.player);
}

// lsiteners and movement
let keys = {};
window.addEventListener("keydown", (e) => { keys[e.key] = true });
window.addEventListener("keyup", (e) => { keys[e.key] = false});

function gameLoop() {
    mplayer.disk.rotation += rotation
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