import * as randomizerController from './controllers/randomizerController';
import * as saveSettingsController from './controllers/saveSettingsController';
import * as seedController from './controllers/seedController';

/**
 * Initializes and maintains the controllers used for this application.
 */
export function defineControllers() {
  return {
    randomizer: randomizerController.initialize(),
    save_settings: saveSettingsController.initialize(),
    seed: seedController.initialize()
  };
}
