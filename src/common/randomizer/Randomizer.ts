import {World} from './World';
import {Item} from './Item';
import {MersenneTwister} from './MersenneTwister';
import {Filler} from './Filler';
import {RandomAssumed} from './filler/RandomAssumed';
import {RandomizerMode} from './enums/RandomizerMode';
import {RandomizerLogic} from './enums/RandomizerLogic';
import {PrimeItem} from './enums/PrimeItem';

export class Randomizer {
  protected mode: string;
  protected logic: string;
  protected difficulty: string;
  protected goal: string;
  protected world: World;
  protected rng: MersenneTwister;
  protected seed: number;

  constructor(mode: string, logic: string, difficulty: string) {
    this.mode = mode;
    this.logic = logic;
    this.difficulty = difficulty;
    this.world = new World(this.mode, this.logic, this.difficulty);
  }

  randomize(seed?: number): void {
    // Generate pseudorandom seed if one wasn't provided by the user
    this.seed = seed ? seed : this.getRandomInt(1, 1000000000);

    this.rng = new MersenneTwister(this.seed);
    const itemFiller = new RandomAssumed(this.world, this.rng);
    const vmrTanks = 7; // Number of energy tanks to include in normal upgrade pool to allow for VMR seeds

    // Logically fill the priority items, then the rest of the major upgrades
    itemFiller.fill(this.getPriorityItems());
    itemFiller.fill(this.getUpgrades(vmrTanks));

    // Fill remaining energy tanks in major item locations if using the Major Items mode
    if (this.mode === RandomizerMode.MAJOR_ITEMS) {
      itemFiller.fill(this.getEnergyTanks(vmrTanks), true);
    }

    // Fast fill the artifacts and expansions
    itemFiller.fill(this.getArtifacts(), true);
    itemFiller.fill(this.getExpansions(vmrTanks), true, true);
  }

  getWorld(): World {
    return this.world;
  }

  getMode(): string {
    return this.mode;
  }

  getLogic(): string {
    return this.logic;
  }

  getDifficulty(): string {
    return this.difficulty;
  }

  getSeed(): number {
    return this.seed;
  }

  createItemsFromMap(itemsMap: Map<string, number>): Item[] {
    const items: Item[] = [];
    itemsMap.forEach((value: number, key: string) => {
      for (let i = 0; i < value; i++) {
        items.push(Item.get(key));
      }
    });

    return items;
  }

  getArtifacts(): Array<Item> {
    const itemsMap: Map<string, number> = new Map<string, number>();
    itemsMap.set(PrimeItem.ARTIFACT_OF_TRUTH, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_STRENGTH, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_ELDER, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_WILD, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_LIFEGIVER, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_WARRIOR, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_CHOZO, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_NATURE, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_SUN, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_WORLD, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_SPIRIT, 1);
    itemsMap.set(PrimeItem.ARTIFACT_OF_NEWBORN, 1);

    return this.createItemsFromMap(itemsMap);
  }

  getEnergyTanks(vmrTanks: number): Array<Item> {
    const itemsMap: Map<string, number> = new Map<string, number>();
    const numTanks = this.logic === RandomizerLogic.NO_GLITCHES ? 14 : 14 - vmrTanks;

    itemsMap.set(PrimeItem.ENERGY_TANK, numTanks);

    return this.createItemsFromMap(itemsMap);
  }

  getPriorityItems(): Array<Item> {
    const itemsMap: Map<string, number> = new Map<string, number>();

    // Morph Ball should be among the first two items placed in no glitches logics
    // This is to keep the fill algorithm from erroring out when placing the upgrades
    if (this.logic === RandomizerLogic.NO_GLITCHES) {
      itemsMap.set(PrimeItem.MORPH_BALL, 1);
    }

    itemsMap.set(PrimeItem.MISSILE_LAUNCHER, 1);

    return this.createItemsFromMap(itemsMap);
  }

  getUpgrades(vmrTanks: number): Array<Item> {
    const itemsMap: Map<string, number> = new Map<string, number>();
    itemsMap.set(PrimeItem.MORPH_BALL_BOMB, 1);
    itemsMap.set(PrimeItem.VARIA_SUIT, 1);
    itemsMap.set(PrimeItem.GRAVITY_SUIT, 1);
    itemsMap.set(PrimeItem.PHAZON_SUIT, 1);
    itemsMap.set(PrimeItem.SPACE_JUMP_BOOTS, 1);
    itemsMap.set(PrimeItem.WAVE_BEAM, 1);
    itemsMap.set(PrimeItem.ICE_BEAM, 1);
    itemsMap.set(PrimeItem.PLASMA_BEAM, 1);
    itemsMap.set(PrimeItem.CHARGE_BEAM, 1);
    itemsMap.set(PrimeItem.POWER_BOMB, 1);
    itemsMap.set(PrimeItem.THERMAL_VISOR, 1);
    itemsMap.set(PrimeItem.XRAY_VISOR, 1);
    itemsMap.set(PrimeItem.BOOST_BALL, 1);
    itemsMap.set(PrimeItem.SPIDER_BALL, 1);
    itemsMap.set(PrimeItem.GRAPPLE_BEAM, 1);
    itemsMap.set(PrimeItem.SUPER_MISSILE, 1);
    itemsMap.set(PrimeItem.WAVEBUSTER, 1);
    itemsMap.set(PrimeItem.ICE_SPREADER, 1);
    itemsMap.set(PrimeItem.FLAMETHROWER, 1);

    // Allow VMR tanks and morph ball in upgrades pool for any glitched logics
    if (this.logic !== RandomizerLogic.NO_GLITCHES) {
      itemsMap.set(PrimeItem.MORPH_BALL, 1);
      itemsMap.set(PrimeItem.ENERGY_TANK, vmrTanks);
    }

    return this.createItemsFromMap(itemsMap);
  }

  getExpansions(vmrTanks: number): Array<Item> {
    const itemsMap: Map<string, number> = new Map<string, number>();

    itemsMap.set(PrimeItem.MISSILE_EXPANSION, 49);
    itemsMap.set(PrimeItem.POWER_BOMB_EXPANSION, 4);

    // If filling VMR tanks in upgrades pool, use remainder of tanks in this item pool
    if (this.mode !== RandomizerMode.MAJOR_ITEMS) {
      const numTanks = this.logic === RandomizerLogic.NO_GLITCHES ? 14 : 14 - vmrTanks;
      itemsMap.set(PrimeItem.ENERGY_TANK, numTanks);
    }
    
    return this.createItemsFromMap(itemsMap);
  }

  getRandomInt(min: number, max: number, rng: MersenneTwister = new MersenneTwister()) {
    return Math.floor(rng.random() * (max - min + 1)) + min;
  }
}
