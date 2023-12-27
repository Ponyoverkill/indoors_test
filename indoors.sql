BEGIN;
--
-- Create model ContentType
--
CREATE TABLE "django_content_type" ("id" serial NOT NULL PRIMARY KEY, "name" varchar(100) NOT NULL, "app_label" varchar(100) NOT NULL, "model" varchar(100) NOT NULL);
--
-- Alter unique_together for contenttype (1 constraint(s))
--
ALTER TABLE "django_content_type" ADD CONSTRAINT "django_content_type_app_label_model_76bd3d3b_uniq" UNIQUE ("app_label", "model");
COMMIT;


BEGIN;
--
-- Change Meta options on contenttype
--
--
-- Alter field name on contenttype
--
ALTER TABLE "django_content_type" ALTER COLUMN "name" DROP NOT NULL;
--
-- MIGRATION NOW PERFORMS OPERATION THAT CANNOT BE WRITTEN AS SQL:
-- Raw Python operation
--
--
-- Remove field name from contenttype
--
ALTER TABLE "django_content_type" DROP COLUMN "name" CASCADE;
COMMIT;


BEGIN;
--
-- Create model Permission
--
CREATE TABLE "auth_permission" ("id" serial NOT NULL PRIMARY KEY, "name" varchar(50) NOT NULL, "content_type_id" integer NOT NULL, "codename" varchar(100) NOT NULL);
--
-- Create model Group
--
CREATE TABLE "auth_group" ("id" serial NOT NULL PRIMARY KEY, "name" varchar(80) NOT NULL UNIQUE);
CREATE TABLE "auth_group_permissions" ("id" bigserial NOT NULL PRIMARY KEY, "group_id" integer NOT NULL, "permission_id" integer NOT NULL);
--
-- Create model User
--
CREATE TABLE "auth_user" ("id" serial NOT NULL PRIMARY KEY, "password" varchar(128) NOT NULL, "last_login" timestamp with time zone NOT NULL, "is_superuser" boolean NOT NULL, "username" varchar(30) NOT NULL UNIQUE, "first_name" varchar(30) NOT NULL, "last_name" varchar(30) NOT NULL, "email" varchar(75) NOT NULL, "is_staff" boolean NOT NULL, "is_active" boolean NOT NULL, "date_joined" timestamp with time zone NOT NULL);
CREATE TABLE "auth_user_groups" ("id" bigserial NOT NULL PRIMARY KEY, "user_id" integer NOT NULL, "group_id" integer NOT NULL);
CREATE TABLE "auth_user_user_permissions" ("id" bigserial NOT NULL PRIMARY KEY, "user_id" integer NOT NULL, "permission_id" integer NOT NULL);
ALTER TABLE "auth_permission" ADD CONSTRAINT "auth_permission_content_type_id_codename_01ab375a_uniq" UNIQUE ("content_type_id", "codename");
ALTER TABLE "auth_permission" ADD CONSTRAINT "auth_permission_content_type_id_2f476e4b_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission" ("content_type_id");
CREATE INDEX "auth_group_name_a6ea08ec_like" ON "auth_group" ("name" varchar_pattern_ops);
ALTER TABLE "auth_group_permissions" ADD CONSTRAINT "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" UNIQUE ("group_id", "permission_id");
ALTER TABLE "auth_group_permissions" ADD CONSTRAINT "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "auth_group_permissions" ADD CONSTRAINT "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" ("group_id");
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" ("permission_id");
CREATE INDEX "auth_user_username_6821ab7c_like" ON "auth_user" ("username" varchar_pattern_ops);
ALTER TABLE "auth_user_groups" ADD CONSTRAINT "auth_user_groups_user_id_group_id_94350c0c_uniq" UNIQUE ("user_id", "group_id");
ALTER TABLE "auth_user_groups" ADD CONSTRAINT "auth_user_groups_user_id_6a12ed8b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "auth_user_groups" ADD CONSTRAINT "auth_user_groups_group_id_97559544_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups" ("user_id");
CREATE INDEX "auth_user_groups_group_id_97559544" ON "auth_user_groups" ("group_id");
ALTER TABLE "auth_user_user_permissions" ADD CONSTRAINT "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" UNIQUE ("user_id", "permission_id");
ALTER TABLE "auth_user_user_permissions" ADD CONSTRAINT "auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "auth_user_user_permissions" ADD CONSTRAINT "auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions" ("user_id");
CREATE INDEX "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions" ("permission_id");
COMMIT;

