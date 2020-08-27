import { BaseQueryParametersDto } from '../shared/dto/base-query-parameters.dto';

export class FindAuctionsQueryDto extends BaseQueryParametersDto {
  name: string;
  auctionStatus: string;
  
}