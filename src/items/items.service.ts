import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  //商品を保存するため
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    return this.items.find((item) => item.id === id);
  }

  create(creatItemDto: CreateItemDto): Item {
    // item作成
    const item: Item = {
      id: uuid(),
      ...creatItemDto,
      status: ItemStatus.ON_SALE,
    };
    this.items.push(item);
    return item;
  }

  //商品のstatusを更新
  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
