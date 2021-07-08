//imports
import time from '../js/shader.js';
import { spritesheet, createSpriteSheet } from '../js/sprites.js';

// select the scale mode to nearest bc the game is in pixelart
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

//global declarations
let w = 1024;
let h = 576;
let windoww = window.innerWidth;
let windowh = (window.innerHeight - 15);
let groundHeight = 513;
let paused = false;
let outRoom = true;
let lan = null
//sprites container
let sprites = [];
// containers
let gameScreen = new PIXI.Container();
let scenary = new PIXI.Container();
let inside = new PIXI.Container();
let mPlayer = new PIXI.Container();
let msg = new PIXI.Container();

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

loader.load(loaded);

function loaded() {
    console.log('[app] => Loaded');
    if (window.location.href == "https://www.flaviozanoni.com/pt/index.html" || window.location.href == "http://localhost:5500/pt/index.html") {
        console.log("pt")
        lan = "pt"
    } else {
        lan = "en"
    }
    createSpriteSheet();
    createGameScreen();
    createFade();
    createPlayerInside();
    createChest();
    createPlayer();
    createScenary();
    createMPlayer();
}
function createGameScreen() {
    sprites.outside = new PIXI.AnimatedSprite(spritesheet.scenary);
    //checks language
    if (lan == "pt") {
        sprites.playGame = new PIXI.AnimatedSprite(spritesheet.gameScreen.pt.play);
        sprites.projects = new PIXI.AnimatedSprite(spritesheet.gameScreen.pt.projects);
        sprites.resume = new PIXI.AnimatedSprite(spritesheet.gameScreen.pt.resume);
    } else {
        sprites.playGame = new PIXI.AnimatedSprite(spritesheet.gameScreen.en.play);
        sprites.projects = new PIXI.AnimatedSprite(spritesheet.gameScreen.en.projects);
        sprites.resume = new PIXI.AnimatedSprite(spritesheet.gameScreen.en.resume);
    }
    app.stage.addChild(gameScreen);
    sprites.background = new PIXI.AnimatedSprite(spritesheet.gameScreen.background);
    sprites.background.width = w;
    sprites.background.height = h;
    gameScreen.addChild(sprites.background);

    sprites.playGame.x = 420;
    sprites.playGame.y = 140;
    sprites.playGame.width *= 2;
    sprites.playGame.height *= 2;
    sprites.playGame.interactive = true;
    sprites.playGame.buttonMode = true;
    sprites.playGame.on("pointerdown", () => {
        if (lan == "pt") {
            sprites.playGame.textures = spritesheet.gameScreen.pt.playClicked;
        } else {
            sprites.playGame.textures = spritesheet.gameScreen.en.playClicked;
        }
    });
    sprites.playGame.on("pointerup", () => {
        if (lan == "pt") {
            sprites.playGame.textures = spritesheet.gameScreen.pt.play;
        } else {
            sprites.playGame.textures = spritesheet.gameScreen.en.play;
        }
        createGame();
        app.stage.removeChild(gameScreen);
    });

    gameScreen.addChild(sprites.playGame);

    sprites.projects.x = 400;
    sprites.projects.y = 215;
    sprites.projects.width *= 2;
    sprites.projects.height *= 2;
    sprites.projects.interactive = true;
    sprites.projects.buttonMode = true;
    sprites.projects.on("pointerdown", () => {
        if (lan == "pt") {
            sprites.projects.textures = spritesheet.gameScreen.pt.projectsClicked;
        } else {
            sprites.projects.textures = spritesheet.gameScreen.en.projectsClicked;
        }
    });
    sprites.projects.on("pointerup", () => {
        if (lan == "pt") {
            sprites.projects.textures = spritesheet.gameScreen.pt.projects;
            window.location.href = "https://flaviozanoni.com/pt/projetos.html";
        } else {
            sprites.projects.textures = spritesheet.gameScreen.en.projects;
            window.location.href = "https://flaviozanoni.com/en/projects.html";
        }
    })

    gameScreen.addChild(sprites.projects);

    sprites.resume.x = 410;
    sprites.resume.y = 310;
    sprites.resume.width *= 2;
    sprites.resume.height *= 2;
    sprites.resume.interactive = true;
    sprites.resume.buttonMode = true;
    sprites.resume.on("pointerdown", () => {
        if (lan == "pt") {
            sprites.resume.textures = spritesheet.gameScreen.pt.resumeClicked;
        } else {
            sprites.resume.textures = spritesheet.gameScreen.en.resumeClicked;
        }
    });
    sprites.resume.on("pointerup", () => {
        if (lan == "pt") {
            sprites.resume.textures = spritesheet.gameScreen.pt.resume;
            window.location.href = "https://flaviozanoni.com/pt/resumo.html";
        } else {
            sprites.resume.textures = spritesheet.gameScreen.en.resume;
            window.location.href = "https://flaviozanoni.com/en/resume.html";
        }
    })
    gameScreen.addChild(sprites.resume);

    sprites.github = new PIXI.AnimatedSprite(spritesheet.gameScreen.github);
    sprites.github.x = 360;
    sprites.github.y = 395;
    sprites.github.width *= 2;
    sprites.github.height *= 2;
    sprites.github.interactive = true;
    sprites.github.buttonMode = true;
    sprites.github.on("pointerdown", () => {
        sprites.github.textures = spritesheet.gameScreen.githubClicked;
    });
    sprites.github.on("pointerup", () => {
        sprites.github.textures = spritesheet.gameScreen.github;
        window.location.href = "https://github.com/FlavioZanoni";
    })
    gameScreen.addChild(sprites.github);

    sprites.linkedin = new PIXI.AnimatedSprite(spritesheet.gameScreen.linkedin);
    sprites.linkedin.x = 545;
    sprites.linkedin.y = 400;
    sprites.linkedin.width *= 2;
    sprites.linkedin.height *= 2;
    sprites.linkedin.interactive = true;
    sprites.linkedin.buttonMode = true;
    sprites.linkedin.on("pointerdown", () => {
        sprites.linkedin.textures = spritesheet.gameScreen.linkedinClicked;
    });
    sprites.linkedin.on("pointerup", () => {
        sprites.linkedin.textures = spritesheet.gameScreen.linkedin;
        if (lan = "pt") {
            window.location.href = "https://www.linkedin.com/in/flávio-zanoni-658307202/?locale=pt_BR";
        } else {
            window.location.href = "https://www.linkedin.com/in/flávio-zanoni-658307202/?locale=en_US"
        }
    })
    gameScreen.addChild(sprites.linkedin);
    app.stage.addChild(mPlayer);
}
function createGame() {
    scenary.filters = [time];
    app.stage.addChild(scenary);
    app.stage.addChild(inside);
    app.ticker.add(gameLoop);
    app.ticker.maxFPS = 30;
    app.stage.addChild(sprites.player);
    app.stage.addChild(mPlayer);
}
function createScenary() {
    sprites.outside = new PIXI.AnimatedSprite(spritesheet.scenary);
    if (lan == "pt") {
        sprites.presse = new PIXI.AnimatedSprite(spritesheet.misc.presse);
    } else {
        sprites.presse = new PIXI.AnimatedSprite(spritesheet.misc.presseEN);
    }

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
    sprites.floor = new PIXI.AnimatedSprite(spritesheet.inside.floor);
    sprites.floor.width = w;
    sprites.floor.height = h;
    sprites.walls = new PIXI.AnimatedSprite(spritesheet.inside.walls);
    sprites.walls.width = w;
    sprites.walls.height = h;
    inside.addChild(sprites.floor);
    inside.addChild(sprites.chest);
    inside.addChild(sprites.playerInside);
    inside.addChild(sprites.walls);
    inside.addChild(sprites.fade);
}
function createMPlayer() {
    mPlayer.x = 840;
    mPlayer.y = 40;

    sprites.disk = new PIXI.AnimatedSprite(spritesheet.mplayerSheet.disk);
    sprites.tray = new PIXI.AnimatedSprite(spritesheet.mplayerSheet.tray);
    sprites.next = new PIXI.AnimatedSprite(spritesheet.mplayerSheet.next);
    sprites.prev = new PIXI.AnimatedSprite(spritesheet.mplayerSheet.prev);
    sprites.play = new PIXI.AnimatedSprite(spritesheet.mplayerSheet.play);

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
        sprites.next.textures = spritesheet.mplayerSheet.nextClicked;
        nextTrack();
    });
    sprites.next.on('pointerup', () => { sprites.next.textures = spritesheet.mplayerSheet.next; });

    //prev
    mPlayer.addChild(sprites.prev);
    sprites.prev.width = 18;
    sprites.prev.height = 20;
    sprites.prev.x = 10;
    sprites.prev.y = 10;
    sprites.prev.interactive = true;
    sprites.prev.buttonMode = true;
    sprites.prev.on('pointerdown', () => {
        sprites.prev.textures = spritesheet.mplayerSheet.prevClicked;
        backTrack();
    })
    sprites.prev.on('pointerup', () => { sprites.prev.textures = spritesheet.mplayerSheet.prev; });

    //play / pause
    mPlayer.addChild(sprites.play);
    sprites.play.width = 28;
    sprites.play.height = 28;
    sprites.play.x = 30;
    sprites.play.y = 6;
    sprites.play.interactive = true;
    sprites.play.buttonMode = true;
    sprites.play.on('pointerdown', () => {
        sprites.play.textures = spritesheet.mplayerSheet.pausedClicked;
        demute();
    });
    sprites.play.on('pointerup', () => {
        if (paused) {
            sprites.play.textures = spritesheet.mplayerSheet.paused;
        } else {
            sprites.play.textures = spritesheet.mplayerSheet.play;
        }
    });

    mPlayer.addChild(sprites.disk);
    sprites.disk.width = 48;
    sprites.disk.height = 48;
    sprites.disk.animationSpeed = 0.1;
    sprites.disk.x = 106;
    sprites.disk.y = 20;
    sprites.disk.anchor.set(0.5);
    sprites.disk.interactive = true;
    sprites.disk.buttonMode = true;
    sprites.disk.on('pointerdown', () => {
        console.log('redirect');
        window.open("https://soundcloud.com/user-102055220");
    });
    sprites.disk.play();
}
function createPlayer() {
    // player set
    sprites.player = new PIXI.AnimatedSprite(spritesheet.playerSheet.idleRight);
    sprites.player.loop = false;
    sprites.player.animationSpeed = 0.15;
    sprites.player.textures = spritesheet.playerSheet.idleRight;
    sprites.player.x = 280;
    sprites.player.y = groundHeight;
    sprites.player.anchor.set(0.5);
    sprites.player.width *= 2;
    sprites.player.height *= 2;
    sprites.player.play();
}
function createFade() {
    sprites.fade = new PIXI.AnimatedSprite(spritesheet.fade.fadeIn);
    sprites.fade.width = w;
    sprites.fade.height = h;
    sprites.fade.loop = false;
    sprites.fade.animationSpeed = 0.151;
    sprites.fade.play();
}
function createPlayerInside() {
    sprites.playerInside = new PIXI.AnimatedSprite(spritesheet.playerInsideSheet.idleSouth);
    sprites.playerInside.x = 500;
    sprites.playerInside.y = 400;
    sprites.playerInside.width = 34;
    sprites.playerInside.height = 76;
    sprites.playerInside.loop = false;
    sprites.playerInside.animationSpeed = 0.15;
    sprites.playerInside.play();
}
function createChest() {
    sprites.chest = new PIXI.AnimatedSprite(spritesheet.chestSheet.closed);
    sprites.chest.loop = false;
    sprites.chest.animationSpeed = 0.2;
    sprites.chest.x = 470;
    sprites.chest.y = 145;
    sprites.chest.width *= 2;
    sprites.chest.height *= 2;
    sprites.chest.play();
}
function createMessage() {
    sprites.msg = new PIXI.AnimatedSprite(spritesheet.message.background);
    //sprites.msg = spritesheet.message.background
    msg.addChild(sprites.msg);
    sprites.msg.width = w;
    sprites.msg.height = h;
    app.stage.addChild(msg);

}
function createMessageButtons(lan) {
    if (lan == "pt") {
        let text = new PIXI.Text("Esse jogo ainda esta em desenvolvimento",{fontFamily : 'Arial', fontSize: 16});
        text.x = 310;
        text.y = 100;
        msg.addChild(text);
        let text2 = new PIXI.Text("Pretendo continuar no meu tempo livre :)",{fontFamily : 'Arial', fontSize: 12});
        text2.x = 310;
        text2.y = 120;
        msg.addChild(text2);
        //butons 
        sprites.msgResume = new PIXI.AnimatedSprite(spritesheet.message.pt.resume);
        sprites.msgResume.x = 440;
        sprites.msgResume.y = 210;
        sprites.msgResume.width *=2;
        sprites.msgResume.height *=2;
        sprites.msgResume.interactive = true;
        sprites.msgResume.buttonMode = true;
        sprites.msgResume.on('pointerdown', () => {
            window.open("https://flaviozanoni.com/pt/resumo.html");
        });
        sprites.msgProjects = new PIXI.AnimatedSprite(spritesheet.message.pt.projects);
        sprites.msgProjects.x = 440;
        sprites.msgProjects.y = 280;
        sprites.msgProjects.width *=2;
        sprites.msgProjects.height *=2;
        sprites.msgProjects.interactive = true;
        sprites.msgProjects.buttonMode = true;
        sprites.msgProjects.on('pointerdown', () => {
            window.open("https://flaviozanoni.com/pt/projetos.html");
        });
        sprites.msgLinkedin = new PIXI.AnimatedSprite(spritesheet.message.linkedin);
        sprites.msgLinkedin.x = 530;
        sprites.msgLinkedin.y = 350;
        sprites.msgLinkedin.width *=2;
        sprites.msgLinkedin.height *=2;
        sprites.msgLinkedin.interactive = true;
        sprites.msgLinkedin.buttonMode = true;
        sprites.msgLinkedin.on('pointerdown', () => {
            window.open("https://www.linkedin.com/in/fl%C3%A1vio-zanoni-658307202/?locale=pt_BR");
        });
    } else {

        let text = new PIXI.Text("This game is still in development",{fontFamily : 'Arial', fontSize: 16});
        text.x = 310;
        text.y = 100;
        msg.addChild(text);
        let text2 = new PIXI.Text("I'll continue developing it in my free time :)",{fontFamily : 'Arial', fontSize: 12});
        text2.x = 310;
        text2.y = 120;
        msg.addChild(text2);

        //buttons
        sprites.msgResume = new PIXI.AnimatedSprite(spritesheet.message.en.resume);
        sprites.msgResume.x = 440;
        sprites.msgResume.y = 210;
        sprites.msgResume.width *=2;
        sprites.msgResume.height *=2;
        sprites.msgResume.interactive = true;
        sprites.msgResume.buttonMode = true;
        sprites.msgResume.on('pointerdown', () => {
            window.open("https://flaviozanoni.com/en/resume.html");
        });
        sprites.msgProjects = new PIXI.AnimatedSprite(spritesheet.message.en.projects);
        sprites.msgProjects.x = 440;
        sprites.msgProjects.y = 280;
        sprites.msgProjects.width *=2;
        sprites.msgProjects.height *=2;
        sprites.msgProjects.interactive = true;
        sprites.msgProjects.buttonMode = true;
        sprites.msgProjects.on('pointerdown', () => {
            window.open("https://flaviozanoni.com/en/projects.html");
        });
        sprites.msgLinkedin = new PIXI.AnimatedSprite(spritesheet.message.linkedin);
        sprites.msgLinkedin.x = 530;
        sprites.msgLinkedin.y = 350;
        sprites.msgLinkedin.width *=2;
        sprites.msgLinkedin.height *=2;
        sprites.msgLinkedin.interactive = true;
        sprites.msgLinkedin.buttonMode = true;
        sprites.msgLinkedin.on('pointerdown', () => {
            window.open("https://www.linkedin.com/in/fl%C3%A1vio-zanoni-658307202/?locale=pt_BR");
        });
    };
    sprites.msgGit = new PIXI.AnimatedSprite(spritesheet.message.github);
    sprites.msgGit.x = 440;
    sprites.msgGit.y = 350;
    sprites.msgGit.width *=2;
    sprites.msgGit.height *=2;
    sprites.msgGit.interactive = true;
    sprites.msgGit.buttonMode = true;   
    sprites.msgGit.on('pointerdown', () => {
        window.open("https://github.com/FlavioZanoni");
    });
    msg.addChild(sprites.msgResume);
    msg.addChild(sprites.msgProjects);
    msg.addChild(sprites.msgGit);
    msg.addChild(sprites.msgLinkedin);

}

