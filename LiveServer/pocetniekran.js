import { Aviokompanija } from "./aviokompanija.js";
import { Avion } from "./avion.js"
import { Destinacija } from "./destinacija.js";

export class PocetniEkran {
    constructor() {
        this.kontejner = null;
    }
    prikaz(host) {

        var mainDiv = document.createElement("div");
        mainDiv.className = "mainDiv";
        this.kontejner = mainDiv;
        host.appendChild(this.kontejner);

        var divAdd = document.createElement("div");
        divAdd.className = "divAdd";
        this.kontejner.appendChild(divAdd);

        var divAviokompanija = document.createElement("div");
        divAviokompanija.className = "divAviokompanija1";
        divAdd.appendChild(divAviokompanija);

        var divAvion = document.createElement("div");
        divAvion.className = "divAvion";
        divAdd.appendChild(divAvion);

        var divDestinacija = document.createElement("div");
        divDestinacija.className = "divDestinacija";
        divAdd.appendChild(divDestinacija);

        var divDisplay = document.createElement("div");
        divDisplay.className = "divDisplay";
        mainDiv.appendChild(divDisplay);

        var divUnosPodataka = document.createElement("div");
        divUnosPodataka.className = "divUnosPodataka";
        divDisplay.appendChild(divUnosPodataka);

        var divDisplayTermina = document.createElement("div");
        divDisplayTermina.className = "divPrikaz";
        divDisplay.appendChild(divDisplayTermina);

        let AVIOKOMPANY = new Aviokompanija();
        AVIOKOMPANY.crtanjeDodavanjeAviokompanija(divAviokompanija);

        let airplane = new Avion();
        airplane.crtanjeDodavanjeAviona(divAvion);

        let destination = new Destinacija();
        destination.crtanjeDodavanjeDestinacije(divDestinacija);

    }
}