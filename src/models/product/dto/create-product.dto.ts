import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly urlName: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly size: string;

  @IsString()
  @IsOptional()
  readonly color: string;

  @IsString()
  @IsOptional()
  readonly picture: string;

  @IsInt()
  @Min(0)
  readonly basePrice: number;

  @IsInt()
  @IsOptional()
  readonly disountPercentage: number;

  @IsInt()
  @Min(0)
  readonly stock: number;
}
