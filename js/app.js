//imports the noise filter
import time from '../js/shader.js';

// select the scale mode to nearest bc the game is in pixelart
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
 
//global declarations
let w = 512;
let h = 288;
let windoww = window.innerWidth;
let windowh = (window.innerHeight - 15);
let rotation = 0.05;
//sprites container
let sprites = [];
// containers
let startGame = new PIXI.Container();
let scenary = new PIXI.Container();
let mPlayer = new PIXI.Container();

//creates the app instance
const app = new PIXI.Application({
    width: w,
    height: h
});

//scale the image acording to the size of the screen
let scalew = windoww / w;
let scaleh = windowh / h;
//scaleh = Math.floor(scaleh * 100 ) / 100
document.querySelector("#gamediv").style.transform = `scale(${scalew}, ${scaleh})`;



//create the canvas on the #gamediv div
document.querySelector("#gamediv").appendChild(app.view);

//loader
const loader = PIXI.Loader.shared;

loader.add('background', '../images/sprites/background.png');
loader.add('sky', '../images/sprites/sky.png');
loader.add('tree', '../images/sprites/tree.png');
loader.add('ground', '../images/sprites/ground.png');
loader.add('player', '../images/sprites/player.png');

loader.add('tray', "../images/musicPlayer/tray.png");
loader.add('next', "../images/musicPlayer/next.png");
loader.add('prev', "../images/musicPlayer/prev.png");
loader.add('nextClicked', "../images/musicPlayer/nextClicked.png");
loader.add('prevClicked', "../images/musicPlayer/prevClicked.png");
loader.add('play', "../images/musicPlayer/play.png");
loader.add('disk', "../images/musicPlayer/disk.png");

loader.load((loader) => {
    // adding the sprites picked from the loader
    sprites.background = PIXI.Sprite.from(loader.resources.background.texture)
    sprites.tree = PIXI.Sprite.from(loader.resources.tree.texture);
    sprites.ground = PIXI.Sprite.from(loader.resources.ground.texture);
    sprites.sky = PIXI.Sprite.from(loader.resources.sky.texture);
    sprites.player = PIXI.Sprite.from(loader.resources.player.texture);
    // mplayer
    sprites.tray = PIXI.Sprite.from(loader.resources.tray.texture);
    sprites.next = PIXI.Sprite.from(loader.resources.next.texture);
    sprites.prev = PIXI.Sprite.from(loader.resources.prev.texture);
    sprites.play = PIXI.Sprite.from(loader.resources.play.texture);
    sprites.disk = PIXI.Sprite.from(loader.resources.disk.texture);
});

loader.onComplete.add(loaded);

function loaded() {
    console.log('[app] => Loaded');
    scenary.filters = [time];
    app.stage.addChild(scenary);
    app.stage.addChild(mPlayer);
    createPlayer();
    createScenary();
    createMPlayer();
    app.ticker.add(gameLoop);
    app.ticker.maxFPS = 30
}
function createScenary() {
    //sky set
    sprites.sky.width = w;
    sprites.sky.height = h;
    scenary.addChild(sprites.sky);
    
    // backgorund set
    sprites.background.width = w;
    sprites.background.height = h;
    scenary.addChild(sprites.background);
    
    //tree set
    sprites.tree.width = w;
    sprites.tree.height = h;
    scenary.addChild(sprites.tree);
    
    //ground set
    sprites.ground.width = w;
    sprites.ground.height = h;
    scenary.addChild(sprites.ground);
}
function createPlayer() {
    // player set
    sprites.player.x = 30;
    sprites.player.y =  236;
    sprites.player.width = 50;
    sprites.player.height = 35;
    app.stage.addChild(sprites.player);
}
function createMPlayer() {

    mPlayer.x = 420
    mPlayer.y = 20

    mPlayer.addChild(sprites.tray);
    sprites.tray.width = 50;
    sprites.tray.height = 20;
    
    //next
    mPlayer.addChild(sprites.next);
    sprites.next.width = 9;
    sprites.next.height = 10;
    sprites.next.interactive = true;
    sprites.next.buttonMode = true;
    sprites.next.on('pointerdown', nextTrack);
    
    //prev
    mPlayer.addChild(sprites.prev);
    sprites.prev.width = 9;
    sprites.prev.height = 10;
    sprites.prev.interactive = true;
    sprites.prev.buttonMode = true;
    sprites.prev.on('pointerdown', backTrack)
    
    //play / pause
    mPlayer.addChild(sprites.play);
    sprites.play.width = 14;
    sprites.play.height = 14;
    sprites.play.interactive = true;
    sprites.play.buttonMode = true;
    sprites.play.on('pointerdown', demute);
    
    mPlayer.addChild(sprites.disk);
    sprites.disk.width = 24;
    sprites.disk.height = 24;
    sprites.disk.anchor.set(0.5);
    sprites.disk.interactive = true;
    sprites.disk.buttonMode = true;
    sprites.disk.on('pointerdown', redirect);

    sprites.tray.x = 0
    sprites.tray.y = 0
    
    sprites.prev.x = 5;
    sprites.prev.y = 5;

    sprites.play.x = 15;
    sprites.play.y = 3;

    sprites.next.x = 30;
    sprites.next.y = 5;

    sprites.disk.x = 53;
    sprites.disk.y = 10;
}

