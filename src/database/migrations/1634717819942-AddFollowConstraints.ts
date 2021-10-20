import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFollowConstraints1634717819942 implements MigrationInterface {
    name = `AddFollowConstraints1634717819942`

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66"
        `)
        await queryRunner.query(`
            ALTER TABLE "follows" DROP CONSTRAINT "FK_1984b177379388946c21afcdaa9"
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ALTER COLUMN "follower_id"
            SET NOT NULL
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ALTER COLUMN "followee_id"
            SET NOT NULL
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ADD CONSTRAINT "UQ_f9294bbb1517cfd99f06f534fe7" UNIQUE ("follower_id", "followee_id")
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
            ALTER TABLE "follows" DROP CONSTRAINT "UQ_f9294bbb1517cfd99f06f534fe7"
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ALTER COLUMN "followee_id" DROP NOT NULL
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ALTER COLUMN "follower_id" DROP NOT NULL
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_1984b177379388946c21afcdaa9" FOREIGN KEY ("followee_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
        await queryRunner.query(`
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }
}
