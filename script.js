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
                    klon.querySelector("#fornavn").textContent = `${person.gsx$fornavn.$t}`;
                    klon.querySelector("#efternavn").textContent = `${person.gsx$efternavn.$t}`;
                    //klon.querySelector(".flag").src = "billeder/flag/" + person.gsx$land.$t + ".jpg";
                    klon.querySelector(".flag").src = "billeder/flag/" + person.gsx$land.$t + ".svg";
                    klon.querySelector(".profil-billede").src = "billeder/drivers/" + person.gsx$billede.$t;
                    klon.querySelector("h3").textContent = `${person.gsx$kategori.$t}`;
                    klon.querySelector("article").style.borderBottom = `solid 5px #${person.gsx$farver.$t}`;
                    klon.querySelector("article").style.borderRight = `solid 5px #${person.gsx$farver.$t}`;
                    klon.querySelector("article").addEventListener("click", () => visDetalje(person));

                    container.appendChild(klon);


                }

            })
        }

        function visDetalje(person) {
            detalje.classList.remove("hide");
            detalje.querySelector("button").addEventListener("click", () => detalje.classList.add("hide"));
            console.log(person.gsx$navn.$t);

            detalje.querySelector("img").src = "billeder/drivers/" + person.gsx$billede.$t;
            detalje.querySelector(".flag").src = "billeder/flag/" + person.gsx$land.$t + ".svg";
            detalje.querySelector("h2").textContent = `${person.gsx$navn.$t}`;
            detalje.querySelector("h3").textContent = `${person.gsx$kategori.$t}`;
            detalje.querySelector("li").textContent = `Løb: ${person.gsx$starter.$t}`;
            detalje.querySelector("li:nth-child(2)").textContent = `Podier: ${person.gsx$podier.$t}`;
            detalje.querySelector("li:nth-child(3)").textContent = `Sejre: ${person.gsx$sejre.$t}`;
            detalje.querySelector("li:nth-child(4)").textContent = `Point: ${person.gsx$points.$t}`;
            detalje.querySelector("li:nth-child(5)").textContent = `VM: ${person.gsx$verdensmesterskaber.$t}`;
            detalje.querySelector("p").textContent = `${person.gsx$bio.$t}`;





        }
