import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página (começa em 1)',
    default: 1,
  })
  @IsOptional()
  @IsInt({ message: 'O número da página deve ser um inteiro' })
  @Min(1, { message: 'O número da página deve ser pelo menos 1' })
  @Type(() => Number)
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Número de itens por página',
    default: 10,
  })
  @IsOptional()
  @IsInt({ message: 'O limite de itens deve ser um inteiro' })
  @Min(1, { message: 'O limite de itens deve ser pelo menos 1' })
  @Type(() => Number)
  limit: number = 10;
}
