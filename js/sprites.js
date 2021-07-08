PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let sheet = PIXI.BaseTexture.from('../images/sprites/spritesheet.png');
let sheetFade = PIXI.BaseTexture.from('../images/sprites/fade.png');
let spritesheet = {
    "gameScreen": {
        "en": [],
        "pt": []
    },
    "misc": [],
    "playerSheet": [],
    "fade": [],
    "inside": [],
    "playerInsideSheet": [],
    "mplayerSheet": [],
    "chestSheet": [],
    "message": {
        "en": [],
        "pt": []
    }
};

function createSpriteSheet() {
    createGameScreen();
    createScenary();
    createMisc()
    createMplayerSheet();
    createPlayerSheet();
    createFade();
    createInside();
    createPlayerInsideSheet();
    createChestSheet();
    createMessage();
}
function createGameScreen() {
    //language : pt
    spritesheet.gameScreen.pt["play"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 192, 77, 28))
    ]
    spritesheet.gameScreen.pt["playClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 221, 77, 28))
    ]
    spritesheet.gameScreen.pt["projects"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(590, 192, 96, 31))
    ]
    spritesheet.gameScreen.pt["projectsClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(590, 222, 96, 31))
    ]
    spritesheet.gameScreen.pt["resume"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 250, 93, 26))
    ]
    spritesheet.gameScreen.pt["resumeClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 302, 93, 26))
    ]

    //language : en
    spritesheet.gameScreen.en["play"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 356, 77, 28))
    ]
    spritesheet.gameScreen.en["playClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 385, 77, 28))
    ]
    spritesheet.gameScreen.en["projects"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(590, 356, 96, 31))
    ]
    spritesheet.gameScreen.en["projectsClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(590, 386, 96, 31))
    ]
    spritesheet.gameScreen.en["resume"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 414, 93, 26))
    ]
    spritesheet.gameScreen.en["resumeClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 441, 93, 26))
    ]

    spritesheet.gameScreen["background"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 931, 512, 288))
    ]
    spritesheet.gameScreen["github"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 276, 49, 26))
    ]
    spritesheet.gameScreen["githubClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 328, 49, 26))
    ]
    spritesheet.gameScreen["linkedin"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(561, 277, 42, 23))
    ]
    spritesheet.gameScreen["linkedinClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(561, 329, 42, 23))
    ]
}
function createScenary() {
    spritesheet["scenary"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 67, 512, 288))
    ]
}
function createMisc() {
    spritesheet.misc["presse"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(170, 37, 70, 19))
    ]
    spritesheet.misc["presseEN"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(240, 37, 70, 19))
    ]
}
function createPlayerSheet() {
    spritesheet.playerSheet["idleRight"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(169, 0, 29, 32))
    ]
    spritesheet.playerSheet["idleLeft"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(556, 0, 30, 32))
    ]

    spritesheet.playerSheet["walkRight"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(198, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(230, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(259, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(288, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(317, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(346, 0, 31, 32))
    ]
    spritesheet.playerSheet["walkLeft"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(376, 0, 32, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(408, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(437, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(466, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(495, 0, 29, 32)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(524, 0, 32, 32))
    ]

    spritesheet.playerSheet["jumpRight"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(259, 0, 29, 32)),
    ]
    spritesheet.playerSheet["jumpLeft"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(437, 0, 29, 32)),
    ]
}
function createFade() {
    let w = 512;
    let h = 288;
    spritesheet.fade["fadeIn"] = [
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 5 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 4 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 3 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 2 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 1 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 0, 0, w, h))
    ]
    spritesheet.fade["fadeOut"] = [
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 0 , 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 1 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 2 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 3 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 4 * w, 0, w, h)),
        new PIXI.Texture(sheetFade, new PIXI.Rectangle( 5 * w, 0, w, h))
    ]
}
function createInside() {
    spritesheet.inside["floor"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 355, 512, 288))
    ]
    spritesheet.inside["walls"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 643, 512, 288))
    ]
}
function createPlayerInsideSheet() {
    spritesheet.playerInsideSheet["idleSouth"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(512, 68, 17, 38))
    ]
}
function createMplayerSheet() {
    spritesheet.mplayerSheet["tray"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 49, 51, 18))
    ]

    spritesheet.mplayerSheet["next"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(9, 29, 9, 10))
    ]

    spritesheet.mplayerSheet["nextClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 29, 9, 10))
    ]

    spritesheet.mplayerSheet["prev"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(9, 39, 9, 10))
    ]

    spritesheet.mplayerSheet["prevClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 39, 9, 10))
    ]

    spritesheet.mplayerSheet["play"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(32, 29, 14, 14))
    ]

    spritesheet.mplayerSheet["playClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(18, 29, 14, 14))
    ]

    spritesheet.mplayerSheet["paused"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(60, 29, 14, 14))
    ]

    spritesheet.mplayerSheet["pausedClicked"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(46, 29, 14, 14))
    ]

    spritesheet.mplayerSheet["disk"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(74, 29, 24, 24)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(98, 29, 24, 24)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(122, 29, 24, 24)),
        new PIXI.Texture(sheet, new PIXI.Rectangle(146, 29, 24, 24))
    ]
}
function createChestSheet() {
    spritesheet.chestSheet["closed"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( 0, 0, 42, 29))
    ] 

    spritesheet.chestSheet["open"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(3 * 42, 0, 42, 29))
    ] 

    spritesheet.chestSheet["opening"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( 1 * 42, 0, 42, 29)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 2 * 42, 0, 42, 29)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 3 * 42, 0, 42, 29))
    ]
}
function createMessage(){
    spritesheet.message["background"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0, 1219, 512, 288))
    ]

    //pt
    spritesheet.message.pt["resume"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(605, 252, 81, 25))
    ]

    spritesheet.message.pt["projects"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(605, 277, 81, 25))
    ]

    // en
    spritesheet.message.en["resume"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(605, 327, 81, 25))
    ]

    spritesheet.message.en["projects"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(606, 416, 81, 25))
    ]

    spritesheet.message["github"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(605, 302, 36, 25))
    ]

    spritesheet.message["linkedin"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(641, 302, 36, 25))
    ]
}

export {
    spritesheet,
    createSpriteSheet
}