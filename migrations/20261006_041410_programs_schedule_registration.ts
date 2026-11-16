import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "programs" ALTER COLUMN "cta_label" DROP DEFAULT;
  ALTER TABLE "programs" ADD COLUMN "registration_url" varchar;
  ALTER TABLE "programs" ADD COLUMN "registration_deadline" timestamp(3) with time zone;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "programs" ALTER COLUMN "cta_label" SET DEFAULT 'Masuk Galeri';
  ALTER TABLE "programs" DROP COLUMN "registration_url";
  ALTER TABLE "programs" DROP COLUMN "registration_deadline";`)
}