let wind = new Howl({
    src: ['../sounds/windo.mp3'],
    autoplay: true,
    volume: 0,
    loop: true
})
let chesto = new Howl({
    src: ['../sounds/bau.mp3'],
    volume: 0.9
})

let tracks = [
    new Howl({
        src: ['../sounds/music/Andr3w-Planet-140-BPM.mp3'],
        volume: 0.2,
        loop: true
        /* skip the song when it is over
        onend: () => {
            nextTrack()
        } */
    }),
    new Howl({
        src: ['../sounds/music/Andr3w-Cloud-140-BPM.mp3',],
        volume: 0.2,
        loop: true
        /* onend: () => {
            nextTrack()
        } */
    }),
    new Howl({
        src: ['../sounds/music/Andr3w-Fun-147-BPM.mp3'],
        volume: 0.2,
        loop: true
        /* onend: () => {
            nextTrack()
        } */
    }),
    new Howl({
        src: ['../sounds/music/Andr3w-Chill-140-BPM.mp3'],
        volume: 0.2,
        loop: true
        /* onend: () => {
            nextTrack()
        } */
    })
];

let trackNum = 0;
let trackMax = tracks.length - 1;
tracks[trackNum].play();

// mPlayer commands
function nextTrack() {
    console.log('[music] => Next track');
    if (trackNum == trackMax) {
        tracks[trackMax].stop();
        trackNum = 0;
        tracks[trackNum].play();
        console.log(trackNum);

    } else {
        tracks[trackNum].stop();
        trackNum++;
        tracks[trackNum].play();
        console.log(trackNum);
    }
}
function backTrack() {
    console.log('[music] => Back track');
    if (trackNum == 0) {
        tracks[trackNum].stop();
        trackNum = trackMax;
        tracks[trackNum].play();
    } else {
        tracks[trackNum].stop();
        trackNum--;
        tracks[trackNum].play();
    }
}
function demute() {
    let saveseek;
    if (tracks[trackNum].playing()) {
        paused = true;
        tracks[trackNum].pause();
        sprites.disk.stop();
        saveseek = tracks[trackNum].seek();
        console.log('[music] => Paused');
    } else if (paused == true) {
        paused == false;
        tracks[trackNum].play();
        tracks[trackNum].seek(saveseek);
        sprites.disk.play();
        console.log('[music] => Unpaused');
    }
}
function changeStage() {
    console.log("changing Room");
    outRoom = false;
    // run keyhole animation
    //sprites.keyhole.onComplete = () => {
    //remove the player for now
    app.stage.removeChild(sprites.player);
    sprites.fade.textures = spritesheet.fade.fadeOut;
    scenary.addChild(sprites.fade);
    sprites.fade.play();
    sprites.fade.onComplete = () => {
        createInside();
        scenary.visible = false;
        sprites.fade.textures = spritesheet.fade.fadeIn;
        sprites.fade.play();
        sprites.fade.onComplete = () => { sprites.fade.visible = false }
    }
}

