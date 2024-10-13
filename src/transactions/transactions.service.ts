import { Injectable } from '@nestjs/common';
import { CreateTransactionReqDto } from './dto/create-transaction.dto';
import {
  CompensateTransactionResponse,
  CreateTransactionResponse,
} from './types/transaction.types';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository: TransactionsRepository) {}

  async create({
    userId,
    amount,
  }: CreateTransactionReqDto): Promise<CreateTransactionResponse> {
    throw new Error('not implemented');

    return { success: true };
  }

  async compensate(id: string): Promise<CompensateTransactionResponse> {
    await this.transactionsRepository.deleteOne(id);
    return { success: true };
  }
}
