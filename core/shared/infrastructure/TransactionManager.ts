export interface TransactionManager {
  transaction<T>(operation: (transactionContext: any) => Promise<T>): Promise<T>;
}