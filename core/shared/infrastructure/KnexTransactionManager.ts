import { Knex } from 'knex';
import { TransactionManager } from "./TransactionManager"
export class KnexTransactionManager implements TransactionManager {
  constructor(private knex: Knex) { }
  async transaction<T>(operation: (trx: Knex.Transaction) => Promise<T>): Promise<T> {
    return this.knex.transaction(async (trx: Knex.Transaction) => {
      try {
        const result = await operation(trx);
        await trx.commit();
        return result;
      } catch (error) {
        await trx.rollback();
        throw error;
      }
    });
  }
}