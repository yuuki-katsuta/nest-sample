import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  //商品を保存するため
  private items: Item[] = [];

  findAll() {
    return 'this is items service';
  }

  create(item: Item): Item {
    // contorollerから受け取ったitemsを配列に格納
    this.items.push(item);
    return item;
  }
}
