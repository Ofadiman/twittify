import { MigrationInterface, QueryRunner, Repository } from 'typeorm'

import { Account } from '../../accounts/account.entity'
import { daisyAccount, micheleAccount, sanchezAccount } from '../seeds/accounts.seed'
import { seedDatabase } from '../utils/seed-database'

export class SeedAccounts1634401171323 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await seedDatabase(async (): Promise<void> => {
            const accountRepository: Repository<Account> = queryRunner.manager.getRepository(Account)

            await accountRepository.save(sanchezAccount)
            await accountRepository.save(daisyAccount)
            await accountRepository.save(micheleAccount)
        })
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        // Skip.
    }
}
