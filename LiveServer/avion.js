import { ZakazanLet } from "./zakazanLet.js";
import { Destinacija } from "./destinacija.js";
//import { Aviokompanija } from "./aviokompanija.js";
export class Avion {
    constructor(id, kodniNaziv, brojSedista, proizvodjac) {
        this.id = id;
        this.kodniNaziv = kodniNaziv;
        this.brojSedista = brojSedista; ///////////mogao bi za avion da dodas naziv
        this.model = proizvodjac;
        this.kontejner = null;

    }
    crtanjeDodavanjeAviona(divAvion) {
        var h2 = document.createElement("h2");
        h2.innerHTML = "Kreiranje aviona";
        divAvion.appendChild(h2);

        var newLine = document.createElement("br");
        divAvion.appendChild(newLine);

        var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv aviona:";
        divAvion.appendChild(labNaziv);

        newLine = document.createElement("br");
        divAvion.appendChild(newLine);

        var input = document.createElement("input");
        input.className = "nazivAviona";
        input.type = "text";
        divAvion.appendChild(input);

        newLine = document.createElement("br");
        divAvion.appendChild(newLine);

        var labSedista = document.createElement("label");
        labSedista.innerHTML = "Unesite broj sedista:";
        divAvion.appendChild(labSedista);

        newLine = document.createElement("br");
        divAvion.appendChild(newLine);

        input = document.createElement("input");
        input.className = "brojSedista";
        input.type = "number";
        divAvion.appendChild(input);

        newLine = document.createElement("br");
        divAvion.appendChild(newLine);

        var labtip = document.createElement("label");
        labtip.innerHTML = "Izaberite tip aviona:";
        divAvion.appendChild(labtip);

        newLine = document.createElement("br");
        divAvion.appendChild(newLine);

        var selectTipAviona = document.createElement("select");
        selectTipAviona.name = "vrstaAviona";
        selectTipAviona.required = true;
        divAvion.appendChild(selectTipAviona);

        let tipoviAviona = ["Boeing 737", "Boeing 747", "Boeing 757", "Boeing 767", "Boeing 777", "Boeing 787", "Airbus 220", "Airbus 310", "Airbus 320", "Airbus 330", "Airbus 340", "Airbus 350", "Airbus 380"];

        tipoviAviona.forEach((tipAviona, i) => {

                let opcija = document.createElement("option");
                opcija.value = tipoviAviona[i];
                opcija.innerHTML = tipAviona;
                selectTipAviona.appendChild(opcija);
            })
            /* var img = document.createElement("img");
            img.src = "data:image/jpeg;base64,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";
            divAvion.appendChild(img); */


        newLine = document.createElement("br");
        divAvion.appendChild(newLine);

        var labSelect = document.createElement("label");
        labSelect.innerHTML = "Izaberite aviokompaniju:";
        divAvion.appendChild(labSelect);


        newLine = document.createElement("br");
        divAvion.appendChild(newLine);

        var selectAK = document.createElement("select");
        selectAK.name = "sel";
        selectAK.required = true;
        divAvion.appendChild(selectAK);

        fetch("https://localhost:5001/Aviokompanija/PreuzimanjeAviokompanije", {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(aviokompanija => {
                var opcija = document.createElement("option");
                opcija.value = aviokompanija.id;
                opcija.innerHTML = aviokompanija.naziv + " " + aviokompanija.lokacija;
                selectAK.appendChild(opcija);

            });
        }));

        newLine = document.createElement("br");
        divAvion.appendChild(newLine);
        newLine = document.createElement("br");
        divAvion.appendChild(newLine);
        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj avion";
        dugme.className = "dodajAvion";
        divAvion.appendChild(dugme);

