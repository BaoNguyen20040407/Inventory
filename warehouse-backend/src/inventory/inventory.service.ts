import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { CreateInventoryDto } from './inventory.dto';
import { Product } from '../products/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateInventoryDto): Promise<Inventory> {
    const product = await this.productRepository.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    // kiểm tra số lượng khi xuất
    if (dto.type === 'Export' && product.quantity < dto.quantity) {
      throw new BadRequestException('Not enough stock for export');
    }

    // tạo phiếu
    const inventory = this.inventoryRepository.create({
      quantity: dto.quantity,
      type: dto.type,
      reason: dto.reason,
      product,
    });
    await this.inventoryRepository.save(inventory);

    // cập nhật tồn kho sản phẩm
    if (dto.type === 'Import') {
      product.quantity += dto.quantity;
    } else if (dto.type === 'Export') {
      product.quantity -= dto.quantity;
    }
    await this.productRepository.save(product);

    return inventory;
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find({ relations: ['product'], order: { created: 'DESC' } });
  }
}
