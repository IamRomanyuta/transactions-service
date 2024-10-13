import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserBalanceRepository } from './user-balance.repository';

@Injectable()
export class UserBalanceService {
  constructor(private readonly userBalanceRepository: UserBalanceRepository) {}

  async getUserBalance(userId: number): Promise<number> {
    try {
      const { balance } =
        await this.userBalanceRepository.findOneOrFail(userId);

      return balance;
    } catch (e) {
      throw new NotFoundException('User balance with such id does not exist.');
    }
  }
}
