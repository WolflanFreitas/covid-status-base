async function main() {
    const result = await axios('https://api.covid19api.com/summary');

    const global = result.data.Global;
    const countries = result.data.Countries;

    //Alimentando painel da esquerda
    document.querySelector('#confirmed').innerHTML = global.TotalConfirmed.toLocaleString('pt-BR');
    document.querySelector('#death').innerHTML = global.TotalDeaths.toLocaleString('pt-BR');
    document.querySelector('#recovered').innerHTML = global.TotalRecovered.toLocaleString('pt-BR');
    document.querySelector('#date').innerHTML = `Data de atualização: ${dateFns.format(global.Date,'DD.MM.YYYY HH:mm')}`;

    //Alimentando painel da direita
    new Chart('pizza', {
        type: 'pie',
        data: {
            labels: ['Confirmados', 'Recuperados', 'Mortos'],
            datasets: [{
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                data: [global.NewConfirmed, global.NewRecovered, global.NewDeaths]
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Distribuição de novos casos",
                    font: {
                        size: 20,
                    }
                }
            }
        }
    });

    let top10 = countries.sort((a, b) => {
        if (a.TotalDeaths > b.TotalDeaths) {
            return -1;
        }
        if (a.TotalDeaths < b.TotalDeaths) {
            return 1;
        }
        return 0;
    }).slice(0, 10);

    new Chart('barras', {
        type: 'bar',
        data: {
            labels: top10.map(country => country.Country),
            datasets: [{
                label: null,
                backgroundColor: 'purple',
                data: top10.map(country => country.TotalDeaths)
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Total de mortes por país - Top 10",
                    font: {
                        size: 20,
                    }
                },
                legend: {
                    display: false,
                }
            }
        }
    });

    console.log(top10.map(country => country.TotalDeaths));

}

main()