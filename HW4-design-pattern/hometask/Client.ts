import { 
    AirWestShipper, 
    PacificParcelShipper, 
    ChicagoSprintShipper 
} from './Shipper';

import { 
    DoNotLeaveDecorator, 
    FragileShipmentDecorator, 
    ReturnReceiptRequestedDecorator 
} from "./Enhancer";

import { Parcel } from './types';
import { IShipment } from "./Shipment";
import { ShipmentFactory } from "./ShipmentFactory";
import { DO_NOT_LEAVE, FRIGILE, RETERN_RECEIPT } from './parcel';


export class Client {
    private parcel: Parcel;

    public constructor(parcel: Parcel) {
        this.parcel = parcel;
    }

    private evaluateShipperStrategy(shipment: IShipment): void {
        const index = +this.parcel.fromZipCode[0];

        if ([1, 2, 3].includes(index) || index === 0) {
            shipment.setShipper(new AirWestShipper())
        }
        
        if ([4, 5, 6].includes(index)) {
            shipment.setShipper(new ChicagoSprintShipper())
        }
        
        if ([7, 8, 9].includes(index)) {
            shipment.setShipper(new PacificParcelShipper())
        }
    }

    private evaluateShipperDecorators(shipment: IShipment): IShipment {
        if (this.parcel.enhancers.includes(FRIGILE)) {
            shipment = new FragileShipmentDecorator(shipment); 
        }

        if (this.parcel.enhancers.includes(DO_NOT_LEAVE)) {
            shipment = new DoNotLeaveDecorator(shipment); 
        }

        if (this.parcel.enhancers.includes(RETERN_RECEIPT)) {
            shipment = new ReturnReceiptRequestedDecorator(shipment); 
        }

        return shipment;
    }

    public init(): void {
        let shipment: IShipment = ShipmentFactory.createShipment(this.parcel);

        this.evaluateShipperStrategy(shipment);

        shipment = this.evaluateShipperDecorators(shipment);

        console.log(shipment.ship())
    }
}
