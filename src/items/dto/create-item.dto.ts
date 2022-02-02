import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

// dtoはクラスで定義
export class CreateItemDto {
  @IsString() //文字列かどうか
  @IsNotEmpty() //一文字以上か
  @MaxLength(40) //40字以内か
  name: string;

  @IsInt() //数値型か
  @Min(1) //1以上か
  @Type(() => Number) //リクエストが文字列で渡ってくることがあるからNumber型と認識されるようにする
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
