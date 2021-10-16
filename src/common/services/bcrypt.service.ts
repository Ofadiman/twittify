import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

export type CompareArgs = { data: Buffer | string; encryptedData: string }
export type HashArgs = { data: Buffer | string }

@Injectable()
export class BcryptService {
  public static readonly SALT_ROUNDS: number = 12

  public async hash(args: HashArgs): Promise<string> {
    return bcrypt.hash(args.data, BcryptService.SALT_ROUNDS)
  }

  public async compare(args: CompareArgs): Promise<boolean> {
    return bcrypt.compare(args.data, args.encryptedData)
  }
}
