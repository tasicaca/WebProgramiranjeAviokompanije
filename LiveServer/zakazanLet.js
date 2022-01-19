import { Destinacija } from "./destinacija.js";

export class ZakazanLet {
    constructor(id, destinacijaID, avionID, vreme, odlazniLet, duzinaLeta) {
        this.id = id;
        this.destinacija = destinacijaID;
        this.avion = avionID;
        this.vreme = vreme;
        this.odlazniLet = odlazniLet; ///1 ako jeste, 0 je dolazni
        this.duzinaLeta = duzinaLeta;
    }
}