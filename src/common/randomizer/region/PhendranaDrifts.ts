import {Region} from '../Region';
import {Location} from '../Location';
import {Item} from '../Item';
import {ItemCollection} from '../collection/ItemCollection';
import {PrimeItem} from '../enums/PrimeItem';

export class PhendranaDrifts extends Region {
  constructor() {
    super();
    this.name = 'Phendrana Drifts';
    this.locations = new Map<string, Location>([
      ['Phendrana Shorelines (Behind Ice)', new Location('Phendrana Shorelines (Behind Ice)', 'f7285979.mrea', 0x0002016E)],
      ['Phendrana Shorelines (Spider Track)', new Location('Phendrana Shorelines (Spider Track)', 'f7285979.mrea', 0x00020176)],
      ['Chozo Ice Temple', new Location('Chozo Ice Temple', '6655f51e.mrea', 0x00080257, true)],
      ['Ice Ruins West', new Location('Ice Ruins West', 'b33a0620.mrea', 0x000928ED)],
      ['Ice Ruins East (Behind Ice)', new Location('Ice Ruins East (Behind Ice)', 'dafcc26f.mrea', 0x000A00AB)],
      ['Ice Ruins East (Spider Track)', new Location('Ice Ruins East (Spider Track)', 'dafcc26f.mrea', 0x000A0191)],
      ['Chapel of the Elders', new Location('Chapel of the Elders', '40c548e9.mrea', 0x000E0058, true)],
      ['Ruined Courtyard', new Location('Ruined Courtyard', '1921876d.mrea', 0x000F022C, true)],
      ['Phendrana Canyon', new Location('Phendrana Canyon', 'a20a7455.mrea', 0x001000E1, true)],
      ['Quarantine Cave', new Location('Quarantine Cave', '70181194.mrea', 0x001801CA, true)],
      ['Research Lab Hydra', new Location('Research Lab Hydra', '43e4cc25.mrea', 0x00190513)],
      ['Quarantine Monitor', new Location('Quarantine Monitor', '2191a05d.mrea', 0x001B0011)],
      ['Observatory', new Location('Observatory', '3fb4a34e.mrea', 0x001E02F6, true)],
      ['Transport Access', new Location('Transport Access', 'd695b958.mrea', 0x01F00A5, true)],
      ['Control Tower', new Location('Control Tower', 'b3c33249.mrea', 0x002704CF, true)],
      ['Research Core', new Location('Research Core', 'a49b2544.mrea', 0x0428011C, true)],
      ['Frost Cave', new Location('Frost Cave', '4c6f7773.mrea', 0x00290187)],
      ['Research Lab Aether (Tank)', new Location('Research Lab Aether (Tank)', '21b4bff6.mrea', 0x003303E0, true)],
      ['Research Lab Aether (Morph Track)', new Location('Research Lab Aether (Morph Track)', '21b4bff6.mrea', 0x00330411)],
      ['Gravity Chamber (Underwater)', new Location('Gravity Chamber (Underwater)', '49175472.mrea', 0x0035001F, true)],
      ['Gravity Chamber (Grapple Ledge)', new Location('Gravity Chamber (Grapple Ledge)', '49175472.mrea', 0x0035012C)],
      ['Storage Cave', new Location('Storage Cave', 'f7c84340.mrea', 0x003600A9, true)],
      ['Security Cave', new Location('Security Cave', '3c9490e5.mrea', 0x00370019)]
    ]);
  }

