import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuctionDto {

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Informe um nome',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Informe status',
  })
  auctionStatus: string;
  
}