import * as migration_20260909_050056 from './20260909_050056';

export const migrations = [
  {
    up: migration_20260909_050056.up,
    down: migration_20260909_050056.down,
    name: '20260909_050056'
  },
];
