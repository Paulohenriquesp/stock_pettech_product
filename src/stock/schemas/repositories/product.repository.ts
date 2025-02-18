import { IProduct } from '../models/product.interface';

export abstract class ProductRepository {
  abstract getAllStock(limit: number, page: number): Promise<IProduct[]>;
  abstract getStock(productId: string): Promise<IProduct | null>;
  abstract createStock(product: IProduct): Promise<void>;
  abstract updateStock(productId: string, stock: number): Promise<void>;
  abstract deleteStock(productId: string): Promise<void>;
}
