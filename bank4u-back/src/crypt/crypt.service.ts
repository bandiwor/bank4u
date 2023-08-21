import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptService {
  protected readonly saltOrRounds = 10;

  async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  async matchPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}