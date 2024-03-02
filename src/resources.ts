import * as ex from "excalibur";

const mainSpritesFile = require("../res/spritesheet_tiles.png");
const slashFile = require("../res/slash.png");

const Resources = {
  mainSprites: new ex.ImageSource(mainSpritesFile),
  slash: new ex.ImageSource(slashFile),
};

const loader = new ex.Loader();
loader.suppressPlayButton = true;
// loader.hidePlayButton();

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

const slashSprite = ex.Sprite.from(Resources.slash);

for (const res in Resources) {
  if (res !== "sounds") {
    loader.addResource((Resources as any)[res]);
    continue;
  }
  for (const sound in (Resources as any).sounds) {
    loader.addResource((Resources as any).sounds[sound]);
  }
}

export { Resources, loader, mainSpriteSheet, slashSprite };