BEGIN;
--
-- Alter field name on permission
--
ALTER TABLE "auth_permission" ALTER COLUMN "name" TYPE varchar(255);
COMMIT;


BEGIN;
--
-- Alter field email on user
--
ALTER TABLE "auth_user" ALTER COLUMN "email" TYPE varchar(254);
COMMIT;

BEGIN;
--
-- Alter field last_login on user
--
ALTER TABLE "auth_user" ALTER COLUMN "last_login" DROP NOT NULL;
COMMIT;

BEGIN;
--
-- Alter field username on user
--
ALTER TABLE "auth_user" ALTER COLUMN "username" TYPE varchar(150);
COMMIT;

BEGIN;
--
-- Alter field last_name on user
--
ALTER TABLE "auth_user" ALTER COLUMN "last_name" TYPE varchar(150);
COMMIT;

BEGIN;
--
-- Alter field name on group
--
ALTER TABLE "auth_group" ALTER COLUMN "name" TYPE varchar(150);
COMMIT;


BEGIN;
--
-- Alter field first_name on user
--
ALTER TABLE "auth_user" ALTER COLUMN "first_name" TYPE varchar(150);
COMMIT;


BEGIN;
--
-- Create model LogEntry
--
CREATE TABLE "django_admin_log" ("id" serial NOT NULL PRIMARY KEY, "action_time" timestamp with time zone NOT NULL, "object_id" text NULL, "object_repr" varchar(200) NOT NULL, "action_flag" smallint NOT NULL CHECK ("action_flag" >= 0), "change_message" text NOT NULL, "content_type_id" integer NULL, "user_id" integer NOT NULL);
ALTER TABLE "django_admin_log" ADD CONSTRAINT "django_admin_log_content_type_id_c4bce8eb_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "django_admin_log" ADD CONSTRAINT "django_admin_log_user_id_c564eba6_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" ("content_type_id");
CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log" ("user_id");
COMMIT;


