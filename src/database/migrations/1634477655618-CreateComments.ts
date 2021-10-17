import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateComments1634477655618 implements MigrationInterface {
    name = `CreateComments1634477655618`

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" SERIAL NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                "delete_date" TIMESTAMP,
                "content" character varying(140) NOT NULL,
                "account_id" integer,
                "tweet_id" integer,
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_53212c33f873f031f88ef8bbe29" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_cdca270ba1f5105a09e64562fef" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_cdca270ba1f5105a09e64562fef"
        `)
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_53212c33f873f031f88ef8bbe29"
        `)
        await queryRunner.query(`
            DROP TABLE "comments"
        `)
    }
}
