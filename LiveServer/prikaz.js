import { Aviokompanija } from "./aviokompanija.js";
import { Avion } from "./avion.js";

export class Prikaz {
    constructor() {
        this.kontejner = null;
    }
    prikaz(host) {
        fetch("https://localhost:5001/Aviokompanija/PreuzimanjeAviokompanije", {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(elem => {

                this.kontejner = divDisplay;
                var divDisplay = document.createElement("div");
                divDisplay.className = "divDisplay";
                host.appendChild(divDisplay);


                var divUnosPodataka = document.createElement("div");
                divUnosPodataka.className = "divUnosPodataka";
                divDisplay.appendChild(divUnosPodataka);


                var divDisplayTermina = document.createElement("div");
                divDisplayTermina.className = "divPrikaz";
                divDisplay.appendChild(divDisplayTermina);


                let ak = new Aviokompanija(elem.id, elem.naziv, elem.lokacija);
                let divAviokompanija = document.createElement("div");
                divAviokompanija.className = "divAviokompanija";
                divDisplay.appendChild(divAviokompanija);

                ak.crtanjePrikazaAviokompanije(divAviokompanija, ak.id);
                ak.crtanjeDodavanjeDestinacijeUnutarAviokompanije(divUnosPodataka);
                ak.crtanjeDodavanjeAvionaUOkviruAviokompanije(divUnosPodataka);


            });
        }));
    }
}