BEGIN;
--
-- Create model Room
--
CREATE TABLE "chat_room" ("id" bigserial NOT NULL PRIMARY KEY, "name" varchar(255) NOT NULL UNIQUE, "first_user_id" integer NOT NULL, "second_user_id" integer NOT NULL);
--
-- Create model Message
--
CREATE TABLE "chat_message" ("id" bigserial NOT NULL PRIMARY KEY, "text" text NOT NULL, "created_at" timestamp with time zone NOT NULL, "room_id" bigint NOT NULL, "user_id" integer NOT NULL);
ALTER TABLE "chat_room" ADD CONSTRAINT "chat_room_first_user_id_decefd81_fk_auth_user_id" FOREIGN KEY ("first_user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "chat_room" ADD CONSTRAINT "chat_room_second_user_id_3480cc49_fk_auth_user_id" FOREIGN KEY ("second_user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "chat_room_name_b29f2bdd_like" ON "chat_room" ("name" varchar_pattern_ops);
CREATE INDEX "chat_room_first_user_id_decefd81" ON "chat_room" ("first_user_id");
CREATE INDEX "chat_room_second_user_id_3480cc49" ON "chat_room" ("second_user_id");
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_room_id_5e7d8d78_fk_chat_room_id" FOREIGN KEY ("room_id") REFERENCES "chat_room" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_user_id_a47c01bb_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "chat_message_room_id_5e7d8d78" ON "chat_message" ("room_id");
CREATE INDEX "chat_message_user_id_a47c01bb" ON "chat_message" ("user_id");
COMMIT;

BEGIN;
--
-- Create model Breed
--
CREATE TABLE "kittens_breed" ("id" bigserial NOT NULL PRIMARY KEY, "name" varchar(255) NOT NULL);
--
-- Create model WoolType
--
CREATE TABLE "kittens_wooltype" ("id" bigserial NOT NULL PRIMARY KEY, "name" varchar(255) NOT NULL);
--
-- Create model Kitten
--
CREATE TABLE "kittens_kitten" ("id" bigserial NOT NULL PRIMARY KEY, "name" varchar(255) NOT NULL, "birth_date" date NOT NULL, "info" text NOT NULL, "photo" varchar(512) NOT NULL, "breed_id" bigint NULL, "owner_id" integer NOT NULL, "wool_type_id" bigint NULL);
ALTER TABLE "kittens_kitten" ADD CONSTRAINT "kittens_kitten_breed_id_1b3f29b1_fk_kittens_breed_id" FOREIGN KEY ("breed_id") REFERENCES "kittens_breed" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "kittens_kitten" ADD CONSTRAINT "kittens_kitten_owner_id_e3be4cba_fk_auth_user_id" FOREIGN KEY ("owner_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "kittens_kitten" ADD CONSTRAINT "kittens_kitten_wool_type_id_d5345265_fk_kittens_wooltype_id" FOREIGN KEY ("wool_type_id") REFERENCES "kittens_wooltype" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "kittens_kitten_breed_id_1b3f29b1" ON "kittens_kitten" ("breed_id");
CREATE INDEX "kittens_kitten_owner_id_e3be4cba" ON "kittens_kitten" ("owner_id");
CREATE INDEX "kittens_kitten_wool_type_id_d5345265" ON "kittens_kitten" ("wool_type_id");
COMMIT;

BEGIN;

INSERT INTO kittens_breed VALUES
(DEFAULT, 'Абиссинская'),
(DEFAULT, 'Австралийский мист'),
(DEFAULT, 'Азиатская (табби)'),
(DEFAULT, 'Американский бобтейл длинношёрстный'),
(DEFAULT, 'Американский бобтейл короткошёрстный'),
(DEFAULT, 'Американская жесткошёрстная'),
(DEFAULT, 'Американский кёрл длинношёрстный'),
(DEFAULT, 'Американский кёрл короткошёрстный'),
(DEFAULT, 'Американская короткошёрстная'),
(DEFAULT, 'Анатолийская'),
(DEFAULT, 'Аравийский мау'),
(DEFAULT, 'Балинезийская (Балинез, балийская)'),
(DEFAULT, 'Бенгальская'),
(DEFAULT, 'Бомбейская'),
(DEFAULT, 'Бразильская короткошёрстная'),
(DEFAULT, 'Британская длинношёрстная'),
(DEFAULT, 'Британская короткошёрстная'),
(DEFAULT, 'Бурма (Бурманская)'),
(DEFAULT, 'Бурмилла длинношёрстный'),
(DEFAULT, 'Бурмилла короткошёрстный'),
(DEFAULT, 'Гавана'),
(DEFAULT, 'Гималайская кошка'),
(DEFAULT, 'Девон рекс'),
(DEFAULT, 'Домашняя'),
(DEFAULT, 'Донской сфинкс'),
(DEFAULT, 'Кельтская (Европейская короткошёрстная)'),
(DEFAULT, 'Египетская мау'),
(DEFAULT, 'Йорк'),
(DEFAULT, 'Калифорнийская сияющая'),
(DEFAULT, 'Канаани'),
(DEFAULT, 'Карельский бобтейл длинношёрстный'),
(DEFAULT, 'Карельский бобтейл короткошёрстный'),
(DEFAULT, 'Кимрик'),
(DEFAULT, 'Корат'),
(DEFAULT, 'Корниш рекс'),
(DEFAULT, 'Курильский бобтейл длинношёрстный'),
(DEFAULT, 'Курильский бобтейл короткошёрстный'),
(DEFAULT, 'Лаперм длинношёрстный'),
(DEFAULT, 'Лаперм короткошёрстный'),
(DEFAULT, 'Манчкин длинношёрстная'),
(DEFAULT, 'Манчкин короткошёрстная'),
(DEFAULT, 'Мейн-кун'),
(DEFAULT, 'Меконгский бобтейл'),
(DEFAULT, 'Минскин'),
(DEFAULT, 'Мэнкс (Мэнская кошка)'),
(DEFAULT, 'Наполеон'),
(DEFAULT, 'Немецкий рекс'),
(DEFAULT, 'Нибелунг'),
(DEFAULT, 'Норвежская лесная'),
(DEFAULT, 'Орегон-рекс'),
(DEFAULT, 'Ориентальная длинношёрстная'),
(DEFAULT, 'Ориентальная короткошёрстная'),
(DEFAULT, 'Охос азулес'),
(DEFAULT, 'Охос азулес длинношёрстный'),
(DEFAULT, 'Оцикет'),
(DEFAULT, 'Персидская (Колорпойнт)'),
(DEFAULT, 'Колорпойнт'),
(DEFAULT, 'Петерболд'),
(DEFAULT, 'Пиксибоб длинношёрстный'),
(DEFAULT, 'Пиксибоб короткошёрстный'),
(DEFAULT, 'Рагамаффин'),
(DEFAULT, 'Русская голубая'),
(DEFAULT, 'Рэгдолл'),
(DEFAULT, 'Саванна'),
(DEFAULT, 'Священная бирманская'),
(DEFAULT, 'Сейшельская длинношёрстная'),
(DEFAULT, 'Сейшельская короткошёрстная'),
(DEFAULT, 'Селкирк рекс длинношёрстный'),
(DEFAULT, 'Селкирк рекс короткошёрстный'),
(DEFAULT, 'Серенгети'),
(DEFAULT, 'Сиамская'),
(DEFAULT, 'Сибирская'),
(DEFAULT, 'Скиф-тай-дон'),
(DEFAULT, 'Невская маскарадная'),
(DEFAULT, 'Сингапурская'),
(DEFAULT, 'Скоттиш фолд'),
(DEFAULT, 'Скоттиш страйт'),
(DEFAULT, 'Сноу-Шу'),
(DEFAULT, 'Сококе'),
(DEFAULT, 'Сомали'),
(DEFAULT, 'Сфинкс (канадский)'),
(DEFAULT, 'Тайская'),
(DEFAULT, 'Шантильи-тиффани'),
(DEFAULT, 'Тойгер'),
(DEFAULT, 'Тонкинская'),
(DEFAULT, 'Турецкая ангора'),
(DEFAULT, 'Турецкий ван'),
(DEFAULT, 'Украинский левкой'),
(DEFAULT, 'Уральский рекс длинношёрстный'),
(DEFAULT, 'Уральский рекс короткошёрстный'),
(DEFAULT, 'Форин Вайт'),
(DEFAULT, 'Хайленд фолд'),
(DEFAULT, 'Цейлонская'),
(DEFAULT, 'Хауси'),
(DEFAULT, 'Шартрез'),
(DEFAULT, 'Эгейская'),
(DEFAULT, 'Экзотическая'),
(DEFAULT, 'Яванез (Яванская кошка)'),
(DEFAULT, 'Японский бобтейл длинношёрстный'),
(DEFAULT, 'Японский бобтейл короткошёрстный');
COMMIT;

BEGIN;

INSERT INTO kittens_wooltype VALUES
(DEFAULT, 'длинношёрстные/полудлинношёрстные'),
(DEFAULT, 'короткошёрстные'),
(DEFAULT, 'с вьющейся шерстью'),
(DEFAULT, 'жёсткошёрстные'),
(DEFAULT, 'бесшёрстные');
COMMIT;
