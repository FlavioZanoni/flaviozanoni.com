//imports the noise filter
import time from '../js/shader.js';

// select the scale mode to nearest bc the game is in pixelart
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
 
//global declarations
let w = 1024;
let h = 576;
let windoww = window.innerWidth;
let windowh = (window.innerHeight - 15);
let rotation = 0.05;
let outRoom = true;
//sprites container
let sprites = [];
let playerSheet = [];
let fade = [];
// containers
let startGame = new PIXI.Container();
let scenary = new PIXI.Container();
let inside = new PIXI.Container();
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

loader.add('outside', "../images/sprites/full.png");
loader.add('player', '../images/sprites/player.png');
loader.add('presse', '../images/sprites/presse.png');
loader.add('inside', "../images/sprites/inside.png");

loader.add('tray', "../images/musicPlayer/tray.png");
loader.add('next', "../images/musicPlayer/next.png");
loader.add('prev', "../images/musicPlayer/prev.png");
loader.add('nextClicked', "../images/musicPlayer/nextClicked.png");
loader.add('prevClicked', "../images/musicPlayer/prevClicked.png");
loader.add('play', "../images/musicPlayer/play.png");
loader.add('disk', "../images/musicPlayer/disk.png");

loader.load(loaded);

function loaded() {
    console.log('[app] => Loaded');
    scenary.filters = [time];
    app.stage.addChild(scenary);
    app.stage.addChild(mPlayer);
    createPlayerSheet();
    createFade();
    createPlayer();
    createScenary();
    createMPlayer();
    app.ticker.add(gameLoop);
    app.ticker.maxFPS = 30;
}
function createScenary() {
    sprites.outside = PIXI.Sprite.from(loader.resources.outside.texture);
    sprites.presse = PIXI.Sprite.from(loader.resources.presse.texture);
    
    sprites.outside.width = w;
    sprites.outside.height = h;
    scenary.addChild(sprites.outside);

    // press E set
    sprites.presse.x = 190;
    sprites.presse.y = 470;
    sprites.presse.height *= 2;
    sprites.presse.width *= 2;   
}
function createInside() {  
    sprites.inside = PIXI.Sprite.from(loader.resources.inside.texture); 
    sprites.inside.width = w;
    sprites.inside.height = h;
    inside.addChild(sprites.inside);
    app.stage.addChild(inside);
}
function createMPlayer() {
    sprites.tray = PIXI.Sprite.from(loader.resources.tray.texture);
    sprites.next = PIXI.Sprite.from(loader.resources.next.texture);
    sprites.prev = PIXI.Sprite.from(loader.resources.prev.texture);
    sprites.play = PIXI.Sprite.from(loader.resources.play.texture);
    sprites.disk = PIXI.Sprite.from(loader.resources.disk.texture);

    mPlayer.x = 840;
    mPlayer.y = 40;

    mPlayer.addChild(sprites.tray);
    sprites.tray.width = 100;
    sprites.tray.height = 40;
    
    //next
    mPlayer.addChild(sprites.next);
    sprites.next.width = 18;
    sprites.next.height = 20;
    sprites.next.interactive = true;
    sprites.next.buttonMode = true;
    sprites.next.on('pointerdown', nextTrack);
    
    //prev
    mPlayer.addChild(sprites.prev);
    sprites.prev.width = 18;
    sprites.prev.height = 20;
    sprites.prev.interactive = true;
    sprites.prev.buttonMode = true;
    sprites.prev.on('pointerdown', backTrack)
    
    //play / pause
    mPlayer.addChild(sprites.play);
    sprites.play.width = 28;
    sprites.play.height = 28;
    sprites.play.interactive = true;
    sprites.play.buttonMode = true;
    sprites.play.on('pointerdown', demute);
    
    mPlayer.addChild(sprites.disk);
    sprites.disk.width = 48;
    sprites.disk.height = 48;
    sprites.disk.anchor.set(0.5);
    sprites.disk.interactive = true;
    sprites.disk.buttonMode = true;
    sprites.disk.on('pointerdown', redirect);

    sprites.tray.x = 0;
    sprites.tray.y = 0;
    
    sprites.prev.x = 10;
    sprites.prev.y = 10;

    sprites.play.x = 30;
    sprites.play.y = 6;

    sprites.next.x = 60;
    sprites.next.y = 10;

    sprites.disk.x = 106;
    sprites.disk.y = 20;
}
function createPlayer() {
    // player set
    sprites.player = new PIXI.AnimatedSprite(playerSheet.idleRight);
    sprites.player.x = 850;
    sprites.player.y =  472;
    sprites.player.width = 100;
    sprites.player.height = 70;
    sprites.player.loop = false;
    sprites.player.animationSpeed = 0.2;
    app.stage.addChild(sprites.player);
    sprites.player.play();
}

