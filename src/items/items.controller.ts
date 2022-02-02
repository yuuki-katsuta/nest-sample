import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
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
  findById(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post()
  //リクエストボディーから商品パラメータ取得=>@Bodyデコレータの使用
  // idはリクエストボディのキー。それをstring型の変数idに格納
  create(
    // @Body('id') id: string,
    // @Body('name') name: string,
    // @Body('price') price: number,
    // @Body('description') description: string,
    @Body() creatItemDto: CreateItemDto, //パラメータをまとめて受け取ることができる
  ): Item {
    //リクエストボディの値からitemを生成
    // const item: Item = {
    //   id,
    //   name,
    //   price,
    //   description,
    //   status: ItemStatus.ON_SALE,
    // };
    return this.itemsService.create(creatItemDto);
  }

  @Patch(':id') // items/id
  updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.itemsService.delete(id);
  }
}
