import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTweets1634400407978 implements MigrationInterface {
    name = `CreateTweets1634400407978`

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tweets" (
                "id" SERIAL NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                "delete_date" TIMESTAMP,
                "content" character varying(140) NOT NULL,
                "account_id" integer,
                CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            ALTER TABLE "tweets"
            ADD CONSTRAINT "FK_ec8b4f7a6c2d63991164d0605a2" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets" DROP CONSTRAINT "FK_ec8b4f7a6c2d63991164d0605a2"
        `)
        await queryRunner.query(`
            DROP TABLE "tweets"
        `)
    }
}
