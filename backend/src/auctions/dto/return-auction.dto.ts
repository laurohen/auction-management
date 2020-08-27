import { Auction } from '../auction.entity';

export class ReturnAuctionDto {
  auction: Auction;
  message: string;
}