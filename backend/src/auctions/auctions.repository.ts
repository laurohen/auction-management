import { EntityRepository, Repository } from 'typeorm';
import { Auction } from './auction.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
import { FindAuctionsQueryDto } from './dto/find-auctions-query.dto';

@EntityRepository(Auction)
export class AuctionRepository extends Repository<Auction> {

    async createAuction(
        createAuctionDto: CreateAuctionDto,
      ): Promise<Auction> {
        const { name, initialValue, itemStatus, userManager, auctionStatus } = createAuctionDto;
    
        const auction = this.create();
            auction.name = name;
            auction.initialValue = initialValue;
            auction.itemStatus = itemStatus;
            auction.userManager = userManager;
            auction.auctionStatus = auctionStatus;
            
        try {
          await auction.save()
          return auction;
        } catch (error) {
          if (error.code.toString() === '23505') {
            throw new ConflictException('Auction already exists at the base');
          } else {
            throw new InternalServerErrorException(
              'Error saving Auction data in the database',
            );
          }
        }
      }
    
      async findAuctions(
        queryDto: FindAuctionsQueryDto,
      ): Promise<{ auctions: Auction[]; total: number }> {
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    
        const { name, auctionStatus} = queryDto;
        const query = this.createQueryBuilder('auction');
    
        if (auctionStatus) {
          query.andWhere('auction.auctionStatus ILIKE :auctionStatus', { auctionStatus: `%${auctionStatus}%` });
        }
    
        if (name) {
          query.andWhere('auction.name ILIKE :name', { name: `%${name}%` });
        }
    
        query.skip((queryDto.page - 1) * queryDto.limit);
        query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['auction.name', 'auction.auctionStatus']);
    
        const [auctions, total] = await query.getManyAndCount();
    
        return { auctions, total };
      }



}
