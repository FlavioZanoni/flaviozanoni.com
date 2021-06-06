//imports the noise filter
import time from '../js/shader.js';

// select the scale mode to nearest bc the game is in pixelart
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
 
//global declarations
let w = 1024;
let h = 576;
let windoww = window.innerWidth;
let windowh = (window.innerHeight - 15);
let paused = false;
let rotation = 0.05;
let outRoom = true;
//sprites container
let sprites = [];
let mplayerSheet = [];
let playerSheet = [];
let playerInsideSheet = [];
let chestSheet = [];
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
loader.add('floor', "../images/sprites/floor.png");
loader.add('walls', "../images/sprites/walls.png");
loader.add('chest', "../images/sprites/bau.png");
loader.add('buttons', "../images/sprites/buttons.png");
loader.add('tray', "../images/musicPlayer/tray.png");
loader.add('disk', "../images/musicPlayer/disk.png");

loader.load(loaded);

function loaded() {
    console.log('[app] => Loaded');
    scenary.filters = [time];
    app.stage.addChild(scenary);
    app.stage.addChild(inside);
    app.stage.addChild(mPlayer);
    createMplayerSheet()
    createFade();
    createPlayerInsideSheet()
    createPlayerInside();
    createPlayerSheet();
    createChestSheet();
    createChest();
    createChestTwo();
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
    sprites.floor = PIXI.Sprite.from(loader.resources.floor.texture); 
    sprites.floor.width = w;
    sprites.floor.height = h;
    sprites.walls = PIXI.Sprite.from(loader.resources.walls.texture); 
    sprites.walls.width = w;
    sprites.walls.height = h;
    inside.addChild(sprites.floor);
}
function createMPlayer() {
    mPlayer.x = 840;
    mPlayer.y = 40;

    sprites.tray = PIXI.Sprite.from(loader.resources.tray.texture);
    sprites.disk = PIXI.Sprite.from(loader.resources.disk.texture);
    sprites.next = new PIXI.AnimatedSprite(mplayerSheet.next);
    sprites.prev = new PIXI.AnimatedSprite(mplayerSheet.prev);
    sprites.play = new PIXI.AnimatedSprite(mplayerSheet.play);

    mPlayer.addChild(sprites.tray);
    sprites.tray.width = 100;
    sprites.tray.height = 40;
    sprites.tray.x = 0;
    sprites.tray.y = 0;
    //next
    mPlayer.addChild(sprites.next);
    sprites.next.width = 18;
    sprites.next.height = 20;
    sprites.next.x = 60;
    sprites.next.y = 10;
    sprites.next.interactive = true;
    sprites.next.buttonMode = true;
    sprites.next.on('pointerdown', () => {
        sprites.next.textures = mplayerSheet.nextClicked;
        nextTrack();
    });
    sprites.next.on('pointerup', () => { sprites.next.textures = mplayerSheet.next; });
    
    //prev
    mPlayer.addChild(sprites.prev);
    sprites.prev.width = 18;
    sprites.prev.height = 20;
    sprites.prev.x = 10;
    sprites.prev.y = 10;
    sprites.prev.interactive = true;
    sprites.prev.buttonMode = true;
    sprites.prev.on('pointerdown', () => {
        sprites.prev.textures = mplayerSheet.prevClicked;
        backTrack();
    })
    sprites.prev.on('pointerup', () => { sprites.prev.textures = mplayerSheet.prev; });
    
    //play / pause
    mPlayer.addChild(sprites.play);
    sprites.play.width = 28;
    sprites.play.height = 28;
    sprites.play.x = 30;
    sprites.play.y = 6;
    sprites.play.interactive = true;
    sprites.play.buttonMode = true;
    sprites.play.on('pointerdown', () => {
        sprites.play.textures = mplayerSheet.pausedClicked;
        demute();
    });
    sprites.play.on('pointerup', () => { 
        if (!paused) {
            sprites.play.textures = mplayerSheet.paused; 
        } else {
            sprites.play.textures = mplayerSheet.play;
        }
    });
    
    mPlayer.addChild(sprites.disk);
    sprites.disk.width = 48;
    sprites.disk.height = 48;
    sprites.disk.x = 106;
    sprites.disk.y = 20;
    sprites.disk.anchor.set(0.5);
    sprites.disk.interactive = true;
    sprites.disk.buttonMode = true;
    sprites.disk.on('pointerdown', redirect);
}
function createPlayer() {
    // player set
    sprites.player.textures = playerSheet.idleRight;
    sprites.player.x = 200;
    sprites.player.y =  472;
    sprites.player.width = 100;
    sprites.player.height = 70;
    app.stage.addChild(sprites.player);
    sprites.player.play();
}
function createPlayerInside() {
    sprites.playerInside = new PIXI.AnimatedSprite(playerInsideSheet.idleSouth);
    sprites.playerInside.x = 500;
    sprites.playerInside.y =  400;
    sprites.playerInside.width = 34;
    sprites.playerInside.height = 76;
    sprites.playerInside.loop = false;
    sprites.playerInside.animationSpeed = 0.15;
    sprites.playerInside.play();
}
function createChest() {
    sprites.chest.textures = chestSheet.closed;
    sprites.chest.x = 400;
    sprites.chest.y = 150;
    sprites.chest.width = 84;
    sprites.chest.height = 58;
    sprites.chest.play();
}
function createChestTwo() {
    sprites.chestTwo.textures = chestSheet.closed;
    sprites.chestTwo.x = 550;
    sprites.chestTwo.y = 150;
    sprites.chestTwo.width = 84;
    sprites.chestTwo.height = 58;
    sprites.chestTwo.play();
}
function createFade() {
    let sheet = PIXI.BaseTexture.from('../images/sprites/fade.png');
    let w = 512;
    let h = 288;

    fade["fadeIn"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( 5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 0, 0, w, h))
    ]
    fade["fadeOut"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( 0 , 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 4 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 5 * w, 0, w, h))
    ]
    sprites.fade = new PIXI.AnimatedSprite(fade.fadeIn);
    sprites.fade.loop = false;
    sprites.fade.animationSpeed = 0.151;
}
function createPlayerSheet() {
    let sheet = PIXI.BaseTexture.from('../images/sprites/player.png');
    let w = 52;
    let h = 37;
    
    playerSheet["idleRight"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(w , 0, w, h))
    ]

    playerSheet["idleLeft"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h))
    ]

    playerSheet["walkRight"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
    ]

    playerSheet["walkLeft"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h))
    ]
    sprites.player = new PIXI.AnimatedSprite(playerSheet.idleRight);
    sprites.player.loop = false;
    sprites.player.animationSpeed = 0.15;
}
function createPlayerInsideSheet() {
    let sheet = PIXI.BaseTexture.from('../images/sprites/gba.png');
    let w = 17
    let h = 38

    playerInsideSheet["idleSouth"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 0, w, h))
    ]

}
function createMplayerSheet() {
    let sheet = PIXI.BaseTexture.from('../images/sprites/buttons.png');
    let w = 14;
    let h = 14;

    mplayerSheet["next"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( w, 0, w - 4, h - 4))
    ]

    mplayerSheet["nextClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 0, w - 4, h - 4))
    ]

    mplayerSheet["prev"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w - 4, h - 4))
    ]

    mplayerSheet["prevClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w - 4, h - 4))
    ]

    mplayerSheet["play"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h))
    ]

    mplayerSheet["playClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h))
    ]

    mplayerSheet["paused"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h))
    ]

    mplayerSheet["pausedClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h))
    ]
}
function createChestSheet() {
    let sheet = PIXI.BaseTexture.from('../images/sprites/bau.png');
    let w = 42;
    let h = 29;

    chestSheet["closed"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( 0, 0, w, h))
    ] 

    chestSheet["open"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( 3 * w, 0, w, h ))
    ] 

    chestSheet["opening"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( 1 * w, 0, w, h )),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 2 * w, 0, w, h)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 3 * w, 0, w, h))
    ] 

    sprites.chest = new PIXI.AnimatedSprite(chestSheet.closed);
    sprites.chest.loop = false;
    sprites.chest.animationSpeed = 0.2;

    sprites.chestTwo = new PIXI.AnimatedSprite(chestSheet.closed);
    sprites.chestTwo.loop = false;
    sprites.chestTwo.animationSpeed = 0.2;
}

