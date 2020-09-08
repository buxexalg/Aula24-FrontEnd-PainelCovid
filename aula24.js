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

            const datasetDatas = [];
            const datasetCasos = [];

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
            
                

                datasetDatas.push(dia.innerText);
                datasetCasos.push(casos.innerText);
            }

            const dataset = [];
            dataset.push(datasetDatas.reverse());
            dataset.push(datasetCasos.reverse());
            return dataset;
        })
        .then((dataset) => {

            const casosDiarios = dataset[1].map((item, i, array) => {
                return item - array[i-1];
            })
            casosDiarios[0] = dataset[1][0];

            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dataset[0],
                    datasets: [{
                        label: 'Casos por Dia',
                        data: casosDiarios,
                        backgroundColor: ['#7987d9']
                    }]
                },
            });

            const myChart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: dataset[0],
                    datasets: [{
                        label: 'Casos',
                        data: dataset[1],
                        backgroundColor: ['#7987d9']
                    }]
                },
            });
        })

const dados = document.querySelector(".dados");
const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');

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

