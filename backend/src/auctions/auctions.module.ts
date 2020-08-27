import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionRepository } from './auctions.repository';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([AuctionRepository])],
    providers: [AuctionsService],
    controllers: [AuctionsController],
})
export class AuctionsModule {}
