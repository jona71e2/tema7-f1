    document.addEventListener("DOMContentLoaded", start);

    //definerer variabler og fortæller hvor vi skal hente data fra
    let personer = [];
    const endpoint = "https://spreadsheets.google.com/feeds/list/1TWR1C-JT5gHIJvWFRNAQ7t484Ty6hoRx81ws-9H1UqM/od6/public/values?alt=json";
    const detalje = document.querySelector("#detalje");
    //https://docs.google.com/spreadsheets/d/1TWR1C-JT5gHIJvWFRNAQ7t484Ty6hoRx81ws-9H1UqM/edit?fbclid=IwAR3lYX9CcWxwW0OONkhH7JS5Ef-tueHiHzzoPx9hAmka9JG0iff5LhW48Mk#gid=0
    let filter = "alle";

    //Ved indlæsning af hjemmesiden kaldes hentData
    function start() {
        console.log("start");
        hentData();
    }

    //function der henter data fra spreadsheet
    async function hentData() {
        console.log("Data");
        const response = await fetch(endpoint);
        console.log(response);
        personer = await response.json();
        console.log(personer);
        visPersoner();
        addEventlistenersToButtons();

    }

    //gør filtreringsmenuen klikbar
    function addEventlistenersToButtons() {
        console.log("Knap Eventlisteners");
        document.querySelectorAll(".filter").forEach(elm => {
            elm.addEventListener("click", filtrering);
        })
    }

    //gør så når man trykker på filtreringsmenuen filtrerer den
    function filtrering() {
        console.log("Filtrering");
        filter = this.dataset.kategori;
        document.querySelectorAll(".filter").forEach(elm => {
            elm.classList.remove("valgt");
        })
        this.classList.add("valgt");
        visPersoner();
    }

    //viser information for hver person der indgår i filtreringen, hentet fra spreadsheet, og sætter det ind i vores template
    function visPersoner() {
        console.log("visPersoner function");

        const destination = document.querySelector("article");
        const container = document.querySelector("#data-container");
        const personerTemplate = document.querySelector("template");
        container.innerHTML = "";

        //for hver person vi har i vores spreadsheet skal den indsætte relevante information i template, hvis de opfylder if statement
        personer.feed.entry.forEach(person => {
            if (filter == "alle" || filter == person.gsx$kategori.$t) {

                let klon = personerTemplate.cloneNode(true).content;
                klon.querySelector("#fornavn").textContent = `${person.gsx$fornavn.$t}`;
                klon.querySelector("#efternavn").textContent = `${person.gsx$efternavn.$t}`;
                //klon.querySelector(".flag").src = "billeder/flag/" + person.gsx$land.$t + ".jpg";
                klon.querySelector(".flag").src = "billeder/flag/" + person.gsx$land.$t + ".svg";
                klon.querySelector(".profil-billede").src = "billeder/drivers/" + person.gsx$billede.$t;
                klon.querySelector("h3").textContent = `${person.gsx$kategori.$t}`;
                klon.querySelector("article").style.borderBottom = `solid 5px #${person.gsx$farver.$t}`;
                klon.querySelector("article").style.borderRight = `solid 5px #${person.gsx$farver.$t}`;

                //hvis man trykker på en af personerne, skal den køre functionen visDetalje, hvor den hiver variablen person med
                klon.querySelector("article").addEventListener("click", () => visDetalje(person));

                container.appendChild(klon);


            }

        })
    }

    //fjerner klassen "hide" fra sectionen "detalje", som derfor fungerer som en pop-up, da den nu kommer frem
    function visDetalje(person) {
        detalje.classList.remove("hide");
        detalje.querySelector("button").addEventListener("click", () => detalje.classList.add("hide"));
        console.log(person.gsx$fornavn.$t);
        console.log(person.gsx$efternavn.$t);

        //Her definerer vi hvilke informationer fra spreadsheetet vi vil have vist i vores pop-up view

        //            detalje.querySelector(".profil-billede").src = "billeder/drivers/" + person.gsx$billede.$t;
        detalje.querySelector(".flag").src = "billeder/flag/" + person.gsx$land.$t + ".svg";
        detalje.querySelector("#fornavn_detalje").textContent = `${person.gsx$fornavn.$t}`;
        detalje.querySelector("#efternavn_detalje").textContent = `${person.gsx$efternavn.$t}`;
        detalje.querySelector(".profil-billede").src = "billeder/drivers/" + person.gsx$billede.$t;
        detalje.querySelector("h3").textContent = `${person.gsx$kategori.$t}`;
        detalje.querySelector("li").textContent = `Løb: ${person.gsx$starter.$t}`;
        detalje.querySelector("li:nth-child(2)").textContent = `Podier: ${person.gsx$podier.$t}`;
        detalje.querySelector("li:nth-child(3)").textContent = `Sejre: ${person.gsx$sejre.$t}`;
        detalje.querySelector("li:nth-child(4)").textContent = `Point: ${person.gsx$points.$t}`;
        detalje.querySelector("li:nth-child(5)").textContent = `VM: ${person.gsx$verdensmesterskaber.$t}`;
        detalje.querySelector("p").textContent = `${person.gsx$bio.$t}`;





    }
