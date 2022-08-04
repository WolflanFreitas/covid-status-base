var mychart;

async function main() {
    const resultadoNomePaises = await axios('https://api.covid19api.com/countries');
    const result = await axios('https://api.covid19api.com/summary');

    const countries = resultadoNomePaises.data;

    let combo = document.querySelector('#cmbCountry');
    const paises = countries.map(country => country.Country).sort();

    for (let pais of paises) {
        let option = document.createElement('option');
        option.value = pais;
        option.innerHTML = pais;
        if (pais === "Brazil")
            option.selected = true;
        combo.appendChild(option);
    }

    document.querySelector('#filtro').addEventListener('click', async function filtrar() {
        let date_start = `${document.querySelector('#date_start').value}T00:00:00Z`;
        let date_end = `${document.querySelector('#date_end').value}T23:59:59Z`;

        let pais = document.querySelector('#cmbCountry').value;

        date_start = dateFns.subDays(date_start, 1);

        let url = `https://api.covid19api.com/country/${pais}?from=${date_start}&to=${date_end}`;

        const pais_filtro_datas = await axios(url);

        if (mychart !== undefined)
            mychart.destroy();

        switch (document.querySelector('#cmbData').value) {
            case "Confirmed":
                let confirmados = pais_filtro_datas.data.map(data => data.Confirmed);

                confirmados = confirmados.map((value, index) => {
                    var before = confirmados[index - 1];
                    if (before !== undefined) {
                        return value - before;
                    }
                });

                confirmados = confirmados.filter(value => value !== undefined);

                let mediaConfirmados = confirmados.map(() => {
                    return confirmados.reduce((a, b) => {
                        return a + b;
                    }) / confirmados.length;
                })

                let datasConfirmados = pais_filtro_datas.data.map(data => data.Date.split('T')[0]);
                datasConfirmados.shift();

                mychart = new Chart('linhas', {
                    type: 'line',
                    data: {
                        labels: datasConfirmados,
                        datasets: [{
                            label: 'Número de Confirmados',
                            backgroundColor: '#FF6384',
                            borderColor: '#FF6384',
                            data: confirmados,
                            fill: false,
                        }, {
                            label: 'Média de Confirmados',
                            backgroundColor: '#FFCE56',
                            borderColor: '#FFCE56',
                            data: mediaConfirmados,
                            fill: false,
                        }],
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: "Curva diária de Confirmados com Covid-19",
                                font: {
                                    size: 20,
                                }
                            }
                        }
                    }
                })
                break;
            case "Deaths":
                let mortes = pais_filtro_datas.data.map(data => data.Deaths);

                mortes = mortes.map((value, index) => {
                    var before = mortes[index - 1];
                    if (before !== undefined) {
                        return value - before;
                    }
                });

                mortes = mortes.filter(value => value !== undefined);

                let media = mortes.map(() => {
                    return mortes.reduce((a, b) => {
                        return a + b;
                    }) / mortes.length;
                })

                let datasMortes = pais_filtro_datas.data.map(data => data.Date.split('T')[0]);
                datasMortes.shift();

                mychart = new Chart('linhas', {
                    type: 'line',
                    data: {
                        labels: datasMortes,
                        datasets: [{
                            label: 'Número de Mortes',
                            backgroundColor: '#FF6384',
                            borderColor: '#FF6384',
                            data: mortes,
                            fill: false,
                        }, {
                            label: 'Média de mortes',
                            backgroundColor: '#FFCE56',
                            borderColor: '#FFCE56',
                            data: media,
                            fill: false,
                        }],
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: "Curva diária de mortes por Covid-19",
                                font: {
                                    size: 20,
                                }
                            }
                        }
                    }
                })
                break;
            case "Recovered":
                let recuperados = pais_filtro_datas.data.map(data => data.Recovered);

                recuperados = recuperados.map((value, index) => {
                    var before = recuperados[index - 1];
                    if (before !== undefined) {
                        return value - before;
                    }
                });

                recuperados = recuperados.filter(value => value !== undefined);

                let mediaRecuperados = recuperados.map(() => {
                    return recuperados.reduce((a, b) => {
                        return a + b;
                    }) / recuperados.length;
                })

                let datasRecuperados = pais_filtro_datas.data.map(data => data.Date.split('T')[0]);
                datasRecuperados.shift();

                mychart = new Chart('linhas', {
                    type: 'line',
                    data: {
                        labels: datasRecuperados,
                        datasets: [{
                            label: 'Número de Recuperados',
                            backgroundColor: '#FF6384',
                            borderColor: '#FF6384',
                            data: recuperados,
                            fill: false,
                        }, {
                            label: 'Média de Recuperados',
                            backgroundColor: '#FFCE56',
                            borderColor: '#FFCE56',
                            data: mediaRecuperados,
                            fill: false,
                        }],
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: "Curva diária de Recuperados de Covid-19",
                                font: {
                                    size: 20,
                                }
                            }
                        }
                    }
                })
                break;
        }

        let totalConfirmados = pais_filtro_datas.data.map(data => data.Confirmed);

        totalConfirmados = totalConfirmados.map((value, index) => {
            var before = totalConfirmados[index - 1];
            if (before !== undefined) {
                return value - before;
            }
        });

        totalConfirmados = totalConfirmados.filter(value => value !== undefined);

        totalConfirmados = totalConfirmados.reduce((a, b) => {
            return a + b
        });

        let totalMortes = pais_filtro_datas.data.map(data => data.Deaths);

        totalMortes = totalMortes.map((value, index) => {
            var before = totalMortes[index - 1];
            if (before !== undefined) {
                return value - before;
            }
        });

        totalMortes = totalMortes.filter(value => value !== undefined);

        totalMortes = totalMortes.reduce((a, b) => {
            return a + b
        });

        let totalRecuperados = pais_filtro_datas.data.map(data => data.Recovered);

        totalRecuperados = totalRecuperados.map((value, index) => {
            var before = totalRecuperados[index - 1];
            if (before !== undefined) {
                return value - before;
            }
        });

        totalRecuperados = totalRecuperados.filter(value => value !== undefined);

        totalRecuperados = totalRecuperados.reduce((a, b) => {
            return a + b
        });

        console.log(totalConfirmados, totalMortes, totalRecuperados);

        document.querySelector('#kpiconfirmed').innerHTML = totalConfirmados.toLocaleString('pt-BR');
        document.querySelector('#kpideaths').innerHTML = totalMortes.toLocaleString('pt-BR');
        document.querySelector('#kpirecovered').innerHTML = totalRecuperados.toLocaleString('pt-BR');
    });

}

function renderInfoCountry(pais, base) {
    let paisSelecionado = base.find(country => country.Country === pais);

    document.querySelector('#kpiconfirmed').innerHTML = paisSelecionado.TotalConfirmed.toLocaleString('pt-BR');
    document.querySelector('#kpideaths').innerHTML = paisSelecionado.TotalDeaths.toLocaleString('pt-BR');
    document.querySelector('#kpirecovered').innerHTML = paisSelecionado.TotalRecovered.toLocaleString('pt-BR');
}

main()