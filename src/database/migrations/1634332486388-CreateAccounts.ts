import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAccounts1634332486388 implements MigrationInterface {
    name = `CreateAccounts1634332486388`

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "accounts" (
                "id" SERIAL NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                "delete_date" TIMESTAMP,
                "email" character varying(256) NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"),
                CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "accounts"
        `)
    }
}
