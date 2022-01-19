import { Avion } from "./avion.js"
export class Aviokompanija {
    constructor(id, naziv, lokacija) {
        this.id = id;
        this.naziv = naziv;
        this.lokacija = lokacija;
        this.avioni = new Array();
        this.kontejner = null;
        this.unosKontejner = null; ///sluzi za pamcenje levog diva za unos
    }

    crtanjeDodavanjeAviokompanija(divAviokompanija) {
        var h3 = document.createElement("h3");
        h3.innerHTML = "Kreiranje aviokompanije";
        divAviokompanija.appendChild(h3);

        var newLine = document.createElement("br");
        divAviokompanija.appendChild(newLine);

        var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv aviokompanije:";
        divAviokompanija.appendChild(labNaziv);

        newLine = document.createElement("br");
        divAviokompanija.appendChild(newLine);

        var input = document.createElement("input");
        input.className = "nazivAviokompanija";
        input.type = "text";
        divAviokompanija.appendChild(input);

        newLine = document.createElement("br");
        divAviokompanija.appendChild(newLine);

        var lablokacija = document.createElement("label");
        lablokacija.innerHTML = "Unesite lokaciju sedišta aviokompanije:";
        divAviokompanija.appendChild(lablokacija);

        newLine = document.createElement("br");
        divAviokompanija.appendChild(newLine);

        input = document.createElement("input");
        input.className = "lokacijaAviokompanija";
        input.type = "text";
        divAviokompanija.appendChild(input);

        newLine = document.createElement("br");
        divAviokompanija.appendChild(newLine);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj aviokompaniju";
        dugme.className = "DodavanjeAviokompanije";
        divAviokompanija.appendChild(dugme);

        dugme.onclick = (ev) => {
            var naziv = divAviokompanija.querySelector(".nazivAviokompanija").value;
            var lokacija = divAviokompanija.querySelector(".lokacijaAviokompanija").value;

            if ((naziv != "") && (lokacija != "")) {
                fetch("https://localhost:5001/Aviokompanija/DodavanjeAviokompanije", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "naziv": naziv,
                        "lokacija": lokacija
                    })
                }).then(p => {
                    if (p.ok) {
                        fetch("https://localhost:5001/Aviokompanija/PreuzimanjeAviokompanije", {

                            method: "GET"
                        }).then(p => p.json().then(data => {
                            var opcija1 = document.createElement("option");
                            opcija1.value = data[data.length - 1].id;
                            opcija1.innerHTML = data[data.length - 1].naziv + " " + data[data.length - 1].lokacija;
                            var selektAK = document.querySelector('select[name="sel"]'); //////////////////////////////////////
                            selektAK.appendChild(opcija1);

                        }));
                        alert("Uspesno dodata aviokompanija!");
                    } else {
                        alert("Nepravilno uneti podaci");
                    }
                })
            } else alert("Nepravilno uneti podaci");
        }
    }

    crtanjeDodavanjeAvionaUOkviruAviokompanije(divUnosPodataka) {
        var h3 = document.createElement("h3");
        h3.innerHTML = "Uključivanje aviona u saobraćaj";
        divUnosPodataka.appendChild(h3);
        this.unosKontejner = divUnosPodataka;

        var newLine = document.createElement("br");

        var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv aviona:";
        divUnosPodataka.appendChild(labNaziv);

        var input = document.createElement("input");
        input.className = "nazivAviona";
        input.type = "text";
        divUnosPodataka.appendChild(input);

        var labSedista = document.createElement("label");
        labSedista.innerHTML = "Unesite broj sedista:";
        divUnosPodataka.appendChild(labSedista);

        input = document.createElement("input");
        input.className = "brojSedista";
        input.type = "number";
        divUnosPodataka.appendChild(input);

        var labtip = document.createElement("label");
        labtip.innerHTML = "Izaberite tip aviona:";
        divUnosPodataka.appendChild(labtip);

        var selectTipAviona = document.createElement("select");
        selectTipAviona.name = "vrstaAviona1";
        selectTipAviona.required = true;
        divUnosPodataka.appendChild(selectTipAviona);

        let tipoviAviona = ["Boeing 737", "Boeing 747", "Boeing 757", "Boeing 767", "Boeing 777", "Boeing 787", "Airbus 220", "Airbus 310", "Airbus 320", "Airbus 330", "Airbus 340", "Airbus 350", "Airbus 380"];

        tipoviAviona.forEach((tipAviona, i) => {

            let opcija = document.createElement("option");
            opcija.value = tipoviAviona[i];
            opcija.innerHTML = tipAviona;
            selectTipAviona.appendChild(opcija);
        })

        newLine = document.createElement("br");
        divUnosPodataka.appendChild(newLine);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Uključivanje aviona u saobraćaj";
        dugme.className = "dodajAvion";
        divUnosPodataka.appendChild(dugme);

        newLine = document.createElement("br");
        divUnosPodataka.appendChild(newLine);

        var dugmeUcitajAvione = document.createElement("button");
        dugmeUcitajAvione.className = "dugmeUcitajAvione";
        dugmeUcitajAvione.innerHTML = "Učitavanje svih aviona"; ///////////dugme kojim se potvrdjuje prikaz
        divUnosPodataka.appendChild(dugmeUcitajAvione);

        var divPrikazAvionaZaRezervisanje = document.createElement("div");
        divPrikazAvionaZaRezervisanje.className = "divPrikazAvionaZaRezervisanje";
        divUnosPodataka.appendChild(divPrikazAvionaZaRezervisanje);

        dugme.onclick = (ev) => { ////dugmeUcitajAvione

            var nazivAviona = divUnosPodataka.querySelector(".nazivAviona").value;
            var brojSedista = divUnosPodataka.querySelector(".brojSedista").value;
            var modelA = divUnosPodataka.querySelector('select[name="vrstaAviona1"]').value;
            var idAk = this.id;

            if ((nazivAviona != "") && (brojSedista != "")) {
                fetch("https://localhost:5001/Aviokompanija/DodavanjeAviona/" + idAk, {
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

                        fetch("https://localhost:5001/Aviokompanija/PreuzimanjePoslednjegAvionaIzAviokompanije/ " + this.id, {
                            method: "GET"
                        }).then(p => p.json().then(data => {
                            // let avion1 = new Avion(data[data.length - 1].id, data[data.length - 1].kodniNaziv, data[data.length - 1].brojSedista, data[data.length - 1].model);
                            let avion1 = new Avion(data.id, data.kodniNaziv, data.brojSedista, data.model);
                            avion1.prikaz(this.kontejner);
                            this.avioni.push(avion1);
                        }));
                        let dugmeUcitajAvione = this.unosKontejner.querySelector(".dugmeUcitajAvione");
                        this.pravljenjeTermina(divPrikazAvionaZaRezervisanje, dugmeUcitajAvione); ////ovde takodje imam pravljenje termina jer ucitavam novi avion pa se prikaz aviona za zakazivanje mora promeniti

                        dugmeUcitajAvione.disabled = false;
                    } else {
                        alert("Nastala je greska prilikom dodavanja");
                    }
                });
            } else alert("Neophodno je uneti ispravne podatke!");
        }

        this.pravljenjeTermina(divPrikazAvionaZaRezervisanje, dugmeUcitajAvione);

    }
    crtanjeDodavanjeDestinacijeUnutarAviokompanije(divDestinacija) {
        var h3 = document.createElement("h3");
        h3.innerHTML = "Dodavanje nove destinacije";
        divDestinacija.appendChild(h3);

        var newLine = document.createElement("br");
        divDestinacija.appendChild(newLine);

        var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv destinacije:";
        divDestinacija.appendChild(labNaziv);

        var input = document.createElement("input");
        input.className = "nazivDestinacijaa";
        input.type = "text";
        divDestinacija.appendChild(input);


        var labzemlja = document.createElement("label");
        labzemlja.innerHTML = "Unesite državu destinacije:";
        divDestinacija.appendChild(labzemlja);

        input = document.createElement("input");
        input.className = "zemljaDestinacijaa";
        input.type = "text";
        divDestinacija.appendChild(input);

        var labnazivAerodroma = document.createElement("label");
        labnazivAerodroma.innerHTML = "Naziv aerodroma:";
        divDestinacija.appendChild(labnazivAerodroma);

        input = document.createElement("input");
        input.className = "nazivAerodroma";
        input.type = "text";
        divDestinacija.appendChild(input);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj destinacija";
        dugme.className = "DodavanjeDestinacija";

        divDestinacija.appendChild(newLine);

        divDestinacija.appendChild(dugme);

        dugme.onclick = (ev) => {
            var nazivDestinacijaa = divDestinacija.querySelector(".nazivDestinacijaa").value;
            var zemlja = divDestinacija.querySelector(".zemljaDestinacijaa").value;
            var imeAerodroma = divDestinacija.querySelector(".nazivAerodroma").value;

            if ((nazivDestinacijaa == "") || (zemlja == "") || (imeAerodroma == "")) {
                alert("Neophodno je uneti pravilne podatke"); /////////////////////
            } else {
                fetch("https://localhost:5001/Aviokompanija/DodavanjeDestinacija", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "Naziv": nazivDestinacijaa,
                        "zemlja": zemlja,
                        "nazivAerodroma": imeAerodroma,
                    })
                }).then(p => {
                    if (p.ok) {

                        let divCheckDestinacija = document.querySelector(".divCheck");
                        (divCheckDestinacija.parentNode).appendChild(divCheckDestinacija);

                        fetch("https://localhost:5001/Aviokompanija/PreuzimanjePoslednjeDodateDestinacije", {
                            method: "GET"
                        }).then(p => p.json().then(data => {

                            var cekDestinacija = document.createElement("input");
                            cekDestinacija.type = "checkbox";
                            cekDestinacija.value = data.id;
                            divCheckDestinacija.appendChild(cekDestinacija);

                            var labDestinacija = document.createElement("label");
                            labDestinacija.innerHTML = data.naziv;
                            divCheckDestinacija.appendChild(labDestinacija);

                        }));
                    } else {
                        alert("Greska prilikom dodavanja destinacije!");
                    }
                });
            }
        }
    }
    pravljenjeTermina(divPrikazAvionaZaRezervisanje, dugmeUcitajAvione) {
        var pronadjenDiv = this.unosKontejner.querySelector(".divPrikazAvionaZaRezervisanje1");
        if (pronadjenDiv != null) {
            pronadjenDiv.remove(); ////obrise trenutni sadrzaj ako postoji
        }

        var divPrikazAvionaZaRezervisanje1 = document.createElement("div");
        divPrikazAvionaZaRezervisanje1.className = "divPrikazAvionaZaRezervisanje1";
        divPrikazAvionaZaRezervisanje.appendChild(divPrikazAvionaZaRezervisanje1);

        var h4 = document.createElement("h4");
        h4.innerHTML = "Kreiranje leta";
        divPrikazAvionaZaRezervisanje1.appendChild(h4);

        var newLine = document.createElement("br");
        divPrikazAvionaZaRezervisanje1.appendChild(newLine);

        var labDestinacija = document.createElement("label");
        labDestinacija.innerHTML = "Izbor destinacija:";
        labDestinacija.className = "labDestinacija";
        divPrikazAvionaZaRezervisanje1.appendChild(labDestinacija);

        newLine = document.createElement("br");
        divPrikazAvionaZaRezervisanje1.appendChild(newLine);

        var divPrikazDestinacija = document.createElement("div");
        divPrikazDestinacija.className = "divPrikazDestinacija";
        divPrikazAvionaZaRezervisanje1.appendChild(divPrikazDestinacija);

        var divCheckDestinacija = document.createElement("div");
        divCheckDestinacija.className = "divCheck";
        divPrikazDestinacija.appendChild(divCheckDestinacija);

        fetch("https://localhost:5001/Aviokompanija/PreuzimanjeDestinacija", {
            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(destinacija => {
                var cekDestinacija = document.createElement("input");
                cekDestinacija.type = "checkbox";
                cekDestinacija.value = destinacija.id;
                divCheckDestinacija.appendChild(cekDestinacija);

                var labDestinacija = document.createElement("label");
                labDestinacija.innerHTML = destinacija.naziv;
                divCheckDestinacija.appendChild(labDestinacija);

            });
        }));
        newLine = document.createElement("br");
        divPrikazAvionaZaRezervisanje1.appendChild(newLine);

        newLine = document.createElement("br");
        divPrikazAvionaZaRezervisanje1.appendChild(newLine);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        dugmeUcitajAvione.onclick = (ev) => {

            var divIzborAviona = document.createElement("div");
            divIzborAviona.className = "divIzborAviona" + this.id;
            divIzborAviona.innerHTML = "Izbor aviona:"
            divPrikazAvionaZaRezervisanje1.appendChild(divIzborAviona);

            fetch("https://localhost:5001/Aviokompanija/PreuzimanjeAvionaIzAviokompanije/" + this.id, {

                method: "GET"
            }).then(p => p.json().then(data => {
                data.forEach(avion => {
                    var divCheck = document.createElement("div");
                    divCheck.className = "avion" + avion.id; ///div nazvan po Avionu koji se tu ispisuje( zbog brisanja)
                    divIzborAviona.appendChild(divCheck);

                    var cb = document.createElement("input");
                    cb.type = "checkbox";
                    cb.name = "avion";
                    cb.value = avion.id;
                    divCheck.appendChild(cb);

                    var labkodniNaziv = document.createElement("label");
                    labkodniNaziv.innerHTML = avion.kodniNaziv;
                    labkodniNaziv.className = "labRadio";
                    divCheck.appendChild(labkodniNaziv);

                    var br = document.createElement("br");
                    divCheck.appendChild(br);

                    var labOdlazni = document.createElement("label");
                    labOdlazni.innerHTML = "odlazni";
                    labOdlazni.className = "odlazni";
                    divCheck.appendChild(labOdlazni);

                    var rbOdlazni = document.createElement("input");
                    rbOdlazni.type = "radio";
                    rbOdlazni.name = "odlazniDolazni" + avion.id;
                    rbOdlazni.value = "odlazni" + avion.id;
                    divCheck.appendChild(rbOdlazni);

                    var labDolazni = document.createElement("label");
                    labDolazni.innerHTML = "dolazni";
                    labDolazni.className = "dolazni";
                    divCheck.appendChild(labDolazni);

                    var rbDolazni = document.createElement("input");
                    rbDolazni.type = "radio";
                    rbDolazni.name = "odlazniDolazni" + avion.id; ///mora isti class name da im bude
                    rbDolazni.value = "dolazni" + avion.id;
                    divCheck.appendChild(rbDolazni);

                    var br = document.createElement("br");
                    divCheck.appendChild(br);
                });
            }));
            var br = document.createElement("br");
            divPrikazAvionaZaRezervisanje1.appendChild(br);

            var labOdDol = document.createElement("label");
            labOdDol.innerHTML = "Unos vremena i dužine trajanja leta u minutima";
            divPrikazAvionaZaRezervisanje1.appendChild(labOdDol);

            var input = document.createElement("input");
            input.type = "date";
            input.className = "datum";
            input.name = "datum";
            divPrikazAvionaZaRezervisanje1.appendChild(input); //

            var input = document.createElement("input");
            input.type = "time";
            input.className = "vreme";
            input.name = "vreme";
            divPrikazAvionaZaRezervisanje1.appendChild(input);

            var input1 = document.createElement("input");
            input1.type = "input";
            input1.className = "duzina";
            input1.name = "duzina";
            divPrikazAvionaZaRezervisanje1.appendChild(input1);
            //////////////////////////////////////////////////////
            var br = document.createElement("br");
            divPrikazAvionaZaRezervisanje1.appendChild(br);
            dugmeUcitajAvione.disabled = true;

            var dugmeDodajTerminLetaZaAvion = document.createElement("button");
            dugmeDodajTerminLetaZaAvion.innerHTML = "Dodaj vreme leta za avion";
            dugmeDodajTerminLetaZaAvion.className = "dodajterminletazaavion";
            dugmeDodajTerminLetaZaAvion.disabled = false;
            divPrikazAvionaZaRezervisanje1.appendChild(dugmeDodajTerminLetaZaAvion);

            dugmeDodajTerminLetaZaAvion.onclick = (ev) => {
                divCheckDestinacija = this.unosKontejner.querySelector(".divCheck"); ////
                if (divCheckDestinacija.querySelector('input[type="checkbox"]:checked') != null) {
                    var destinacijaIzabranaID = divCheckDestinacija.querySelector('input[type="checkbox"]:checked').value;
                } else alert("Nije izabrana nijedna destinacija!");

                var avionIzabranID = divIzborAviona.querySelector('input[type="checkbox"]:checked').value;

                let dt = this.unosKontejner.querySelector('input[name="datum"]').value;
                let vr = this.unosKontejner.querySelector('input[name="vreme"]').value;
                let duzinaLeta = this.unosKontejner.querySelector('input[name="duzina"]').value;

                let datumIVreme = dt + " " + vr;
                let odlazni = this.unosKontejner.querySelector('input[name="odlazniDolazni' + avionIzabranID + '"]:checked').value;
                var odlazniYN = 0;
                var odDol = "sletanja";
                if (odlazni.substring(0, 7) == "odlazni") {
                    odlazniYN = 1;
                    odDol = "poletanja";
                    labOdDol.innerHTML = " Unos vremena " + odDol + " i dužine trajanja leta u minutima ";
                } else labOdDol.innerHTML = " Unos vremena " + odDol + " i dužine trajanja leta u minutima ";

                fetch("https://localhost:5001/Aviokompanija/DodelaDestinacijeIZakazivanjeLetaAviona/ " + destinacijaIzabranaID + " / " + avionIzabranID + " / " + datumIVreme, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        //  "Vreme": datumIVreme,//objekat dateTime proslediti kroz json ja nisam uspeo
                        "odlazniLet": odlazniYN,
                        "duzinaLeta": duzinaLeta,
                    })

                }).then(p => {
                    if (p.ok) {
                        this.uzmimanjeAvionaIzAviokompanijeIDocrtavanje(avionIzabranID);
                        // console.log(this.id, avionIzabranID);
                    } else {
                        alert("Nastala je greska, najverovatnije niste uneli datum u opsegu koji je se prati ili je trajanje leta veća 1000 minuta!");
                    }
                });
            }
        }
    }

    crtanjePrikazaAviokompanije(host) {
        let divNaslov = document.createElement("div");
        divNaslov.className = "divNaslov";
        host.appendChild(divNaslov);

        let divKompanija = document.createElement("div");
        divKompanija.className = "divAvio";
        this.kontejner = divKompanija;
        host.appendChild(this.kontejner);

        let labNaziv = document.createElement("label");
        labNaziv.className = "labNaziv";
        labNaziv.innerHTML = this.naziv;
        divNaslov.appendChild(labNaziv);

        let lablokacija = document.createElement("label");
        lablokacija.className = "lablokacija";
        lablokacija.innerHTML = this.lokacija;
        divNaslov.appendChild(lablokacija);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.innerHTML = "Brisanje";
        dugmeObrisi.className = "dugmeObrisi";
        divNaslov.appendChild(dugmeObrisi);

        dugmeObrisi.onclick = (ev) => {
            fetch("https://localhost:5001/Aviokompanija/BrisanjeAviokompanije/" + this.id, {
                method: "DELETE"
            }).then(p => {
                if (p.ok) {
                    this.kontejner.parentNode.parentNode.style.display = "none";
                } else {
                    alert("Doslo je do greske!");
                }
            });
        }
        this.uzimanjeAvionaIzAviokompanijeIcrtanje(divKompanija);

        //   this.selektovanjeAviona(divKompanija);
    }
    uzimanjeAvionaIzAviokompanijeIcrtanje(divAviokompanija) { /////sluzi za pocetni prikaz I VRACA SVE AVIONE
        fetch("https://localhost:5001/Aviokompanija/PreuzimanjeAvionaIzAviokompanije/" + this.id, {

            method: "GET"
        }).then(p => p.json().then(data => {

            data.forEach(el => {

                let avion = new Avion(el.id, el.kodniNaziv, el.brojSedista, el.model);
                avion.prikaz(divAviokompanija);

                this.avioni.push(avion); /////doda svaki nacrtani avion u niz aviona
            })
        }));
    }
    uzmimanjeAvionaIzAviokompanijeIDocrtavanje(idAvionaKojiSeUpdatuje) {
        /* fetch("https://localhost:5001/Aviokompanija/PreuzimanjeAvionaIzAviokompanije/" + this.id, {
            method: "GET"
        }).then(p => p.json().then(data => {
            data*/
        let i = 0; ///brojac ucitanih aviona iz niza this.avioni, sluzi za lociranje diva
        this.avioni.forEach(el => {
            let avion = new Avion(el.id, el.kodniNaziv, el.brojSedista, el.model);
            var decaDivovi = (this.kontejner).childNodes;
            if (el.id == idAvionaKojiSeUpdatuje) { ///selektuje samo taj avion koji se updatuje i pravi taj div ponovo
                (decaDivovi[i].parentNode).removeChild(decaDivovi[i]);
                (this.avioni).splice(i, 1);
                avion.prikaz(this.kontejner);
                (this.avioni).push(el); ////ustvari drawUpdate crta ponovo div sa avionom kom se menjaju termini
                /* console.log(this.kontejner);console.log(avion.kontejner); console.log(avion.kontejner.parentNode);
                 */ ////dodaje novu destinaciju tako sto ucita ponovo div avona kom se menja vreme. 
            }
            i++;
        })
    }
} //////////////todo uneti polje gde se unose datumi i biraju se samo avioni koji imaju letove u tom opsegu