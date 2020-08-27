import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    initialValue: string;

    @ApiProperty()
    itemStatus: string;

    @ApiProperty()
    userManager: string;

    @ApiProperty()
    auctionStatus: string;


}