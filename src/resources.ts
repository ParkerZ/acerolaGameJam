import * as ex from "excalibur";

// sounds
const click1File = require("../res/sounds/click1.wav");
const click2File = require("../res/sounds/click2.wav");
const deliverFile = require("../res/sounds/deliver.wav");
const deliverFailFile = require("../res/sounds/deliverFail.wav");
const getCoinFile = require("../res/sounds/getCoin.wav");
const hitEnemy1File = require("../res/sounds/hitEnemy1.wav");
const hitEnemy2File = require("../res/sounds/hitEnemy2.wav");
const hitEnemy3File = require("../res/sounds/hitEnemy3.wav");
const hitWallFile = require("../res/sounds/hitWall.wav");
const interactFile = require("../res/sounds/interact.wav");
const interactPickFile = require("../res/sounds/interactPick.wav");
const interactPlaceFile = require("../res/sounds/interactPlace.wav");
const knifeSoundFile = require("../res/sounds/knife.wav");
const hmgSoundFile = require("../res/sounds/hmg.wav");
const newOrderFile = require("../res/sounds/newOrder.wav");
const orderFailFile = require("../res/sounds/orderFail.wav");
const pistolSoundFile = require("../res/sounds/pistol.wav");
const shotgunSoundFile = require("../res/sounds/shotgun.wav");
const smgSoundFile = require("../res/sounds/smg.wav");
const sniperSoundFile = require("../res/sounds/sniper.wav");

const mainSpritesFile = require("../res/spritesheet_tiles.png");
const invertSpritesFile = require("../res/spritesheet_tiles_inverted.png");
const slashFile = require("../res/slash.png");
const bulletFile = require("../res/bullet.png");
const buckshotFile = require("../res/buckshot.png");
const kitchenBgFile = require("../res/kitchenBg3.png");
const kitchenWallsFile = require("../res/kitchenWalls.png");
const vampireBgFile = require("../res/vampireBg2.png");
const vampireWallsFile = require("../res/vampireWalls.png");

// chef
const chefFile = require("../res/chef/chef4.png");
const chefKnifeFile = require("../res/chef/chef4Knife.png");
const chefPistolFile = require("../res/chef/chef4Pistol.png");
const chefShotgunFile = require("../res/chef/chef4Shotgun.png");
const chefSniperFile = require("../res/chef/chef4Sniper.png");
const slash1File = require("../res/chef/slash1.png");
const slash2File = require("../res/chef/slash2.png");
const slash3File = require("../res/chef/slash3.png");

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

// ui
const kitchenModalFile = require("../res/ui/kitchenModal.png");
const vampireModalFile = require("../res/ui/vampireModal.png");
const continueButtonFile = require("../res/ui/continueButton.png");
const continueButtonPressedFile = require("../res/ui/continueButtonPressed.png");
const continueButtonOutlineGreenFile = require("../res/ui/continueButtonOutlineGreen.png");
const continueButtonOutlinePurpleFile = require("../res/ui/continueButtonOutlinePurple.png");
const coinHudGreenFile = require("../res/ui/coinHudGreen.png");
const coinHudPurpleFile = require("../res/ui/coinHudPurple.png");
const shopButtonOutlineFile = require("../res/ui/shopButtonOutline.png");
const shopButtonGreenFile = require("../res/ui/shopButtonGreen.png");
const shopButtonPressedGreenFile = require("../res/ui/shopButtonPressedGreen.png");
const shopButtonPurpleFile = require("../res/ui/shopButtonPurple.png");
const shopButtonPressedPurpleFile = require("../res/ui/shopButtonPressedPurple.png");

// order
const orderBgFile = require("../res/ui/order/orderBg.png");
const orderBgRedFile = require("../res/ui/order/orderBgRed.png");
const orderProfile1File = require("../res/ui/order/orderProfile1.png");
const orderProfile2File = require("../res/ui/order/orderProfile2.png");
const orderProfile3File = require("../res/ui/order/orderProfile3.png");
const orderProfileTomatoFile = require("../res/ui/order/orderProfileTomato.png");
const orderProfileLettuceFile = require("../res/ui/order/orderProfileLettuce.png");
const orderProfileCucumberFile = require("../res/ui/order/orderProfileCucumber.png");

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

