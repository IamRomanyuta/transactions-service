import { Injectable } from '@nestjs/common';
import { CreateTransactionReqDto } from './dto/create-transaction.dto';
import {
  CompensateTransactionResponse,
  CreateTransactionResponse,
} from './types/transaction.types';
import { TransactionsRepository } from './transactions.repository';
import { UserBalanceService } from 'src/user-balance/user-balance.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository: TransactionsRepository,
              private readonly userBalanceService: UserBalanceService
  ) {}

  async create({
    userId,
    amount,
  }: CreateTransactionReqDto): Promise<CreateTransactionResponse> {
    const userBalance = await this.userBalanceService.getUserBalance(userId);

    if (userBalance + amount < 0) {
      throw new Error('not enough balance');
    }

    // Обновляем баланс пользователя
    await this.userBalanceService.updateBalance(userId, amount);

    // Сохраняем транзакцию в репозитории
    await this.transactionsRepository.create({
      userId,
      amount,
    });

    return { success: true };
  }

  async compensate(id: string): Promise<CompensateTransactionResponse> {
    await this.transactionsRepository.deleteOne(id);
    return { success: true };
  }
}
