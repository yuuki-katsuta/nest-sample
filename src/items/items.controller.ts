import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { Item } from './item.model';
import { ItemsService } from './items.service';

// /itemsというpathに対応
@Controller('items')
export class ItemsController {
  //serviceを利用できるようなになった(ItemsServiceインスタンスをitemsServiceに代入？)
  constructor(private readonly itemsService: ItemsService) {}
  // getメソッドで発火
  @Get()
  finaAll(): Item[] {
    return this.itemsService.findAll();
  }

  // パスは、items/id
  @Get(':id') // :id とすることでidが可変のパラメータであると認識
  //パラメータを取得するには@Paramデコレータを使用(引数はパラメータ名と同じ)
  findById(@Param('id') id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post()
  //リクエストボディーから商品パラメータ取得=>@Bodyデコレータの使用
  // idはリクエストボディのキー。それをstring型の変数idに格納
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Item {
    //リクエストボディの値からitemを生成
    const item: Item = {
      id,
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
    };
    return this.itemsService.create(item);
  }
}