// lsiteners and movement
let keys = {};
window.addEventListener("keydown", (e) => { keys[e.key] = true });
window.addEventListener("keyup", (e) => { keys[e.key] = false });

let grv = 2;
let bboxRight = w - 11;
let bboxLeft = 0;
let bboxRightRoom = 745;
let bboxLeftRoom = 235;
let bboxDownRoom = 450;
let bboxUpRoom = 70;
let vsp = 0;
let hsp = 0;
let lastKey;
let jumping = false;

function gameLoop() { 
    if (outRoom == true) {
        // press E message
        if (sprites.player.x > 100 && sprites.player.x < 240) {
            console.log("press E");
            scenary.addChild(sprites.presse);
            if (keys["e"] == true || keys["E"] == true) {
                changeStage();
                keys["e"] == false;
            }
        } else {
            scenary.removeChild(sprites.presse);
        }
        function onGround() {
            if (sprites.player.y <= groundHeight) {
                return false;
            } else {
                return true;
            }
        }
        // a (left -1)
        if (keys["a"] == true || keys["A"] == true) {
            if (!sprites.player.playing) {
                sprites.player.textures = spritesheet.playerSheet.walkLeft;
                sprites.player.play();
            }
            hsp = -6;
            lastKey = "left";
        } else if (keys["d"] == true || keys["D"] == true) {
            if (!sprites.player.playing) {
                sprites.player.textures = spritesheet.playerSheet.walkRight;
                sprites.player.play();
            }
            hsp = 6;
            lastKey = "right";
        } else {
            if (lastKey == "right") {
                sprites.player.textures = spritesheet.playerSheet.idleRight;
                sprites.player.play();
            } else {
                sprites.player.textures = spritesheet.playerSheet.idleLeft;
                sprites.player.play();
            }
            hsp = 0;
        }
        // gravity 
        if (!onGround()) {
            vsp += grv;
            if (lastKey == "right") {
                sprites.player.textures = spritesheet.playerSheet.jumpRight;
                sprites.player.play();
            } else {
                sprites.player.textures = spritesheet.playerSheet.jumpLeft;
                sprites.player.play();
            }
        } else {
            vsp = 0;
        }
        //jump
        if (keys[" "] == true && onGround() && jumping == false) {
            vsp -= 10;
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
        if ((sprites.playerInside.x >= 440) && (sprites.playerInside.x <= 550)) {
            if (keys["e"] == true && sprites.playerInside.y <= 160) {
                sprites.chest.textures = spritesheet.chestSheet.opening;
                sprites.chest.play();
                chesto.play();
                sprites.chest.onComplete = () => {
                    createMessage()
                    if (lan == "pt") {;
                        createMessageButtons("pt");
                        console.log("message");
                        //show the pt and redirect to the pt
                    } else {
                        createMessageButtons("en");
                        //show the en and redirect to the en
                    }
                }
            }
            if ((sprites.playerInside.y + vsp) <= 150 && (sprites.playerInside.y + vsp) >= 81) {
                vsp = 0;
            }
        }
        //colision x, chest1
        if ((sprites.playerInside.y <= 150) && (sprites.playerInside.y >= 88)) {
            if ((sprites.playerInside.x + hsp) >= 440 && (sprites.playerInside.x + hsp) <= 550) {
                hsp = 0;
            }
        }
        sprites.playerInside.y += vsp;
        sprites.playerInside.x += hsp;
    }
}