let wind = new Howl ({
    src:['../sounds/windo.mp3'],
    autoplay: true,
    volume: 0,
    loop:true   
})
let chesto = new Howl ({
    src:['../sounds/bau.mp3'],
    volume: 0.9
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
//tracks[trackNum].play();

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
        paused == false;
        tracks[trackNum].play();
        tracks[trackNum].seek(saveseek);
        rotation = 0.05;
        console.log('[music] => Unpaused');
        sprites.play.textures = mplayerSheet.playClicked;
    }
}
function redirect() {
    console.log('redirect');
    window.open("https://soundcloud.com/user-102055220");
}
function changeStage() {
    console.log("changing Room");
    outRoom = false;
    // run keyhole animation
    //sprites.keyhole.onComplete = () => {
        //remove the player for now
        app.stage.removeChild(sprites.player);
        
        sprites.fade.textures = fade.fadeOut;
        sprites.fade.width = w;
        sprites.fade.height = h;
        scenary.addChild(sprites.fade);
        sprites.fade.play();
        sprites.fade.onComplete = () => { 
            createInside();
            scenary.visible = false;
            sprites.fade.textures = fade.fadeIn;
            sprites.fade.width = w;
            sprites.fade.height = h;
            inside.addChild(sprites.chest);
            inside.addChild(sprites.chestTwo)
            inside.addChild(sprites.playerInside);
            inside.addChild(sprites.walls);
            inside.addChild(sprites.fade);
            sprites.fade.play();
            sprites.fade.onComplete = () => {sprites.fade.visible = false}
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
let bboxRightRoom = 745;
let bboxLeftRoom = 235;
let bboxDownRoom  = 450;
let bboxUpRoom = 70;
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
            lastKey = "left";
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
            hsp = -6;
        } else if (keys["d"] == true) {
            hsp = 6;
        } else {
            hsp = 0;
        }
        if (keys["w"] == true) {
            vsp = -6;
        } else if (keys["s"] == true) {
            vsp = 6;
        } else {
            vsp = 0;
        }
        // collision
        if ((sprites.playerInside.x + hsp) >= bboxRightRoom) {
            hsp = 0;
        }
        if ((sprites.playerInside.x + hsp) <= bboxLeftRoom) {
            hsp = 0;
        }
        if ((sprites.playerInside.y + vsp) <= bboxUpRoom) {
            vsp = 0;
        }
        if ((sprites.playerInside.y + vsp) >= bboxDownRoom) {
            vsp = 0;
        }
        //colision y, chest1
        if ((sprites.playerInside.x >= 370) && (sprites.playerInside.x <= 480)) {
            if(keys["e"] == true) {
                sprites.chest.textures = chestSheet.opening;
                sprites.chest.play();
                chesto.play();
                sprites.chest.onComplete = () => {
                    //open
                }
            }
            if ((sprites.playerInside.y + vsp) <= 150 && (sprites.playerInside.y + vsp) >= 88) {
                vsp = 0;
            }
        }
        //colision y, chest2
        if ((sprites.playerInside.x >= 520) && (sprites.playerInside.x <= 630)) {
            if(keys["e"] == true) {
                sprites.chestTwo.textures = chestSheet.opening;
                sprites.chestTwo.play();
                chesto.play();
                sprites.chestTwo.onComplete = () => {
                    //open
                }
            }
            if ((sprites.playerInside.y + vsp) <= 150 && (sprites.playerInside.y + vsp) >= 88) {
                vsp = 0;
            }
        }
        //colision x, chest1
        if ((sprites.playerInside.y <= 150) && (sprites.playerInside.y >= 88)) {
            if ((sprites.playerInside.x + hsp) >= 370 && (sprites.playerInside.x + hsp) <= 480) {
                hsp = 0;
            }
        }
        //colision x, chest2
        if ((sprites.playerInside.y <= 150) && (sprites.playerInside.y >= 88)) {
            if ((sprites.playerInside.x + hsp) >= 520 && (sprites.playerInside.x + hsp) <= 630) {
                hsp = 0;
            }
        }
        sprites.playerInside.y += vsp;
        sprites.playerInside.x += hsp;
    }
}