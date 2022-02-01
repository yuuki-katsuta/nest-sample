import { Injectable } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.model';

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

  create(item: Item): Item {
    // contorollerから受け取ったitemsを配列に格納
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
