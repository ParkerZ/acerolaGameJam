import * as ex from "excalibur";

const mainSpritesFile = require("../res/spritesheet_tiles.png");
const invertSpritesFile = require("../res/spritesheet_tiles_inverted.png");
const slashFile = require("../res/slash.png");
const bulletFile = require("../res/bullet.png");
const buckshotFile = require("../res/buckshot.png");
const kitchenBgFile = require("../res/kitchenBg3.png");
const kitchenWallsFile = require("../res/kitchenWalls.png");
const vampireBgFile = require("../res/vampireBg2.png");
const vampireWallsFile = require("../res/vampireWalls.png");

// foods
const lettuceFile = require("../res/foods/lettuce.png");
const lettuceChoppedFile = require("../res/foods/lettuceChopped.png");
const tomatoFile = require("../res/foods/tomato.png");
const tomoatoChoppedFile = require("../res/foods/tomatoChopped.png");
const cucumberFile = require("../res/foods/cucumber.png");
const cucumberChoppedFile = require("../res/foods/cucumberChopped.png");

const coinFile = require("../res/coin.png");
const plateFile = require("../res/plate.png");

const counterOutlineFile = require("../res/counterOutline.png");
const counterFile = require("../res/counter.png");
const plateRackFile = require("../res/plateRack.png");
const crateFile = require("../res/crate.png");
const trashFile = require("../res/trash.png");
const deliveryStationFile = require("../res/deliveryStation.png");

const chefFile = require("../res/chef3.png");

// ui
const kitchenModalFile = require("../res/ui/kitchenModal.png");
const vampireModalFile = require("../res/ui/vampireModal.png");
const continueButtonFile = require("../res/ui/continueButton.png");
const continueButtonPressedFile = require("../res/ui/continueButtonPressed.png");
const continueButtonOutlineGreenFile = require("../res/ui/continueButtonOutlineGreen.png");
const continueButtonOutlinePurpleFile = require("../res/ui/continueButtonOutlinePurple.png");

// numbers
const n1File = require("../res/ui/numbers/n1.png");
const n2File = require("../res/ui/numbers/n2.png");
const n3File = require("../res/ui/numbers/n3.png");
const n4File = require("../res/ui/numbers/n4.png");
const n5File = require("../res/ui/numbers/n5.png");
const n6File = require("../res/ui/numbers/n6.png");
const n7File = require("../res/ui/numbers/n7.png");
const n8File = require("../res/ui/numbers/n8.png");
const n9File = require("../res/ui/numbers/n9.png");
const n0File = require("../res/ui/numbers/n0.png");

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

  coin: new ex.ImageSource(coinFile),
  plate: new ex.ImageSource(plateFile),

  counterOutlineFile: new ex.ImageSource(counterOutlineFile),
  counter: new ex.ImageSource(counterFile),
  plateRack: new ex.ImageSource(plateRackFile),
  crate: new ex.ImageSource(crateFile),
  trash: new ex.ImageSource(trashFile),
  deliveryStation: new ex.ImageSource(deliveryStationFile),

  chef: new ex.ImageSource(chefFile),

  // ui
  kitchenModal: new ex.ImageSource(kitchenModalFile),
  vampireModal: new ex.ImageSource(vampireModalFile),
  continueButton: new ex.ImageSource(continueButtonFile),
  continueButtonPressed: new ex.ImageSource(continueButtonPressedFile),
  continueButtonOutlineGreen: new ex.ImageSource(
    continueButtonOutlineGreenFile
  ),
  continueButtonOutlinePurple: new ex.ImageSource(
    continueButtonOutlinePurpleFile
  ),

  // numbers
  n1: new ex.ImageSource(n1File),
  n2: new ex.ImageSource(n2File),
  n3: new ex.ImageSource(n3File),
  n4: new ex.ImageSource(n4File),
  n5: new ex.ImageSource(n5File),
  n6: new ex.ImageSource(n6File),
  n7: new ex.ImageSource(n7File),
  n8: new ex.ImageSource(n8File),
  n9: new ex.ImageSource(n9File),
  n0: new ex.ImageSource(n0File),
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

const coinSprite = ex.Sprite.from(Resources.coin);
const plateSprite = ex.Sprite.from(Resources.plate);

const counterOutlineSprite = ex.Sprite.from(Resources.counterOutlineFile);
const counterSprite = ex.Sprite.from(Resources.counter);
const plateRackSprite = ex.Sprite.from(Resources.plateRack);
const crateSprite = ex.Sprite.from(Resources.crate);
const trashSprite = ex.Sprite.from(Resources.trash);
const deliveryStationSprite = ex.Sprite.from(Resources.deliveryStation);

const chefSprite = ex.Sprite.from(Resources.chef);

// ui
const kitchenModalSprite = ex.Sprite.from(Resources.kitchenModal);
const vampireModalSprite = ex.Sprite.from(Resources.vampireModal);
const continueButtonSprite = ex.Sprite.from(Resources.continueButton);
const continueButtonPressedSprite = ex.Sprite.from(
  Resources.continueButtonPressed
);
const continueButtonOutlineGreenSprite = ex.Sprite.from(
  Resources.continueButtonOutlineGreen
);
const continueButtonOutlinePurpleSprite = ex.Sprite.from(
  Resources.continueButtonOutlinePurple
);

// numbers
const n1SPrite = ex.Sprite.from(Resources.n1);
const n2SPrite = ex.Sprite.from(Resources.n2);
const n3SPrite = ex.Sprite.from(Resources.n3);
const n4SPrite = ex.Sprite.from(Resources.n4);
const n5SPrite = ex.Sprite.from(Resources.n5);
const n6SPrite = ex.Sprite.from(Resources.n6);
const n7SPrite = ex.Sprite.from(Resources.n7);
const n8SPrite = ex.Sprite.from(Resources.n8);
const n9SPrite = ex.Sprite.from(Resources.n9);
const n0SPrite = ex.Sprite.from(Resources.n0);

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
  coinSprite,
  plateSprite,
  counterOutlineSprite,
  counterSprite,
  plateRackSprite,
  crateSprite,
  trashSprite,
  deliveryStationSprite,
  chefSprite,
  kitchenModalSprite,
  vampireModalSprite,
  continueButtonSprite,
  continueButtonPressedSprite,
  continueButtonOutlineGreenSprite,
  continueButtonOutlinePurpleSprite,
  n1SPrite,
  n2SPrite,
  n3SPrite,
  n4SPrite,
  n5SPrite,
  n6SPrite,
  n7SPrite,
  n8SPrite,
  n9SPrite,
  n0SPrite,
};
