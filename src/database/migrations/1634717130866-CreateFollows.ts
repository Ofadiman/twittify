import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFollows1634717130866 implements MigrationInterface {
    name = `CreateFollows1634717130866`

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "follows" (
                "id" SERIAL NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                "delete_date" TIMESTAMP,
                "follower_id" integer,
                "followee_id" integer,
                CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id")
            )
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_1984b177379388946c21afcdaa9" FOREIGN KEY ("followee_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "follows" DROP CONSTRAINT "FK_1984b177379388946c21afcdaa9"
        `)
        await queryRunner.query(`
            ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66"
        `)
        await queryRunner.query(`
            DROP TABLE "follows"
        `)
    }
}
