import { Injectable, UnprocessableEntityException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionRepository } from './auctions.repository';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { Auction } from './auction.entity';
import { FindAuctionsQueryDto } from './dto/find-auctions-query.dto';

@Injectable()
export class AuctionsService {
    constructor(
        @InjectRepository(AuctionRepository)
        private auctionRepository: AuctionRepository,
      ) {}


      async createAuction(createAuctionDto: CreateAuctionDto): Promise<Auction> {
        
          return this.auctionRepository.createAuction(createAuctionDto);
        
      }

      async findAuctionById(auctionId: string): Promise<Auction> {
        const auction = await this.auctionRepository.findOne(auctionId, {
          select: ['id', 'name', 'auctionStatus'],
        });
    
        if (!auction) throw new NotFoundException('Auction not found.');
    
        return auction;
      }

      async findAuctions(
        queryDto: FindAuctionsQueryDto,
      ): Promise<{ auctions: Auction[]; total: number }> {
        const auctions = await this.auctionRepository.findAuctions(queryDto);
        return auctions;
      }

      async updateAuction(updateAuctionDto: UpdateAuctionDto, id: string): Promise<Auction> {
        const auction = await this.findAuctionById(id);
        const { name, auctionStatus } = updateAuctionDto;
        auction.name = name ? name : auction.name;
        auction.auctionStatus = auctionStatus ? auctionStatus : auction.auctionStatus;
        try {
          await auction.save();
          return auction;
        } catch (error) {
          throw new InternalServerErrorException(
            'Error saving auction data in the database',
          );
        }
      }

      async deleteAuction(auctionId: string) {
        const result = await this.auctionRepository.delete({ id: auctionId });
        if (result.affected === 0) {
          throw new NotFoundException(
            'A Auction with the given ID was not found',
          );
        }
      }
}
