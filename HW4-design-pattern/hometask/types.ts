export type Parcel = {
    weight: number, 
    fromAddress: string, 
    fromZipCode: string, 
    toAddress: string, 
    toZipCode: string,
    enhancers?: string[],
}
