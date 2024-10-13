import {
  CreateTransactionRequest,
} from '../types/transaction.types';
import { IsInt, Min } from 'class-validator';

export class CreateTransactionReqDto implements CreateTransactionRequest {
  @Min(0)
  @IsInt()
  userId: number

  @IsInt()
  amount: number
}