let wind = new Howl ({
    src:['../sounds/windo.mp3'],
    autoplay: true,
    volume: 0,
    loop:true
})

let tracks = [
    new Howl({
        src: ['../sounds/music/Andr3w-Planet-140-BPM.mp3'],
        volume: 0.4,
        loop: true
        /* skip the song when it is over
        onend: () => {
            nextTrack()
        } */
    }),
    new Howl({
        src: ['../sounds/music/Andr3w-Cloud-140-BPM.mp3',],
        volume: 0.4,
        loop: true
        /* onend: () => {
            nextTrack()
        } */
    }),
    new Howl({
        src: ['../sounds/music/Andr3w-Fun-147-BPM.mp3'],
        volume: 0.4,
        loop: true
        /* onend: () => {
            nextTrack()
        } */
    }),
    new Howl({
        src: ['../sounds/music/Andr3w-Chill-140-BPM.mp3'],
        volume: 0.4,
        loop: true
        /* onend: () => {
            nextTrack()
        } */
    })
];

let trackNum = 0;
let trackMax = tracks.length - 1;   
let paused = false;
tracks[trackNum].play();

// mPlayer commands
function nextTrack() {
    console.log('[music] => Next track');
    if (trackNum == trackMax) {
        tracks[trackMax].stop();
        trackNum = 0;
        tracks[trackNum].play();
        console.log(trackNum);
        rotation = 0.05;

    } else {
        tracks[trackNum].stop();
        trackNum++;
        tracks[trackNum].play();
        console.log(trackNum);
        rotation = 0.05;
    }
}

function backTrack() {
    console.log('[music] => Back track');
    if (trackNum == 0) {
        tracks[trackNum].stop();
        trackNum = trackMax;
        tracks[trackNum].play();
        rotation = 0.05;
    } else {
        tracks[trackNum].stop();
        trackNum--;
        tracks[trackNum].play();
        rotation = 0.05;
    }
}

function demute() {
    let saveseek;
    if (tracks[trackNum].playing()){
        paused = true;
        tracks[trackNum].pause();
        rotation = 0;
        saveseek = tracks[trackNum].seek();
        console.log('[music] => Paused');
    } else if (paused == true) {
        tracks[trackNum].play();
        tracks[trackNum].seek(saveseek);
        rotation = 0.05;
        console.log('[music] => Unpaused');
    }
}

function redirect() {
    console.log('redirect');
    window.open("https://soundcloud.com/user-102055220");
}

// lsiteners and movement
let keys = {};
window.addEventListener("keydown", (e) => { keys[e.key] = true });
window.addEventListener("keyup", (e) => { keys[e.key] = false});

let grv = 2;
let groundHeight = 236; 
let bboxRight = w - 11;
let bboxLeft = 0;
let vsp = 0;
let hsp = 5;
let acl = 0.2;

function gameLoop() {
    sprites.disk.rotation += rotation;

    function onGround() {
        if(sprites.player.y <= groundHeight) {
            return false;
        } else {
            return true;
        }
    }

    // a (left -1)
    if (keys["a"] == true ) {
        if (hsp <= -7) {
            hsp = -7
        } else { 
            hsp -= acl;
        }
    } else if (keys["d"] == true) {
        if (hsp >= 7) {
            hsp = 7
        } else { 
            hsp += acl;
        }
    } else {
        hsp = 0
    }

    // gravity
    if (!onGround() ) {  
        vsp += grv; 
    } else {
        vsp = 0
    }
    //jump
    if (keys[" "] == true && onGround()) {
        vsp -= 10
    }
    //test colision right and left
    if ((sprites.player.x + hsp) >= bboxRight) {
        hsp = 0
    }
    if ((sprites.player.x + hsp) <= bboxLeft) {
        hsp = 0
    }

    sprites.player.y += vsp;
    sprites.player.x += hsp;
}