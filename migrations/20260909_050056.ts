import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_berita_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_programs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_programs_program_type" AS ENUM('Pameran Virtual', 'Pameran Karya', 'Program Edukasi', 'Pertunjukan Budaya', 'Workshop & Pelatihan', 'Seminar & Simposium');
  CREATE TYPE "public"."enum_publikasi_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_publikasi_type_badge" AS ENUM('Jurnal Ilmiah Nasional', 'Jurnal Terakreditasi', 'Jurnal Internasional', 'Prosiding Simposium', 'Buku & Monograf', 'Laporan Arkeologis');
  CREATE TYPE "public"."enum_publikasi_sinta_badge" AS ENUM('SINTA 1', 'SINTA 2', 'SINTA 3', 'SINTA 4', 'Scopus', 'Non-SINTA');
  CREATE TYPE "public"."enum_situs_status" AS ENUM('Terdokumentasi', 'Pemindaian 3D', 'Dalam Proses');
  CREATE TYPE "public"."enum_artefak_category" AS ENUM('Prasasti & Inskripsi', 'Arca & Patung', 'Keramik & Gerabah', 'Perhiasan & Logam', 'Naskah & Sastra');
  CREATE TYPE "public"."enum_karya_museum_type" AS ENUM('otentik', 'kontemporer');
  CREATE TYPE "public"."enum_karya_museum_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_karya_publik_category" AS ENUM('seni-rupa', 'desain-ilustrasi', 'fotografi', 'model-3d', 'riset-visual', 'lainnya');
  CREATE TYPE "public"."enum_karya_publik_status" AS ENUM('pending', 'published', 'rejected');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'staff');
  CREATE TYPE "public"."enum_site_settings_socials_icon" AS ENUM('instagram', 'youtube', 'twitter', 'facebook');
  CREATE TABLE "berita" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"cover_image_id" integer,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"status" "enum_berita_status" DEFAULT 'published',
  	"published_at" timestamp(3) with time zone,
  	"author" varchar DEFAULT 'PUI Seni Budaya Majapahitan',
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"cover_image_id" integer,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"status" "enum_programs_status" DEFAULT 'published',
  	"program_type" "enum_programs_program_type" DEFAULT 'Pameran Virtual' NOT NULL,
  	"event_date" timestamp(3) with time zone,
  	"event_end_date" timestamp(3) with time zone,
  	"location" varchar DEFAULT 'Museum Virtual (Daring)',
  	"cta_label" varchar DEFAULT 'Masuk Galeri',
  	"cta_url" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "publikasi_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "publikasi_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL
  );
  
  CREATE TABLE "publikasi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"abstract" varchar NOT NULL,
  	"status" "enum_publikasi_status" DEFAULT 'published',
  	"year" varchar NOT NULL,
  	"publication_name" varchar NOT NULL,
  	"volume" varchar,
  	"issue" varchar,
  	"pages" varchar,
  	"type_badge" "enum_publikasi_type_badge" DEFAULT 'Jurnal Ilmiah Nasional' NOT NULL,
  	"sinta_badge" "enum_publikasi_sinta_badge" DEFAULT 'SINTA 2',
  	"doi" varchar,
  	"external_url" varchar DEFAULT 'https://ejournal.unesa.ac.id' NOT NULL,
  	"pdf_url" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "situs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"location" varchar DEFAULT 'Trowulan, Mojokerto' NOT NULL,
  	"era" varchar DEFAULT 'Abad ke-14 Masehi' NOT NULL,
  	"status" "enum_situs_status" DEFAULT 'Terdokumentasi',
  	"image_id" integer,
  	"description" varchar NOT NULL,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "artefak" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_artefak_category" NOT NULL,
  	"era" varchar DEFAULT 'Abad ke-14 Masehi' NOT NULL,
  	"material" varchar DEFAULT 'Batu Andesit' NOT NULL,
  	"image_id" integer,
  	"description" varchar NOT NULL,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "karya_museum" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_karya_museum_type" NOT NULL,
  	"image_id" integer NOT NULL,
  	"creator" varchar,
  	"era" varchar,
  	"material" varchar,
  	"description" varchar,
  	"status" "enum_karya_museum_status" DEFAULT 'published',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "karya_publik" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"contributor_name" varchar NOT NULL,
  	"contributor_email" varchar NOT NULL,
  	"contributor_affiliation" varchar,
  	"category" "enum_karya_publik_category" NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"status" "enum_karya_publik_status" DEFAULT 'pending',
  	"moderation_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"content" jsonb,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'admin' NOT NULL,
  	"title" varchar,
  	"avatar_id" integer,
  	"bio" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"berita_id" integer,
  	"programs_id" integer,
  	"publikasi_id" integer,
  	"situs_id" integer,
  	"artefak_id" integer,
  	"karya_museum_id" integer,
  	"karya_publik_id" integer,
  	"pages_id" integer,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"handle" varchar NOT NULL,
  	"icon" "enum_site_settings_socials_icon" DEFAULT 'instagram' NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"org" varchar DEFAULT 'PUI-PT Seni Budaya Majapahitan' NOT NULL,
  	"university" varchar DEFAULT 'Universitas Negeri Surabaya' NOT NULL,
  	"operating_hours" varchar DEFAULT 'Senin s/d Jum''at | 08.00-16.00 WIB',
  	"office" varchar DEFAULT 'Gedung Lab Anti Doping Lt.4',
  	"email" varchar DEFAULT 'pusenibud@unesa.ac.id',
  	"google_maps_url" varchar DEFAULT 'https://maps.app.goo.gl/GqpisKzQERkrwvKz9',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_beranda_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"image_id" integer,
  	"primary_label" varchar DEFAULT 'Mulai Jelajah Virtual',
  	"primary_href" varchar DEFAULT '/galeri/3d',
  	"secondary_label" varchar DEFAULT 'Lihat Koleksi',
  	"secondary_href" varchar DEFAULT '/koleksi'
  );
  
  CREATE TABLE "page_beranda" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tentang_eyebrow" varchar DEFAULT 'Tentang Museum',
  	"tentang_title" varchar DEFAULT 'Mengenal Museum Virtual Majapahitan',
  	"tentang_body" varchar DEFAULT 'Museum Virtual Majapahitan adalah inisiatif Pusat Unggulan IPTEK Seni Budaya Majapahitan (PUISBM) Universitas Negeri Surabaya untuk melestarikan, mendokumentasikan, dan mempublikasikan warisan budaya Majapahit dalam bentuk digital yang dapat diakses oleh seluruh dunia.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_tentang_misi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar NOT NULL
  );
  
  CREATE TABLE "page_tentang_sejarah_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "page_tentang" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Mengenal Museum Virtual Majapahitan',
  	"hero_subtitle" varchar DEFAULT 'Pusat konservasi digital dan ruang apresiasi warisan kebudayaan Kerajaan Majapahit dalam kemasan teknologi modern.',
  	"visi" varchar DEFAULT 'Menjadi pusat konservasi digital dan rujukan utama pelestarian seni budaya Majapahit berkelas dunia yang memadukan keilmuan akademis dengan apresiasi publik.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_konservasi_pengantar_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "page_konservasi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Melestarikan Warisan Peradaban Majapahit',
  	"hero_subtitle" varchar DEFAULT 'Dokumentasi, konservasi, dan digitalisasi situs bersejarah serta artefak peninggalan Kerajaan Majapahit oleh PUI Seni Budaya Majapahitan, Universitas Negeri Surabaya.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "berita" ADD CONSTRAINT "berita_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publikasi_authors" ADD CONSTRAINT "publikasi_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publikasi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publikasi_keywords" ADD CONSTRAINT "publikasi_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publikasi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "situs" ADD CONSTRAINT "situs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "artefak" ADD CONSTRAINT "artefak_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "karya_museum" ADD CONSTRAINT "karya_museum_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "karya_publik" ADD CONSTRAINT "karya_publik_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_berita_fk" FOREIGN KEY ("berita_id") REFERENCES "public"."berita"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publikasi_fk" FOREIGN KEY ("publikasi_id") REFERENCES "public"."publikasi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_situs_fk" FOREIGN KEY ("situs_id") REFERENCES "public"."situs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_artefak_fk" FOREIGN KEY ("artefak_id") REFERENCES "public"."artefak"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_karya_museum_fk" FOREIGN KEY ("karya_museum_id") REFERENCES "public"."karya_museum"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_karya_publik_fk" FOREIGN KEY ("karya_publik_id") REFERENCES "public"."karya_publik"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items_children" ADD CONSTRAINT "navigation_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_beranda_hero_slides" ADD CONSTRAINT "page_beranda_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_beranda_hero_slides" ADD CONSTRAINT "page_beranda_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_beranda"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_tentang_misi" ADD CONSTRAINT "page_tentang_misi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_tentang"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_tentang_sejarah_paragraphs" ADD CONSTRAINT "page_tentang_sejarah_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_tentang"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_konservasi_pengantar_paragraphs" ADD CONSTRAINT "page_konservasi_pengantar_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_konservasi"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "berita_cover_image_idx" ON "berita" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "berita_slug_idx" ON "berita" USING btree ("slug");
  CREATE INDEX "berita_updated_at_idx" ON "berita" USING btree ("updated_at");
  CREATE INDEX "berita_created_at_idx" ON "berita" USING btree ("created_at");
  CREATE INDEX "programs_cover_image_idx" ON "programs" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "programs_slug_idx" ON "programs" USING btree ("slug");
  CREATE INDEX "programs_updated_at_idx" ON "programs" USING btree ("updated_at");
  CREATE INDEX "programs_created_at_idx" ON "programs" USING btree ("created_at");
  CREATE INDEX "publikasi_authors_order_idx" ON "publikasi_authors" USING btree ("_order");
  CREATE INDEX "publikasi_authors_parent_id_idx" ON "publikasi_authors" USING btree ("_parent_id");
  CREATE INDEX "publikasi_keywords_order_idx" ON "publikasi_keywords" USING btree ("_order");
  CREATE INDEX "publikasi_keywords_parent_id_idx" ON "publikasi_keywords" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "publikasi_slug_idx" ON "publikasi" USING btree ("slug");
  CREATE INDEX "publikasi_updated_at_idx" ON "publikasi" USING btree ("updated_at");
  CREATE INDEX "publikasi_created_at_idx" ON "publikasi" USING btree ("created_at");
  CREATE UNIQUE INDEX "situs_slug_idx" ON "situs" USING btree ("slug");
  CREATE INDEX "situs_image_idx" ON "situs" USING btree ("image_id");
  CREATE INDEX "situs_updated_at_idx" ON "situs" USING btree ("updated_at");
  CREATE INDEX "situs_created_at_idx" ON "situs" USING btree ("created_at");
  CREATE UNIQUE INDEX "artefak_slug_idx" ON "artefak" USING btree ("slug");
  CREATE INDEX "artefak_image_idx" ON "artefak" USING btree ("image_id");
  CREATE INDEX "artefak_updated_at_idx" ON "artefak" USING btree ("updated_at");
  CREATE INDEX "artefak_created_at_idx" ON "artefak" USING btree ("created_at");
  CREATE UNIQUE INDEX "karya_museum_slug_idx" ON "karya_museum" USING btree ("slug");
  CREATE INDEX "karya_museum_image_idx" ON "karya_museum" USING btree ("image_id");
  CREATE INDEX "karya_museum_updated_at_idx" ON "karya_museum" USING btree ("updated_at");
  CREATE INDEX "karya_museum_created_at_idx" ON "karya_museum" USING btree ("created_at");
  CREATE INDEX "karya_publik_image_idx" ON "karya_publik" USING btree ("image_id");
  CREATE INDEX "karya_publik_updated_at_idx" ON "karya_publik" USING btree ("updated_at");
  CREATE INDEX "karya_publik_created_at_idx" ON "karya_publik" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_berita_id_idx" ON "payload_locked_documents_rels" USING btree ("berita_id");
  CREATE INDEX "payload_locked_documents_rels_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("programs_id");
  CREATE INDEX "payload_locked_documents_rels_publikasi_id_idx" ON "payload_locked_documents_rels" USING btree ("publikasi_id");
  CREATE INDEX "payload_locked_documents_rels_situs_id_idx" ON "payload_locked_documents_rels" USING btree ("situs_id");
  CREATE INDEX "payload_locked_documents_rels_artefak_id_idx" ON "payload_locked_documents_rels" USING btree ("artefak_id");
  CREATE INDEX "payload_locked_documents_rels_karya_museum_id_idx" ON "payload_locked_documents_rels" USING btree ("karya_museum_id");
  CREATE INDEX "payload_locked_documents_rels_karya_publik_id_idx" ON "payload_locked_documents_rels" USING btree ("karya_publik_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_items_children_order_idx" ON "navigation_items_children" USING btree ("_order");
  CREATE INDEX "navigation_items_children_parent_id_idx" ON "navigation_items_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "page_beranda_hero_slides_order_idx" ON "page_beranda_hero_slides" USING btree ("_order");
  CREATE INDEX "page_beranda_hero_slides_parent_id_idx" ON "page_beranda_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "page_beranda_hero_slides_image_idx" ON "page_beranda_hero_slides" USING btree ("image_id");
  CREATE INDEX "page_tentang_misi_order_idx" ON "page_tentang_misi" USING btree ("_order");
  CREATE INDEX "page_tentang_misi_parent_id_idx" ON "page_tentang_misi" USING btree ("_parent_id");
  CREATE INDEX "page_tentang_sejarah_paragraphs_order_idx" ON "page_tentang_sejarah_paragraphs" USING btree ("_order");
  CREATE INDEX "page_tentang_sejarah_paragraphs_parent_id_idx" ON "page_tentang_sejarah_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "page_konservasi_pengantar_paragraphs_order_idx" ON "page_konservasi_pengantar_paragraphs" USING btree ("_order");
  CREATE INDEX "page_konservasi_pengantar_paragraphs_parent_id_idx" ON "page_konservasi_pengantar_paragraphs" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "berita" CASCADE;
  DROP TABLE "programs" CASCADE;
  DROP TABLE "publikasi_authors" CASCADE;
  DROP TABLE "publikasi_keywords" CASCADE;
  DROP TABLE "publikasi" CASCADE;
  DROP TABLE "situs" CASCADE;
  DROP TABLE "artefak" CASCADE;
  DROP TABLE "karya_museum" CASCADE;
  DROP TABLE "karya_publik" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_items_children" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "page_beranda_hero_slides" CASCADE;
  DROP TABLE "page_beranda" CASCADE;
  DROP TABLE "page_tentang_misi" CASCADE;
  DROP TABLE "page_tentang_sejarah_paragraphs" CASCADE;
  DROP TABLE "page_tentang" CASCADE;
  DROP TABLE "page_konservasi_pengantar_paragraphs" CASCADE;
  DROP TABLE "page_konservasi" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_berita_status";
  DROP TYPE "public"."enum_programs_status";
  DROP TYPE "public"."enum_programs_program_type";
  DROP TYPE "public"."enum_publikasi_status";
  DROP TYPE "public"."enum_publikasi_type_badge";
  DROP TYPE "public"."enum_publikasi_sinta_badge";
  DROP TYPE "public"."enum_situs_status";
  DROP TYPE "public"."enum_artefak_category";
  DROP TYPE "public"."enum_karya_museum_type";
  DROP TYPE "public"."enum_karya_museum_status";
  DROP TYPE "public"."enum_karya_publik_category";
  DROP TYPE "public"."enum_karya_publik_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_site_settings_socials_icon";`)
}
