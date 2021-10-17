import faker from 'faker'
import { MigrationInterface, QueryRunner, Repository } from 'typeorm'

import { Account } from '../../accounts/account.entity'
import { Comment } from '../../comments/comment.entity'
import { CommentConstraints } from '../../comments/enums/comment-constraints.enum'
import { Tweet } from '../../tweets/tweet.entity'
import { seedDatabase } from '../utils/seed-database'

const createComment = (args: { account: Account; tweet: Tweet }): Comment => {
    const comment: Comment = new Comment()
    comment.content = faker.lorem.sentence()
    comment.tweet = args.tweet
    comment.account = args.account

    const isCommentContentToLong: boolean = comment.content.length > CommentConstraints.ContentMaxLength
    const isCommentContentToShort: boolean = comment.content.length < CommentConstraints.ContentMinLength
    if (isCommentContentToLong || isCommentContentToShort) {
        return createComment(args)
    }

    return comment
}

export class SeedComments1634499150560 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await seedDatabase(async (): Promise<void> => {
            const accountsRepository: Repository<Account> = queryRunner.manager.getRepository(Account)
            const tweetsRepository: Repository<Tweet> = queryRunner.manager.getRepository(Tweet)
            const commentsRepository: Repository<Comment> = queryRunner.manager.getRepository(Comment)

            const accounts: Account[] = await accountsRepository.find()
            const tweets: Tweet[] = await tweetsRepository.find()

            for (const tweet of tweets) {
                faker.seed(tweet.id)

                const commentPromises: Promise<void>[] = Array.from({
                    length: faker.datatype.number({ max: 15, min: 5 })
                })
                    .fill(null)
                    .map((): Comment => createComment({ account: faker.random.arrayElement(accounts), tweet }))
                    .map(async (comment: Comment): Promise<void> => {
                        await commentsRepository.save(comment)
                    })

                await Promise.all(commentPromises)
            }
        })
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        // Skip.
    }
}
