import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  readonly title: string;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly price: number;
  @IsOptional()
  @IsString()
  readonly description: string;
  @IsString()
  @IsOptional()
  readonly slug: string;
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly stock: number;
  @IsString({ each: true })
  @IsArray()
  readonly sizes: string[];
  @IsIn(['men', 'women', 'unisex'])
  readonly gender: string;
}
