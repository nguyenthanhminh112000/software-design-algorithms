import { Parcel } from "./types";
import { 
    Letter, 
    Package, 
    Oversize, 
    Shipment, 
} from "./Shipment";

const LETTER_LIMIT = 15;
const PACKAGE_LIMIT = 160;

export class ShipmentFactory {
    public static createShipment(parcel: Parcel): Shipment {
        if (parcel.weight <= LETTER_LIMIT) return new Letter(parcel);
        if (parcel.weight <= PACKAGE_LIMIT) return new Package(parcel);
        return new Oversize(parcel);
    }
}
