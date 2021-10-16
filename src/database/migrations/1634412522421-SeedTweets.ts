import faker from 'faker'
import { MigrationInterface, QueryRunner, Repository } from 'typeorm'

import { Account } from '../../accounts/account.entity'
import { TweetConstraints } from '../../tweets/enums/tweet-constraints.enum'
import { Tweet } from '../../tweets/tweet.entity'
import { seedDatabase } from '../utils/seed-database'

const createTweet = (account: Account): Tweet => {
    const tweet: Tweet = new Tweet()
    tweet.content = faker.company.catchPhrase()
    tweet.account = account

    const isTweetContentLongerThanMax = tweet.content.length > TweetConstraints.TweetMaxLength
    if (isTweetContentLongerThanMax) {
        return createTweet(account)
    }

    return tweet
}

export class SeedTweets1634412522421 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await seedDatabase(async (): Promise<void> => {
            const accountRepository: Repository<Account> = queryRunner.manager.getRepository(Account)
            const tweetsRepository: Repository<Tweet> = queryRunner.manager.getRepository(Tweet)

            const accounts: Account[] = await accountRepository.find()

            for (const account of accounts) {
                faker.seed(account.id)

                const tweetPromises: Promise<void>[] = Array.from({ length: 10 })
                    .fill(null)
                    .map((): Tweet => createTweet(account))
                    .map(async (tweet: Tweet): Promise<void> => {
                        await tweetsRepository.save(tweet)
                    })

                await Promise.all(tweetPromises)
            }
        })
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        // Skip.
    }
}
