import { IDataSourceResolver } from "./interfaces/IDataSourceResolver";

export class ResolverManager {
   private resolvers: Map<string, IDataSourceResolver> = new Map();
   registerResolver(sourceType: string, resolver: IDataSourceResolver): void {
      this.resolvers.set(sourceType, resolver);
   }
   resolve(sourceType: string, variableName: string) {
      if (this.resolvers.has(sourceType)) {
         return this.resolvers.get(sourceType)?.resolve(variableName);
      }
      throw new Error(`No resolver registered for data source type "${sourceType}"`);
   }
}
