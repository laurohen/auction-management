import { 
    Controller, 
    Post,
    Get,
    Patch,
    Delete, 
    Body, 
    ValidationPipe,
    UseGuards,  
    Param,
    Query,  
    ForbiddenException
     } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { AuctionsService } from './auctions.service';
import { ReturnAuctionDto } from './dto/return-auction.dto';
import { FindAuctionsQueryDto } from './dto/find-auctions-query.dto';

@ApiTags('auctions')
@Controller('auctions')
export class AuctionsController {
    constructor(private readonly auctionsService: AuctionsService) {}

    @Post()
    async createAuction(
        @Body() createAuctionDto: CreateAuctionDto,
    ): Promise<ReturnAuctionDto> {
        const auction = await this.auctionsService.createAuction(createAuctionDto);
        return {
        auction,
        message: 'Auction - Create ok.',
        };
    }
    
    @Get(':id')
    async findAuctionById(@Param('id' , ValidationPipe) id: string): Promise<ReturnAuctionDto> {
        const auction = await this.auctionsService.findAuctionById(id);
        return {
        auction,
        message: 'Auction -  find ok',
        };
    }

    @Get()
    // @Role(UserRole.ADMIN)
    async findAuctions(@Query() query: FindAuctionsQueryDto) {
        const found = await this.auctionsService.findAuctions(query);
        return {
        found,
        message: 'Auctions - find ok',
        };
    }

    @Patch(':id')
    async updateAuction(
        @Body(ValidationPipe) updateAuctionDto: UpdateAuctionDto,
        // @GetUser() user: User,
        @Param('id') id: string,
    ) {
        //if (user.role != UserRole.ADMIN && user.id.toString() != id) {
        // throw new ForbiddenException(
        //     'Você não tem autorização para acessar esse recurso',
        //);
        //} else {
        return this.auctionsService.updateAuction(updateAuctionDto, id);
        //}
    }

    @Delete(':id')
    async deleteAuction(@Param('id') id: string) {
        await this.auctionsService.deleteAuction(id);
        return {
        message: 'Auction - remove ok.',
        };
    }

}