// shopItems
const akGreenFile = require("../res/ui/shop/akGreen.png");
const akPurpleFile = require("../res/ui/shop/akPurple.png");
const pistolGreenFile = require("../res/ui/shop/pistolGreen.png");
const pistolPurpleFile = require("../res/ui/shop/pistolPurple.png");
const shotgunGreenFile = require("../res/ui/shop/shotgunGreen.png");
const shotgunPurpleFile = require("../res/ui/shop/shotgunPurple.png");
const smgGreenFile = require("../res/ui/shop/smgGreen.png");
const smgPurpleFile = require("../res/ui/shop/smgPurple.png");
const sniperGreenFile = require("../res/ui/shop/sniperGreen.png");
const sniperPurpleFile = require("../res/ui/shop/sniperPurple.png");

const Resources = {
  sounds: {
    click1: new ex.Sound(click1File),
    click2: new ex.Sound(click2File),
    deliver: new ex.Sound(deliverFile),
    deliverFail: new ex.Sound(deliverFailFile),
    getCoin: new ex.Sound(getCoinFile),
    hitEnemy1: new ex.Sound(hitEnemy1File),
    hitEnemy2: new ex.Sound(hitEnemy2File),
    hitEnemy3: new ex.Sound(hitEnemy3File),
    hitWall: new ex.Sound(hitWallFile),
    hmg: new ex.Sound(hmgSoundFile),
    interact: new ex.Sound(interactFile),
    interactPick: new ex.Sound(interactPickFile),
    interactPlace: new ex.Sound(interactPlaceFile),
    knife: new ex.Sound(knifeSoundFile),
    newOrder: new ex.Sound(newOrderFile),
    orderFail: new ex.Sound(orderFailFile),
    pistol: new ex.Sound(pistolSoundFile),
    shotgun: new ex.Sound(shotgunSoundFile),
    smg: new ex.Sound(smgSoundFile),
    sniper: new ex.Sound(sniperSoundFile),
  },

  mainSprites: new ex.ImageSource(mainSpritesFile),
  invertSprites: new ex.ImageSource(invertSpritesFile),
  slash: new ex.ImageSource(slashFile),
  bullet: new ex.ImageSource(bulletFile),
  buckshot: new ex.ImageSource(buckshotFile),
  kitchenBg: new ex.ImageSource(kitchenBgFile),
  kitchenWalls: new ex.ImageSource(kitchenWallsFile),
  vampireBg: new ex.ImageSource(vampireBgFile),
  vampireWallsFile: new ex.ImageSource(vampireWallsFile),

  // chef
  chef: new ex.ImageSource(chefFile),
  chefKnife: new ex.ImageSource(chefKnifeFile),
  chefPistol: new ex.ImageSource(chefPistolFile),
  chefShotgun: new ex.ImageSource(chefShotgunFile),
  chefSniper: new ex.ImageSource(chefSniperFile),
  slash1: new ex.ImageSource(slash1File),
  slash2: new ex.ImageSource(slash2File),
  slash3: new ex.ImageSource(slash3File),

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
  coinHudGreen: new ex.ImageSource(coinHudGreenFile),
  coinHudPurple: new ex.ImageSource(coinHudPurpleFile),
  shopButtonOutline: new ex.ImageSource(shopButtonOutlineFile),
  shopButtonGreen: new ex.ImageSource(shopButtonGreenFile),
  shopButtonPressedGreen: new ex.ImageSource(shopButtonPressedGreenFile),
  shopButtonPurple: new ex.ImageSource(shopButtonPurpleFile),
  shopButtonPressedPurple: new ex.ImageSource(shopButtonPressedPurpleFile),

  // order
  orderBg: new ex.ImageSource(orderBgFile),
  orderBgRed: new ex.ImageSource(orderBgRedFile),
  orderProfile1: new ex.ImageSource(orderProfile1File),
  orderProfile2: new ex.ImageSource(orderProfile2File),
  orderProfile3: new ex.ImageSource(orderProfile3File),
  orderProfileTomato: new ex.ImageSource(orderProfileTomatoFile),
  orderProfileLettuce: new ex.ImageSource(orderProfileLettuceFile),
  orderProfileCucumber: new ex.ImageSource(orderProfileCucumberFile),

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

  // shopItems
  akGreen: new ex.ImageSource(akGreenFile),
  akPurple: new ex.ImageSource(akPurpleFile),
  pistolGreen: new ex.ImageSource(pistolGreenFile),
  pistolPurple: new ex.ImageSource(pistolPurpleFile),
  shotgunGreen: new ex.ImageSource(shotgunGreenFile),
  shotgunPurple: new ex.ImageSource(shotgunPurpleFile),
  smgGreen: new ex.ImageSource(smgGreenFile),
  smgPurple: new ex.ImageSource(smgPurpleFile),
  sniperGreen: new ex.ImageSource(sniperGreenFile),
  sniperPurple: new ex.ImageSource(sniperPurpleFile),
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

// chef
const chefSprite = ex.Sprite.from(Resources.chef);
const chefKnifeSprite = ex.Sprite.from(Resources.chefKnife);
const chefPistolSprite = ex.Sprite.from(Resources.chefPistol);
const chefShotgunSprite = ex.Sprite.from(Resources.chefShotgun);
const chefSniperSprite = ex.Sprite.from(Resources.chefSniper);
const slash1Sprite = ex.Sprite.from(Resources.slash1);
const slash2Sprite = ex.Sprite.from(Resources.slash2);
const slash3Sprite = ex.Sprite.from(Resources.slash3);
const slashAnimation = new ex.Animation({
  frames: [
    { graphic: slash1Sprite, duration: 30 },
    { graphic: slash2Sprite, duration: 30 },
    { graphic: slash3Sprite, duration: 30 },
  ],
  strategy: ex.AnimationStrategy.Freeze,
});

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
const coinHudGreenSprite = ex.Sprite.from(Resources.coinHudGreen);
const coinHudPurpleSprite = ex.Sprite.from(Resources.coinHudPurple);
const shopButtonOutlineSprite = ex.Sprite.from(Resources.shopButtonOutline);
const shopButtonGreenSprite = ex.Sprite.from(Resources.shopButtonGreen);
const shopButtonPressedGreenSprite = ex.Sprite.from(
  Resources.shopButtonPressedGreen
);
const shopButtonPurpleSprite = ex.Sprite.from(Resources.shopButtonPurple);
const shopButtonPressedPurpleSprite = ex.Sprite.from(
  Resources.shopButtonPressedPurple
);

// order
const orderBgSprite = ex.Sprite.from(Resources.orderBg);
const orderBgRedSprite = ex.Sprite.from(Resources.orderBgRed);
const orderProfile1Sprite = ex.Sprite.from(Resources.orderProfile1);
const orderProfile2Sprite = ex.Sprite.from(Resources.orderProfile2);
const orderProfile3Sprite = ex.Sprite.from(Resources.orderProfile3);
const orderProfileTomatoSprite = ex.Sprite.from(Resources.orderProfileTomato);
const orderProfileLettuceSprite = ex.Sprite.from(Resources.orderProfileLettuce);
const orderProfileCucumberSprite = ex.Sprite.from(
  Resources.orderProfileCucumber
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

// shopItems
const akGreenSprite = ex.Sprite.from(Resources.akGreen);
const akPurpleSprite = ex.Sprite.from(Resources.akPurple);
const pistolGreenSprite = ex.Sprite.from(Resources.pistolGreen);
const pistolPurpleSprite = ex.Sprite.from(Resources.pistolPurple);
const shotgunGreenSprite = ex.Sprite.from(Resources.shotgunGreen);
const shotgunPurpleSprite = ex.Sprite.from(Resources.shotgunPurple);
const smgGreenSprite = ex.Sprite.from(Resources.smgGreen);
const smgPurpleSprite = ex.Sprite.from(Resources.smgPurple);
const sniperGreenSprite = ex.Sprite.from(Resources.sniperGreen);
const sniperPurpleSprite = ex.Sprite.from(Resources.sniperPurple);

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
  chefSprite,
  chefKnifeSprite,
  chefPistolSprite,
  chefShotgunSprite,
  chefSniperSprite,
  slashAnimation,
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
  kitchenModalSprite,
  vampireModalSprite,
  continueButtonSprite,
  continueButtonPressedSprite,
  continueButtonOutlineGreenSprite,
  continueButtonOutlinePurpleSprite,
  coinHudGreenSprite,
  coinHudPurpleSprite,
  shopButtonOutlineSprite,
  shopButtonGreenSprite,
  shopButtonPressedGreenSprite,
  shopButtonPurpleSprite,
  shopButtonPressedPurpleSprite,
  orderBgSprite,
  orderBgRedSprite,
  orderProfile1Sprite,
  orderProfile2Sprite,
  orderProfile3Sprite,
  orderProfileTomatoSprite,
  orderProfileLettuceSprite,
  orderProfileCucumberSprite,
  akGreenSprite,
  akPurpleSprite,
  pistolGreenSprite,
  pistolPurpleSprite,
  shotgunGreenSprite,
  shotgunPurpleSprite,
  smgGreenSprite,
  smgPurpleSprite,
  sniperGreenSprite,
  sniperPurpleSprite,
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
