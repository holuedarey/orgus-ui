import { environment } from "src/environments/environment";

export function GetUniqueArray<T>(inputArray: T[]): T[] {
    const jsonArray = inputArray.map(a => JSON.stringify(a));
    const arraySet = new Set(jsonArray);
    const uniqueStringArray = Array.from(arraySet);
    const transformedArray = uniqueStringArray.map(a => JSON.parse(a)) as T[];
    return transformedArray;
}

export function DataRequestTransformer(data: any): any {
    console.log(data)
    const { nosOfRecords } = data.paging;
    const columnFilters = (data.filter as any[]).reduce((obj, item) => (obj[item.field] = item.search, obj), {});;
    const page = Math.floor(nosOfRecords / environment.paginationLength) + 1;
    const size = environment.paginationLength;
    return { ...columnFilters, page, size };
}