        dugme.onclick = (ev) => {
            var nazivAviona = divAvion.querySelector(".nazivAviona").value;
            var brojSedista = divAvion.querySelector(".brojSedista").value;
            var a = divAvion.querySelector('select[name="sel"]').value;
            var modelA = divAvion.querySelector('select[name="vrstaAviona"]').value;
            if (nazivAviona == "")
                alert("Neophodno je uneti naziv aviona!");
            else
                fetch("https://localhost:5001/Aviokompanija/DodavanjeAviona/" + a, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "kodniNaziv": nazivAviona,
                        "brojSedista": brojSedista,
                        "model": modelA,
                    })
                }).then(p => {
                    if (p.ok) {
                        alert("Uspesno ste dodali avion");
                    } else {
                        alert("Nastala je greska prilikom dodavanja");
                    }
                });
        }
    }
    prikaz(divAviokompanija) { //////crtanje diva za avion
        let divPrikazAviona = document.createElement("div");
        divPrikazAviona.className = "divPrikazAviona";
        divAviokompanija.appendChild(divPrikazAviona);
        this.kontejner = divPrikazAviona;

        let divNaslov = document.createElement("div");
        divNaslov.className = "divNaslov";
        divPrikazAviona.appendChild(divNaslov);

        let labAk = document.createElement("h5");
        labAk.className = "labAviona";
        labAk.innerHTML = "Avion: " + this.kodniNaziv;
        console.log(this.model);

        divNaslov.appendChild(labAk);

        let divLet = document.createElement("div");
        divLet.className = "divLet";
        divPrikazAviona.appendChild(divLet);

        //   if ((this.model.toString().substring(0, 6)) == ("Boeing")) {
        if ((this.model.toString()) == "Boeing 747") {
            var img1 = document.createElement("img");
            divLet.appendChild(img1);
            img1.src = "/Aviokompanija/747.png";
        }
        if ((this.model.toString()) == "Boeing 777") {
            var img2 = document.createElement("img");
            divLet.appendChild(img2);
            img2.src = "/Aviokompanija/777.png";
        }
        if ((this.model.toString()) == "Boeing 787") {
            var img3 = document.createElement("img");
            divLet.appendChild(img3);
            img3.src = "/Aviokompanija/787.png";
        }
        if ((this.model.toString()) == "Boeing 737") {
            var img4 = document.createElement("img");
            divLet.appendChild(img4);
            img4.src = "/Aviokompanija/737.png";
        }
        if ((this.model.toString()) == "Airbus 320") {
            var img5 = document.createElement("img");
            divLet.appendChild(img5);
            img5.src = "/Aviokompanija/320.png";
        }
        if ((this.model.toString()) == "Airbus 330") {
            var img5 = document.createElement("img");
            divLet.appendChild(img5);
            img5.src = "/Aviokompanija/330.png";
        }
        if ((this.model.toString()) == "Airbus 340") {
            var img6 = document.createElement("img");
            divLet.appendChild(img6);
            img6.src = "/Aviokompanija/340.png";
        }
        if ((this.model.toString()) == "Airbus 350") {
            var img7 = document.createElement("img");
            divLet.appendChild(img7);
            img7.src = "/Aviokompanija/350.png";
        }
        if ((this.model.toString()) == "Airbus 220") {
            var img8 = document.createElement("img");
            divLet.appendChild(img8);
            img8.src = "/Aviokompanija/220.jpg";
        }
        if ((this.model.toString()) == "Airbus 380") {
            var img9 = document.createElement("img");
            divLet.appendChild(img9);
            img9.src = "/Aviokompanija/380.png";
        }
        if ((this.model.toString()) == "Boeing 767") {
            var img10 = document.createElement("img");
            divLet.appendChild(img10);
            img10.src = "/Aviokompanija/767.png";
        }
        if ((this.model.toString()) == "Boeing 757") {
            var img10 = document.createElement("img");
            divLet.appendChild(img10);
            img10.src = "/Aviokompanija/757.png";
        }
        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.className = "dugmeObrisi";
        dugmeObrisi.innerHTML = "Isključi avion iz saobraćaja";
        divNaslov.appendChild(dugmeObrisi);
        dugmeObrisi.onclick = (ev) => {
            this.BrisanjeAviona(ev);
        }

        fetch("https://localhost:5001/Aviokompanija/PreuzmiZakazanLetZaAvion/" + this.id, {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(elem => {
                let zakazanLet = new ZakazanLet(elem.id, elem.destinacijaID, elem.avionID, elem.vreme, elem.odlazniLet, elem.duzinaLeta); //u tom obliku se vracaju jason podaci, zato se koristi destinacijaID ////[{"id":20,"avionID":4,"destinacijaID":1,"vreme":"0088-08-08T06:59:00","odlazniLet":1,"duzinaLeta":9},{"id":21,"avionID":4,"destinacijaID":1,"vreme":"0088-08-08T06:59:00","odlazniLet":1,"duzinaLeta":9}]
                console.log(elem.duzinaLeta); ///////////////////////////////////////duzinaLeta mora malim slovom da pocinje, jer json podaci pocinju malim slovom, nema veze sto sam ja prosledio tamo duzinaLeta, bez obzira na to, meni ce u responsu biti duzinaLeta sa malim slovom pocetnim.


                fetch("https://localhost:5001/Aviokompanija/PreuzimanjeDestinacije/" + zakazanLet.destinacija, {
                    method: "GET"
                }).then(p => p.json().then(data => {
                    let destinacija = new Destinacija(this.destinacija, data.naziv, data.zemlja, data.nazivAerodroma);
                    destinacija.iscrtavanjePodatakaODestinaciji(divLet, zakazanLet.id, zakazanLet.vreme, zakazanLet.odlazniLet, zakazanLet.duzinaLeta);
                }));

            })
        }));

    }

    BrisanjeAviona(ev) {
        fetch("https://localhost:5001/Aviokompanija/BrisanjeAviona/" + this.id, {
            method: "DELETE"
        }).then(p => {
            if (p.ok) {
                (this.kontejner).style.display = "none";
                if ((this.kontejner.parentNode.parentNode.parentNode.querySelector(".avion" + this.id).style.display) != null) {
                    (this.kontejner.parentNode.parentNode.parentNode.querySelector(".avion" + this.id)).style.display = "none";
                    /////brise div sa avionima za dodavanje leta posto taj div sadrzi obrisan avion
                } else {
                    alert("Doslo je do greske!");
                }
            }
        });
    }
}