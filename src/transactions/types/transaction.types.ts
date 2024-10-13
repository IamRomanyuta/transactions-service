// Types repository simulation

export const TransactionsControllerAddress = 'transactions';

export const CreateTransactionAddress = `${TransactionsControllerAddress}`;
export interface CreateTransactionRequest {
  userId: number;
  amount: number;
}
export interface CreateTransactionResponse {
  success: boolean;
}

export const CompensateTransactionAddress = `${TransactionsControllerAddress}/:id`;
export type CompensateTransactionRequest = Record<string, never>;
export interface CompensateTransactionResponse {
  success: boolean;
}
