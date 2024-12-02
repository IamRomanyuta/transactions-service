import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBalance } from './entity/user-balance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserBalanceRepository {
  constructor(
    @InjectRepository(UserBalance)
    private readonly userBalanceRepo: Repository<UserBalance>,
  ) {}
  findOneOrFail(userId: number): Promise<UserBalance> {
    return this.userBalanceRepo.findOneOrFail({
      where: { userId },
    });
  }

  async update(userId: number, updateData: Partial<UserBalance>): Promise<void> {
    const result = await this.userBalanceRepo.update({ userId }, updateData);
    if (result.affected === 0) {
      throw new Error(`Failed to update balance for user with ID: ${userId}`);
    }
  }
}