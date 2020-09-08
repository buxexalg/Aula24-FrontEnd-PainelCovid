fetch("https://extreme-ip-lookup.com/json/")
        .then(objetoIP => objetoIP.json())
        .then(respostaJSON => {
            document.querySelector(".cidade").innerText = respostaJSON.city;
            document.querySelector(".estado").innerText = respostaJSON.region;

            return fetch(`https://brasil.io/api/dataset/covid19/caso/data/?format=json&city=${respostaJSON.city}&state=${transformaEstado(respostaJSON.region)}`)
        })
        .then((dadosCOVID) => {
            return dadosCOVID.json();
        })
        .then((jsonCOVID) => {
            document.querySelector(".casos").innerText = jsonCOVID.results[0].confirmed;

            for (const item of jsonCOVID.results) {
                const elemento = document.createElement("li");
                const dia = document.createElement("div");
                const casos = document.createElement("div");

                dia.classList.add("dia");
                casos.classList.add("casos");

                const data = item.date
                .split("-")
                .reverse()
                .join("/");

                dia.innerText = data;
                casos.innerText = item.confirmed;

                elemento.append(dia);
                elemento.append(casos);
                dados.append(elemento);
            }
        })

const dados = document.querySelector(".dados");

const transformaEstado = (estado) => {
    
    const estadoSigla = {
        "Acre": "AC",
        "Alagoas": "AL",
        "Amapá": "AP",
        "Amazonas": "AM",
        "Bahia": "BA",
        "Ceará": "CE",
        "Distrito Federal": "DF",
        "Espírito Santo": "ES",
        "Goiás": "GO",
        "Maranhão": "MA",
        "Mato Grosso": "MT",
        "Mato Grosso do Sul": "MS",
        "Minas Gerais": "MG",
        "Pará": "PA",
        "Paraíba": "PB",
        "Paraná": "PR",
        "Pernambuco": "PE",
        "Piauí": "PI",
        "Rio de Janeiro": "RJ",
        "Rio Grande do Norte": "RN",
        "Rio Grande do Sul": "RS",
        "Rondônia": "RO",
        "Roraima": "RR",
        "Santa Catarina": "SC",
        "São Paulo": "SP",
        "Sergipe": "SE",
        "Tocantins": "TO"
    };

    return estadoSigla[estado];
}