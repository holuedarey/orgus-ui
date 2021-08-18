export interface TariffDto {
    id: string;
    name: string;
    amount: number;
    rateClass: string;
    clientId: string;
    client: string;
    serviceBandId: string;
    serviceBand: string;
    status: string;
    modified: string
  }