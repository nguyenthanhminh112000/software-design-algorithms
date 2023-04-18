
import { IShipment } from "./Shipment";
import { IShipper } from "./Shipper";

class ShipmentDecorator implements IShipment {
    protected shipment: IShipment;

    constructor(shipment: IShipment) {
        this.shipment = shipment;
    }

    ship(): string {
        return this.shipment.ship();
    }

    getShipmentID(): string {
        return this.shipment.getShipmentID();
    }

    setShipper(shipper: IShipper): void {
        this.shipment.setShipper(shipper);
    }

    getWeight(): number {
        return this.shipment.getWeight();
    }
}

export class FragileShipmentDecorator extends ShipmentDecorator implements IShipment {
    ship(): string {
        return (`${this.shipment.ship()}
            **MARK FRAGILE**
        `)
    }
}

export class DoNotLeaveDecorator extends ShipmentDecorator implements IShipment {
    ship(): string {
        return (`${this.shipment.ship()}
            **MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**
        `)
    }
}

export class ReturnReceiptRequestedDecorator extends ShipmentDecorator implements IShipment {
    ship(): string {
        return (`${this.shipment.ship()}
            **MARK RETURN RECEIPT REQUESTED**
        `)
    }
}
