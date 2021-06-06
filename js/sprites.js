
let spritesheet = [];



function createSpriteSheet() {
    let sheet = PIXI.BaseTexture.from('../images/sprites/spritesheet.png');
    let sheetFade = PIXI.BaseTexture.from('../images/sprites/fade.png');

    spritesheet.fade["fadein"] = [
            new PIXI.Texture(sheet, new PIXI.Rectangle( 5 * 512, 0, 512, 288)),
            new PIXI.Texture(sheet, new PIXI.Rectangle( 4 * 512, 0, 512, 288)),
            new PIXI.Texture(sheet, new PIXI.Rectangle( 3 * 512, 0, 512, 288)),
            new PIXI.Texture(sheet, new PIXI.Rectangle( 2 * 512, 0, 512, 288)),
            new PIXI.Texture(sheet, new PIXI.Rectangle( 1 * 512, 0, 512, 288)),
            new PIXI.Texture(sheet, new PIXI.Rectangle( 0, 0, 512, 288))
    ]
    spritesheet.fade["fadeOut"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle( 0 , 0, 512, 288)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 1 * 512, 0, 512, 288)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 2 * 512, 0, 512, 288)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 3 * 512, 0, 512, 288)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 4 * 512, 0, 512, 288)),
        new PIXI.Texture(sheet, new PIXI.Rectangle( 5 * 512, 0, 512, 288))
    ]
}


function createFade() {
    
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