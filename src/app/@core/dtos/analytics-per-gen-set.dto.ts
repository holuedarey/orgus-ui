export interface GeneratingSetsAnalyticsDto {
    totalEnergySupplied: number;
    totalEnergyValue: number;
    chartData: ChartData[]
}

interface ChartData{
    name: string;
    energySupplied: number;
    energyValue: number;
    ReadingPeriodString: string;
}
