        document.addEventListener("DOMContentLoaded", start);

        let personer = [];
        const endpoint = "https://spreadsheets.google.com/feeds/list/1TWR1C-JT5gHIJvWFRNAQ7t484Ty6hoRx81ws-9H1UqM/od6/public/values?alt=json";
        const detalje = document.querySelector("#detalje");
        //https://docs.google.com/spreadsheets/d/1TWR1C-JT5gHIJvWFRNAQ7t484Ty6hoRx81ws-9H1UqM/edit?fbclid=IwAR3lYX9CcWxwW0OONkhH7JS5Ef-tueHiHzzoPx9hAmka9JG0iff5LhW48Mk#gid=0
        let filter = "alle";

        function start() {
            console.log("start");
            hentData();
        }

        async function hentData() {
            console.log("Data");
            const response = await fetch(endpoint);
            console.log(response);
            personer = await response.json();
            console.log(personer);
            visPersoner();
            addEventlistenersToButtons();

        }

        function addEventlistenersToButtons() {
            console.log("Knap Eventlisteners");
            document.querySelectorAll(".filter").forEach(elm => {
                elm.addEventListener("click", filtrering);
            })
        }

        function filtrering() {
            console.log("Filtrering");
            filter = this.dataset.kategori;
            document.querySelectorAll(".filter").forEach(elm => {
                elm.classList.remove("valgt");
            })
            this.classList.add("valgt");
            visPersoner();
        }


        function visPersoner() {
            console.log("visPersoner function");

            const destination = document.querySelector("article");
            const container = document.querySelector("#data-container");
            const personerTemplate = document.querySelector("template");
            container.innerHTML = "";

            personer.feed.entry.forEach(person => {
                if (filter == "alle" || filter == person.gsx$kategori.$t) {
                    let klon = personerTemplate.cloneNode(true).content;
                    klon.querySelector("h2").textContent = `${person.gsx$navn.$t}`;
                    klon.querySelector(".flag").src = "billeder/flag/" + person.gsx$land.$t + ".jpg";
                    klon.querySelector(".profil-billede").src = "billeder/drivers/" + person.gsx$billede.$t;
                    klon.querySelector("h3").textContent = `${person.gsx$team.$t}`;
                    klon.querySelector("article").addEventListener("click", () => visDetalje(person));

                    container.appendChild(klon);

                    //link til indsætte billede
                    //klon.querySelector("img").src = "images/small/" + ret.gsx$billede.$t + "-sm.jpg";

                }

            })
        }

        function visDetalje(person) {
            detalje.classList.remove("hide");
            detalje.querySelector("button").addEventListener("click", () => detalje.classList.add("skjul"));
            console.log(person.gsx$navn.$t);


            detalje.querySelector(".navn").textContent = person.gsx$navn.$t;
            detalje.querySelector(".navn").textContent += " - " + person.gsx$pris.$t + " dkk,-";
            detalje.querySelector("img").src = "billeder/drivers/" + person.gsx$billede.$t;
            detalje.querySelector("p:nth-child(2)").textContent = `Kategori: ${person.gsx$kategori.$t}`;
            detalje.querySelector("p:nth-child(3)").textContent = `Oprindelse: Retten stammer originalt fra ${person.gsx$oprindelse.$t}`;
            detalje.querySelector("p:nth-child(4)").textContent = `Beskrivelse: ${person.gsx$lang.$t}`;





        }
