import * as migration_20260906_102911 from './20260906_102911';

export const migrations = [
  {
    up: migration_20260906_102911.up,
    down: migration_20260906_102911.down,
    name: '20260906_102911'
  },
];
