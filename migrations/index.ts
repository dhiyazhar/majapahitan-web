import * as migration_20260909_050056 from './20260909_050056';
import * as migration_20261006_041410_programs_schedule_registration from './20261006_041410_programs_schedule_registration';

export const migrations = [
  {
    up: migration_20260909_050056.up,
    down: migration_20260909_050056.down,
    name: '20260909_050056',
  },
  {
    up: migration_20261006_041410_programs_schedule_registration.up,
    down: migration_20261006_041410_programs_schedule_registration.down,
    name: '20261006_041410_programs_schedule_registration'
  },
];