  public initNoGlitches(): void {
    this.locations.get('Phendrana Shorelines (Behind Ice)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs() && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get('Phendrana Shorelines (Spider Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs() && items.canFireSuperMissiles() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SPIDER_BALL);
    };

    this.locations.get('Chozo Ice Temple').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get('Ice Ruins West').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs() && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get('Ice Ruins East (Behind Ice)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs() && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get('Ice Ruins East (Spider Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs() && items.has(PrimeItem.SPIDER_BALL);
    };

    this.locations.get('Chapel of the Elders').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs() && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };
    this.locations.get('Chapel of the Elders').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.WAVE_BEAM) && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.canLayBombs());
    };

    this.locations.get('Ruined Courtyard').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM);
    };

    this.locations.get('Phendrana Canyon').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqs();
    };
    // You'll softlock if you destroy the boxes, and don't have space jump or boost
    this.locations.get('Phendrana Canyon').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.BOOST_BALL);
    };

    this.locations.get('Quarantine Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqs() && items.canFireSuperMissiles() && items.has(PrimeItem.BOOST_BALL)
        && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.THERMAL_VISOR))
        || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItem.THERMAL_VISOR));
    };
    this.locations.get('Quarantine Cave').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.SPIDER_BALL) || items.has(PrimeItem.GRAPPLE_BEAM);
    };

    this.locations.get('Quarantine Monitor').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqs() && items.canFireSuperMissiles() && items.has(PrimeItem.BOOST_BALL)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.THERMAL_VISOR)
          && items.has(PrimeItem.GRAPPLE_BEAM))
        || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItem.THERMAL_VISOR) && items.has(PrimeItem.GRAPPLE_BEAM));
    };
    this.locations.get('Quarantine Monitor').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.has(PrimeItem.SPIDER_BALL) || items.has(PrimeItem.GRAPPLE_BEAM);
    };

    this.locations.get('Research Lab Hydra').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canFireSuperMissiles() && items.has(PrimeItem.THERMAL_VISOR)
        && ((items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
          || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItem.ICE_BEAM)));
    };

    this.locations.get('Observatory').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqs() && items.canLayBombs() && items.has(PrimeItem.ICE_BEAM));
    };

    this.locations.get('Control Tower').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM)
        && ((items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
          || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItem.THERMAL_VISOR) && items.has(PrimeItem.ICE_BEAM)));
    };

    this.locations.get('Research Lab Aether (Tank)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItem.THERMAL_VISOR) && items.has(PrimeItem.ICE_BEAM));
    };

    this.locations.get('Research Lab Aether (Morph Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItem.THERMAL_VISOR) && items.has(PrimeItem.ICE_BEAM));
    };

    this.locations.get('Research Core').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqs() && items.has(PrimeItem.ICE_BEAM));
    };
    this.locations.get('Research Core').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.THERMAL_VISOR) && items.has(PrimeItem.ICE_BEAM);
    };

    this.locations.get('Transport Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.THERMAL_VISOR) && items.has(PrimeItem.PLASMA_BEAM)
        && items.has(PrimeItem.ICE_BEAM)
        && (
          (items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPIDER_BALL))
          || (items.hasBackwardsPhendranaReqs())
        );
    };

    this.locations.get('Frost Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM)
        && ((items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqs());
    };

    this.locations.get('Storage Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM)
        && ((items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.THERMAL_VISOR))
          || items.hasBackwardsPhendranaReqs());
    };

    this.locations.get('Security Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM)
        && ((items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqs());
    };

    this.locations.get('Gravity Chamber (Underwater)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM)
        && ((items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqs());
    };
    this.locations.get('Gravity Chamber (Underwater)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined)
        items = new ItemCollection([...items.toArray(), item]);
      return items.has(PrimeItem.GRAVITY_SUIT) && (items.has(PrimeItem.THERMAL_VISOR) || items.hasBackwardsPhendranaReqs());
    };

    this.locations.get('Gravity Chamber (Grapple Ledge)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.GRAVITY_SUIT)
        && items.has(PrimeItem.GRAPPLE_BEAM)
        && ((items.hasPhendranaReqs() && items.has(PrimeItem.BOOST_BALL) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.THERMAL_VISOR))
          || items.hasBackwardsPhendranaReqs());
    };
  }

  public initMinorGlitches(): void {
    const minVMRTanks = 6;
    this.locations.get('Phendrana Shorelines (Behind Ice)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks)
        && (
          items.has(PrimeItem.PLASMA_BEAM)
          || (items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.canDoInfiniteSpeed())
        );
    };

    this.locations.get('Phendrana Shorelines (Spider Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.canFireSuperMissiles()
        && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.SPIDER_BALL);
    };

    this.locations.get('Chozo Ice Temple').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && (
          items.has(PrimeItem.PLASMA_BEAM) || (items.has(PrimeItem.WAVE_BEAM) && items.canDoInfiniteSpeed())
        );
    };

    this.locations.get('Ice Ruins West').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get('Ice Ruins East (Behind Ice)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.PLASMA_BEAM);
    };

    this.locations.get('Ice Ruins East (Spider Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPIDER_BALL);
    };

    this.locations.get('Chapel of the Elders').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };
    this.locations.get('Chapel of the Elders').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.has(PrimeItem.WAVE_BEAM) && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.canLayBombs());
    };

    this.locations.get('Ruined Courtyard').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.WAVE_BEAM)
        && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.BOOST_BALL));
    };

    this.locations.get('Phendrana Canyon').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.hasPhendranaReqsMinorGlitches(minVMRTanks);
    };
    // You'll softlock if you destroy the boxes, and don't have space jump or boost
    this.locations.get('Phendrana Canyon').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.BOOST_BALL);
    };

    this.locations.get('Quarantine Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.WAVE_BEAM)
        && items.canFireSuperMissiles())
        || (items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks));
    };
    this.locations.get('Quarantine Cave').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.has(PrimeItem.SPIDER_BALL) || items.has(PrimeItem.GRAPPLE_BEAM) || items.has(PrimeItem.SPACE_JUMP_BOOTS);
    };

    this.locations.get('Quarantine Monitor').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.canFireSuperMissiles() && items.has(PrimeItem.WAVE_BEAM)
          && items.has(PrimeItem.SPIDER_BALL) && (items.has(PrimeItem.SPACE_JUMP_BOOTS) || items.has(PrimeItem.GRAPPLE_BEAM)))
        || (items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks)
          && (items.has(PrimeItem.SPIDER_BALL) || items.has(PrimeItem.GRAPPLE_BEAM)));
    };

    this.locations.get('Research Lab Hydra').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canFireSuperMissiles()
        && (
          (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.WAVE_BEAM)
            && (items.has(PrimeItem.SPACE_JUMP_BOOTS)
              || items.has(PrimeItem.BOOST_BALL) || items.has(PrimeItem.SPIDER_BALL)))
          || (items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.ICE_BEAM))
        );
    };

    this.locations.get('Observatory').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
          && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.ICE_BEAM));
    };

    this.locations.get('Control Tower').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.BOOST_BALL)
          && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.ICE_BEAM));
    };

    this.locations.get('Research Lab Aether (Tank)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
          && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.ICE_BEAM));
    };

    this.locations.get('Research Lab Aether (Morph Track)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
          && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.ICE_BEAM));
    };

    this.locations.get('Research Core').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
          && items.has(PrimeItem.WAVE_BEAM))
        || (items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.ICE_BEAM));
    };

    this.locations.get('Transport Access').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.PLASMA_BEAM) && items.has(PrimeItem.ICE_BEAM)
        && (
          (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks)
        );
    };

    this.locations.get('Frost Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.GRAPPLE_BEAM)
        && (
          (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks)
        );
    };

    this.locations.get('Storage Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.PLASMA_BEAM)
        && (
          (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks)
        );
    };

    this.locations.get('Security Cave').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM)
        && (
          (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks)
        );
    };

    this.locations.get('Gravity Chamber (Underwater)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.has(PrimeItem.ICE_BEAM)
        && (
          (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks)
        );
    };
    this.locations.get('Gravity Chamber (Underwater)').canEscape = function (item: Item, items: ItemCollection): boolean {
      if (item !== undefined) {
        items = new ItemCollection([...items.toArray(), item]);
      }
      return items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        && (items.has(PrimeItem.THERMAL_VISOR) || items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks));
    };

    this.locations.get('Gravity Chamber (Grapple Ledge)').canFillItem = function (item: Item, items: ItemCollection): boolean {
      return items.canLayPowerBombs() && items.has(PrimeItem.ICE_BEAM)
        && (
          (items.hasPhendranaReqsMinorGlitches(minVMRTanks) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
            && items.has(PrimeItem.WAVE_BEAM))
          || items.hasBackwardsPhendranaReqsMinorGlitches(minVMRTanks)
        );
    };
  }
}
