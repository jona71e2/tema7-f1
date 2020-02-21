    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id);

    let personer = [];

    const endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

    const detalje = document.querySelector("#detalje");

    document.addEventListener("DOMContentLoaded", start);

    function start() {
        loadData();
    }
    async function loadData() {
        const response = await fetch(endpoint);
        personer = await response.json();
        console.log(personer);

        visPersoner();
    }

    function visPersoner() {
        detalje.querySelector("button").addEventListener("click", () => {
            history.back();
        });
        personer.feed.entry.forEach(person => {
            if (ret.gsx$id.$t == id) {
                detalje.querySelector(".navn").textContent = ret.gsx$navn.$t;
                detalje.querySelector(".navn").textContent += " - " + ret.gsx$pris.$t + " dkk,-";
                detalje.querySelector("img").src = "" + ret.gsx$billede.$t + ".jpg";
                detalje.querySelector("p:nth-child(2)").textContent = `Kategori: ${ret.gsx$kategori.$t}`;
                detalje.querySelector("p:nth-child(3)").textContent = `Oprindelse: Retten stammer originalt fra ${ret.gsx$oprindelse.$t}`;
                detalje.querySelector("p:nth-child(4)").textContent = `Beskrivelse: ${ret.gsx$lang.$t}`;


            }
        });
    }
