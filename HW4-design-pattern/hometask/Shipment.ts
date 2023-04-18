import { Parcel } from './types';
import { IShipper } from './Shipper';
import { GeneratorID } from './GeneratorID';

export interface IShipment {
    ship(): string;
    getShipmentID(): string;
    setShipper(shipper: IShipper): void;
    getWeight(): number;
}

export class Shipment implements IShipment {
    private parcel: Parcel;
    private shipper: IShipper;
    private shipmentID: string;

    public constructor(parcel: Parcel) {
        this.shipmentID = GeneratorID.generate();
        this.parcel = parcel;
    }

    public setShipper(shipper: IShipper): void {
        this.shipper = shipper;
    }

    public getShipmentID(): string {
        return this.shipmentID;
    }

    public getWeight(): number {
        return this.parcel.weight;
    }

    ship(): string {
        const { fromAddress, fromZipCode, toAddress, toZipCode } = this.parcel;

        return (`
            Shipment with the ID:         ${this.shipmentID} 
            Will be picked up from:       ${fromAddress}, ${fromZipCode} 
            And shipped to:               ${toAddress}, ${toZipCode}
            Cost:                         ${this.shipper.getCost(this).toFixed(2)}
        `)
    }
}

export class Letter extends Shipment implements IShipment {}
export class Package extends Shipment implements IShipment {}
export class Oversize extends Shipment implements IShipment {}
