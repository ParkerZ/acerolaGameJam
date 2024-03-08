import * as ex from "excalibur";

const mainSpritesFile = require("../res/spritesheet_tiles.png");
const invertSpritesFile = require("../res/spritesheet_tiles_inverted.png");
const slashFile = require("../res/slash.png");
const bulletFile = require("../res/bullet.png");
const buckshotFile = require("../res/buckshot.png");
const kitchenBgFile = require("../res/kitchenBg.png");
const kitchenWallsFile = require("../res/kitchenWalls.png");
const vampireBgFile = require("../res/vampireBg.png");
const vampireWallsFile = require("../res/vampireWalls.png");

const Resources = {
  mainSprites: new ex.ImageSource(mainSpritesFile),
  invertSprites: new ex.ImageSource(invertSpritesFile),
  slash: new ex.ImageSource(slashFile),
  bullet: new ex.ImageSource(bulletFile),
  buckshot: new ex.ImageSource(buckshotFile),
  kitchenBg: new ex.ImageSource(kitchenBgFile),
  kitchenWalls: new ex.ImageSource(kitchenWallsFile),
  vampireBg: new ex.ImageSource(vampireBgFile),
  vampireWallsFile: new ex.ImageSource(vampireWallsFile),
};

const loader = new ex.Loader();
loader.suppressPlayButton = true;

const mainSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.mainSprites,
  grid: {
    columns: 27,
    rows: 20,
    spriteWidth: 64,
    spriteHeight: 64,
  },
  spacing: {
    margin: { x: 10, y: 10 }, // 10 gap around
  },
});

const invertSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.invertSprites,
  grid: {
    columns: 27,
    rows: 20,
    spriteWidth: 64,
    spriteHeight: 64,
  },
  spacing: {
    margin: { x: 10, y: 10 }, // 10 gap around
  },
});

const slashSprite = ex.Sprite.from(Resources.slash);
const bulletSprite = ex.Sprite.from(Resources.bullet);
const buckshotSprite = ex.Sprite.from(Resources.buckshot);
const kitchenBgSprite = ex.Sprite.from(Resources.kitchenBg);
const kitchenWallsSprite = ex.Sprite.from(Resources.kitchenWalls);
const vampireBgSprite = ex.Sprite.from(Resources.vampireBg);
const vampireWallsSprite = ex.Sprite.from(Resources.vampireWallsFile);

for (const res in Resources) {
  if (res !== "sounds") {
    loader.addResource((Resources as any)[res]);
    continue;
  }
  for (const sound in (Resources as any).sounds) {
    loader.addResource((Resources as any).sounds[sound]);
  }
}

export {
  Resources,
  loader,
  mainSpriteSheet,
  invertSpriteSheet,
  slashSprite,
  bulletSprite,
  buckshotSprite,
  kitchenBgSprite,
  kitchenWallsSprite,
  vampireBgSprite,
  vampireWallsSprite,
};
