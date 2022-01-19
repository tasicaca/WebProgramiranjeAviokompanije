import { ZakazanLet } from "./zakazanLet.js";
export class Destinacija {
    constructor(id, naziv, zemlja, nazivAerodroma) {
        this.id = id;
        this.naziv = naziv;
        this.zemlja = zemlja;
        this.nazivAerodroma = nazivAerodroma; ////
        this.kontejner = null;
    }

    crtanjeDodavanjeDestinacije(divDestinacija) {
            var h2 = document.createElement("h2");
            h2.innerHTML = "Kreiranje destinacije";
            divDestinacija.appendChild(h2);

            var newLine = document.createElement("br");
            divDestinacija.appendChild(newLine);

            var labNaziv = document.createElement("label");
            labNaziv.innerHTML = "Unesite naziv destinacije:";
            divDestinacija.appendChild(labNaziv);

            newLine = document.createElement("br");
            divDestinacija.appendChild(newLine);

            var input = document.createElement("input");
            input.className = "nazivDestinacijaa";
            input.type = "text";
            divDestinacija.appendChild(input);

            newLine = document.createElement("br");
            divDestinacija.appendChild(newLine);

            var labzemlja = document.createElement("label");
            labzemlja.innerHTML = "Unesite državu destinacije:";
            divDestinacija.appendChild(labzemlja);

            newLine = document.createElement("br");
            divDestinacija.appendChild(newLine);

            input = document.createElement("input");
            input.className = "zemljaDestinacijaa";
            input.type = "text";
            divDestinacija.appendChild(input);

            newLine = document.createElement("br");
            divDestinacija.appendChild(newLine);

            var labnazivAerodroma = document.createElement("label");
            labnazivAerodroma.innerHTML = "Naziv aerodroma:";
            divDestinacija.appendChild(labnazivAerodroma);

            newLine = document.createElement("br");
            divDestinacija.appendChild(newLine);

            input = document.createElement("input");
            input.className = "nazivAerodroma";
            input.type = "text";
            divDestinacija.appendChild(input);

            newLine = document.createElement("br");
            divDestinacija.appendChild(newLine);

            var dugme = document.createElement("button");
            dugme.innerHTML = "Dodaj destinacija";
            dugme.className = "DodavanjeDestinacija";

            divDestinacija.appendChild(dugme);

            dugme.onclick = (ev) => {
                var nazivDestinacijaa = divDestinacija.querySelector(".nazivDestinacijaa").value;
                var zemlja = divDestinacija.querySelector(".zemljaDestinacijaa").value;
                var nazivAerodroma = divDestinacija.querySelector(".nazivAerodroma").value;

                if ((nazivDestinacijaa == "") || (zemlja == "") || (nazivAerodroma == "")) {
                    alert("Neophodno je uneti pravilne podatke"); /////////////////////
                } else {
                    fetch("https://localhost:5001/Aviokompanija/DodavanjeDestinacija", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "naziv": nazivDestinacijaa,
                            "zemlja": zemlja,
                            "nazivAerodroma": nazivAerodroma,
                        })
                    }).then(p => {
                        if (p.ok) {
                            alert("Uspesno ste dodali destinaciju!");
                        } else {
                            alert("Greska prilikom dodavanja destinacije!");
                        }
                    });
                }
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
    iscrtavanjePodatakaODestinaciji(divLet, destAvionID, novTermin, odlazniLet, novaduzinaLeta) { /////////// vreme je objekat koji pripada klasi zakazanLet, tj klasi veze
        let podaciOLetovimaOdredjenogAviona = document.createElement("div");
        podaciOLetovimaOdredjenogAviona.className = "podaciOLetovimaOdredjenogAviona";
        divLet.appendChild(podaciOLetovimaOdredjenogAviona)
        this.kontejner = podaciOLetovimaOdredjenogAviona; //upamti kontejner

        if (odlazniLet == 1)
            this.kontejner.style.backgroundColor = "lightblue";
        else if (odlazniLet == 0)
            this.kontejner.style.backgroundColor = "gold"

        var lab = document.createElement("label");
        lab.innerHTML = "naziv destinacije";
        podaciOLetovimaOdredjenogAviona.appendChild(lab);

        var select = document.createElement("select");
        select.className = "selectDestinacije";
        select.style.display = "none"
        podaciOLetovimaOdredjenogAviona.appendChild(select);

        fetch("https://localhost:5001/Aviokompanija/PreuzimanjeDestinacija", {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(destinacija => {
                let option = document.createElement("option");
                option.value = destinacija.id;
                option.innerHTML = destinacija.naziv;
                select.appendChild(option);
            });
        }));
        /////////////////////////////////////////////////////////////////
        var inputNaziv = document.createElement("input");
        inputNaziv.value = this.naziv;
        podaciOLetovimaOdredjenogAviona.appendChild(inputNaziv);

        var lab = document.createElement("label");
        lab.innerHTML = "zemlja destinacije";
        podaciOLetovimaOdredjenogAviona.appendChild(lab);

        var inputZemlja = document.createElement("input");
        inputZemlja.value = this.zemlja;
        podaciOLetovimaOdredjenogAviona.appendChild(inputZemlja);

        var lab = document.createElement("label");
        lab.innerHTML = "naziv aerodroma";
        podaciOLetovimaOdredjenogAviona.appendChild(lab);

        var inputnazivAerodroma = document.createElement("input");
        inputnazivAerodroma.value = this.nazivAerodroma;
        podaciOLetovimaOdredjenogAviona.appendChild(inputnazivAerodroma);

        var lab = document.createElement("label");
        var poletanjesletanje = (odlazniLet == 1) ? "poletanja " : "sletanja";
        lab.innerHTML = "vreme " + poletanjesletanje;
        podaciOLetovimaOdredjenogAviona.appendChild(lab);

        var inputVreme = document.createElement("input");
        inputVreme.value = novTermin;
        inputVreme.type = "datetime";
        inputVreme.className = "inputVreme";

        console.log(odlazniLet);

        var inputDuzina = document.createElement("input");
        inputDuzina.value = novaduzinaLeta;
        inputDuzina.type = "input";
        inputDuzina.className = "inputDuzina";

        podaciOLetovimaOdredjenogAviona.appendChild(inputVreme);

        var lab = document.createElement("label");
        lab.innerHTML = "trajanje leta u minutima";
        podaciOLetovimaOdredjenogAviona.appendChild(lab);
        podaciOLetovimaOdredjenogAviona.appendChild(inputDuzina);

        let dugmeUpdate = document.createElement("button");
        dugmeUpdate.innerHTML = "Izmena"; ///////////////////////////////////////
        dugmeUpdate.className = "SaveUpdateEdit";
        podaciOLetovimaOdredjenogAviona.appendChild(dugmeUpdate);

        let dugmeSave = document.createElement("button");
        dugmeSave.className = "SaveUpdateEdit";
        dugmeSave.innerHTML = "Sacuvaj"; /////////////////////////////////////
        dugmeSave.style.display = "none";
        podaciOLetovimaOdredjenogAviona.appendChild(dugmeSave);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.className = "SaveUpdateEdit";
        dugmeObrisi.innerHTML = "Brisanje";
        podaciOLetovimaOdredjenogAviona.appendChild(dugmeObrisi);

        dugmeObrisi.onclick = (ev) => {
            fetch("https://localhost:5001/Aviokompanija/brisanjeZakazanogLeta/" + destAvionID, {
                method: "DELETE"
            }).then(p => {
                if (p.ok) {
                    this.kontejner.style.display = "none";
                } else {
                    alert("Doslo je do greske!");
                }
            });
        }

        inputVreme.disabled = true;
        inputnazivAerodroma.disabled = true;
        inputZemlja.disabled = true;
        inputNaziv.disabled = true;
        inputDuzina.disabled = true;

        dugmeUpdate.onclick = (ev) => { ///////////
            inputVreme.disabled = false;
            inputDuzina.disabled = false;
            select.style.display = "block";
            inputNaziv.style.display = "none";
            dugmeUpdate.style.display = "none";
            dugmeSave.style.display = "block";

            dugmeSave.onclick = (ev) => {
                let novoVreme = this.kontejner.querySelector(".inputVreme").value;
                let destinacijaNoviID = this.kontejner.querySelector(".selectDestinacije").value; //!
                let destinacijaNovi = this.kontejner.querySelector(".selectDestinacije")[destinacijaNoviID - 1].text;
                let novaduzinaLeta = this.kontejner.querySelector(".inputDuzina").value;
                //   console.log(destinacijaNovi);
                fetch("https://localhost:5001/Aviokompanija/izmenaZakazanogLeta/" + destAvionID + "/" + novoVreme + "/" + destinacijaNoviID + "/" + novaduzinaLeta, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(p => {
                    if (p.ok) {
                        fetch("https://localhost:5001/Aviokompanija/PreuzimanjeDestinacije/" + destinacijaNoviID, {
                            method: "GET"
                        }).then(p => p.json().then(data => {
                            let preuzetaDestinacija = new Destinacija(data.id, data.naziv, data.zemlja, data.nazivAerodroma);
                            inputZemlja.value = preuzetaDestinacija.zemlja;
                            inputnazivAerodroma.value = preuzetaDestinacija.nazivAerodroma;
                        }));;
                        inputNaziv.value = destinacijaNovi;
                        inputVreme.innerHTML = novoVreme.value;
                        inputDuzina.innerHTML = novaduzinaLeta.value;

                        inputNaziv.style.display = "block";
                        select.style.display = "none ";
                        inputZemlja.style.display = "block";
                        dugmeSave.style.display = "none";
                        dugmeUpdate.style.display = "block";
                        inputVreme.disabled = true;
                        inputDuzina.disabled = true;
                        inputnazivAerodroma.disabled = true;
                        inputZemlja.disabled = true;
                        inputNaziv.disabled = true;
                    } else {
                        alert("Izmena nije uspesna");
                    }
                });
            }
        }

    }
}