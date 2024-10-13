import { Test } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { AppModule } from '../app.module';

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    transactionsController = moduleRef.get(TransactionsController);
  });

  describe('createTransaction', () => {
    it('should add 100 coins', async () => {
      expect(
        await transactionsController.createTransaction({
          userId: 2,
          amount: 100
        })
      ).toStrictEqual({ success: true })
    });

    it('should remove 100 coins', async () => {
      const params = {
        userId: 2,
        amount: -100
      }

      const requests = await Promise.allSettled([
        transactionsController.createTransaction(params),
        transactionsController.createTransaction(params),
        transactionsController.createTransaction(params)
      ])

      const successful = requests.filter(response => response.status === 'fulfilled')
      expect(successful.length).toBe(1)

      const failed = requests.filter(response => response.status === 'rejected')
      expect(failed.length).toBe(2)

      failed.forEach(
        response => expect((response as PromiseRejectedResult).reason).toBe('not enough balance')
      )
    });
  });
});
