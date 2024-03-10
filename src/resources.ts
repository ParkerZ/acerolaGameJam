import * as ex from "excalibur";

const mainSpritesFile = require("../res/spritesheet_tiles.png");
const invertSpritesFile = require("../res/spritesheet_tiles_inverted.png");
const slashFile = require("../res/slash.png");
const bulletFile = require("../res/bullet.png");
const buckshotFile = require("../res/buckshot.png");
const kitchenBgFile = require("../res/kitchenBg2.png");
const kitchenWallsFile = require("../res/kitchenWalls.png");
const vampireBgFile = require("../res/vampireBg.png");
const vampireWallsFile = require("../res/vampireWalls.png");

// foods
const lettuceFile = require("../res/foods/lettuce.png");
const lettuceChoppedFile = require("../res/foods/lettuceChopped.png");
const tomatoFile = require("../res/foods/tomato.png");
const tomoatoChoppedFile = require("../res/foods/tomatoChopped.png");
const cucumberFile = require("../res/foods/cucumber.png");
const cucumberChoppedFile = require("../res/foods/cucumberChopped.png");

const plateFile = require("../res/plate.png");
const counterFile = require("../res/counter.png");

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

  // foods
  lettuce: new ex.ImageSource(lettuceFile),
  lettuceChopped: new ex.ImageSource(lettuceChoppedFile),
  tomato: new ex.ImageSource(tomatoFile),
  tomatoChopped: new ex.ImageSource(tomoatoChoppedFile),
  cucumber: new ex.ImageSource(cucumberFile),
  cucumberChopped: new ex.ImageSource(cucumberChoppedFile),

  plate: new ex.ImageSource(plateFile),
  counter: new ex.ImageSource(counterFile),
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

// foods
const lettuceSprite = ex.Sprite.from(Resources.lettuce);
const lettuceChoppedSprite = ex.Sprite.from(Resources.lettuceChopped);
const tomatoSprite = ex.Sprite.from(Resources.tomato);
const tomatoChoppedSprite = ex.Sprite.from(Resources.tomatoChopped);
const cucumberSprite = ex.Sprite.from(Resources.cucumber);
const cucumberChoppedSprite = ex.Sprite.from(Resources.cucumberChopped);

const plateSprite = ex.Sprite.from(Resources.plate);
const counterSprite = ex.Sprite.from(Resources.counter);

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
  lettuceSprite,
  lettuceChoppedSprite,
  tomatoSprite,
  tomatoChoppedSprite,
  cucumberSprite,
  cucumberChoppedSprite,
  plateSprite,
  counterSprite,
};
