import { InjectModel } from '@nestjs/mongoose';

import { ProductRepository } from '../product.repository';

import { Model } from 'mongoose';
import { Product } from 'src/stock/schemas/product.schema';
import { IProduct } from 'src/stock/schemas/models/product.interface';

export class ProductMongooseRepository implements ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  getAllStock(limit: number, page: number): Promise<IProduct[]> {
    const offset = page - 1 * limit;

    return this.productModel.find().skip(offset).limit(limit).exec();
  }
  getStock(productId: string): Promise<IProduct | null> {
    return this.productModel.findById(productId).exec();
  }
  async createStock(product: IProduct): Promise<void> {
    const createStock = new this.productModel(product);
  }
  async updateStock(productId: string, stock: number): Promise<void> {
    await this.productModel
      .updateOne({ _id: productId }, { quantity: stock })
      .exec();
  }
  async deleteStock(productId: string): Promise<void> {
    await this.productModel.deleteOne({ _id: productId }).exec();
  }
}
