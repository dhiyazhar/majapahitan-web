import * as migration_20261124_025307_initial from './20261124_025307_initial';

export const migrations = [
  {
    up: migration_20261124_025307_initial.up,
    down: migration_20261124_025307_initial.down,
    name: '20261124_025307_initial'
  },
];