function createFade() {
    let sheet = PIXI.BaseTexture.from('../images/sprites/fade.png');
    let w = 512;
    let h = 288;

    fade["fadeIn"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h))
    ]
    fade["fadeOut"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h))
    ]

    sprites.fade = new PIXI.AnimatedSprite(fade.fadeIn);
    sprites.fade.width = w;
    sprites.fade.height = h;
    sprites.fade.loop = false;
    sprites.fade.animationSpeed = 0.02;

}

function createPlayerSheet() {
    let sheet = PIXI.BaseTexture.from('../images/sprites/player.png');
    let w = 52;
    let h = 37;
    
    playerSheet["idleRight"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h))
    ]

    playerSheet["idleLeft"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(10 * w, 0, w, h))
    ]

    playerSheet["walkRight"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
    ]

    playerSheet["walkLeft"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h))
    ]

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

function changeStage() {
    console.log("changing Room");
    outRoom = false;
    // change de move type
    // key animation
    // fade the room
    sprites.fade = new PIXI.AnimatedSprite(fade.fadeOut);
    sprites.fade.width = w;
    sprites.fade.height = h;
    sprites.fade.loop = false;
    sprites.fade.animationSpeed = 0.151;
    scenary.addChild(sprites.fade);
    sprites.fade.play();
    sprites.fade.onComplete = function changeScenary() {
        createInside();
        scenary.visible = false;
        sprites.fade = new PIXI.AnimatedSprite(fade.fadeIn);
        sprites.fade.width = w;
        sprites.fade.height = h;
        sprites.fade.loop = false;
        sprites.fade.animationSpeed = 0.151;
        inside.addChild(sprites.fade);
        sprites.fade.play();
    }
}

// lsiteners and movement
let keys = {};
window.addEventListener("keydown", (e) => { keys[e.key] = true });
window.addEventListener("keyup", (e) => { keys[e.key] = false});

let grv = 2;
let groundHeight = 472; 
let bboxRight = w - 11;
let bboxLeft = 0;
let bboxRightRoom = 382;
let bboxLeftRoom = 130;
let bboxDownRoom  = 254;
let bboxUpRoom = 61;
let vsp = 0;
let hsp = 0;
let lastKey;

function gameLoop() {
    sprites.disk.rotation += rotation;

    if (outRoom == true) {
        // press E message
        if (sprites.player.x > 100 && sprites.player.x < 240) {
            console.log("press E");
            scenary.addChild(sprites.presse);
            if ( keys["e"] == true || keys["E"] == true) {
                changeStage();
                keys["e"] == false;
            }
        } else {
            scenary.removeChild(sprites.presse);
        }

        function onGround() {
            if(sprites.player.y <= groundHeight) {
                return false;
            } else {
                return true;
            }
        }

        // a (left -1)
        if (keys["a"] == true ||  keys["A"] == true) {
            if (!sprites.player.playing) {
                sprites.player.textures = playerSheet.walkLeft;
                sprites.player.play();
            } 
            hsp = -6;
            lastKey = "left"
        } else if (keys["d"] == true ||  keys["D"] == true) {
            if (!sprites.player.playing) {
                sprites.player.textures = playerSheet.walkRight;
                sprites.player.play();
            }
            hsp = 6;
            lastKey = "right";
        } else {
            if (lastKey == "right") {
                sprites.player.textures = playerSheet.idleRight;
                sprites.player.play();
            } else {
                sprites.player.textures = playerSheet.idleLeft;
                sprites.player.play();
            }
            hsp = 0;
        }
        // gravity 
        if (!onGround() ) {  
            vsp += grv; 
        } else {
            vsp = 0;
        }
        //jump
        if (keys[" "] == true && onGround()) {
            vsp -= 12;
        }
        //test colision right and left
        if ((sprites.player.x + hsp) >= bboxRight) {
            hsp = 0;
        }
        if ((sprites.player.x + hsp) <= bboxLeft) {
            hsp = 0;
        }

        sprites.player.y += vsp;
        sprites.player.x += hsp;
    } else {
        if (keys["a"] == true) {
            hsp = -3;
        }
        if (keys["w"] == true) {
            vsp = -3;
        }
        if (keys["s"] == true) {
            vsp = 3;
        }
        if (keys["d"] == true) {
            hsp = 3;
        }

        // collision
        if ((sprites.player.x + hsp) >= bboxRightRoom) {
            hsp = 0;
        }
        if ((sprites.player.x + hsp) <= bboxLeftRoom) {
            hsp = 0;
        }
        if ((sprites.player.y + vsp) >= bboxUpRoom) {
            vsp = 0;
        }
        if ((sprites.player.y + vsp) <= bboxDownRoom) {
            vsp = 0;
        }

        sprites.player.y += vsp;
        sprites.player.x += hsp;
    }
}