import { IShipment, Letter, Package } from "./Shipment";

export interface IShipper {
    getCost(shipment: IShipment): number;
}

export class AirWestShipper implements IShipper {
    getCost(shipment: IShipment): number {
        if (shipment instanceof Letter) return 0.39 * shipment.getWeight();
        if (shipment instanceof Package) return 0.25 * shipment.getWeight();

        return 0.25 * shipment.getWeight() + 10;
    }
}

export class PacificParcelShipper implements IShipper {
    getCost(shipment: IShipment): number {
        if (shipment instanceof Letter) return 0.51 * shipment.getWeight();
        if (shipment instanceof Package) return 0.19 * shipment.getWeight();

        return 0.21 * shipment.getWeight();
    }
}

export class ChicagoSprintShipper implements IShipper {
    getCost(shipment: IShipment): number {
        if (shipment instanceof Letter) return 0.42 * shipment.getWeight();
        if (shipment instanceof Package) return 0.20 * shipment.getWeight();

        return 0;
    }
}
