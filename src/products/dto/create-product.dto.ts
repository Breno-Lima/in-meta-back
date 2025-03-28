// src/products/dto/create-product.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone XYZ', description: 'Nome do produto' })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @ApiPropertyOptional({ example: 'Smartphone de última geração', description: 'Descrição do produto' })
  @IsString({ message: 'Descrição deve ser uma string' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1999.99, description: 'Preço do produto' })
  @IsNumber({}, { message: 'Preço deve ser um número' })
  @IsPositive({ message: 'Preço deve ser um valor positivo' })
  @IsNotEmpty({ message: 'Preço é obrigatório' })
  price: number;

  @ApiProperty({ example: 100, description: 'Quantidade em estoque' })
  @IsNumber({}, { message: 'Estoque deve ser um número' })
  @Min(0, { message: 'Estoque não pode ser negativo' })
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({ example: 'Eletrônicos', description: 'Categoria do produto' })
  @IsString({ message: 'Categoria deve ser uma string' })
  @IsOptional()
  category?: string;
}

