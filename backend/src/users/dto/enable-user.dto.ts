import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnableUserDto {

  @ApiProperty()
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  email: string;

  @ApiProperty()
  @IsOptional()
  enable: boolean;
}
