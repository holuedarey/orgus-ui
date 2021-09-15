export interface GenSetAnalyticsTableDto {
    totalEnergySupplied: number;
    totalEnergyValue: number;
    tableData: TableData[]
}

interface TableData {
    name: string;
    energySupplied: number;
    energyValue: number
    from: string;
    to: string;
}