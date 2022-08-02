async function main() {
    const result = await axios('https://api.covid19api.com/summary');

    const global = result.data.Global;

    //Alimentando painel da esquerda
    document.querySelector('#confirmed').innerHTML = global.TotalConfirmed.toLocaleString('pt-BR');
    document.querySelector('#death').innerHTML = global.TotalDeaths.toLocaleString('pt-BR');
    document.querySelector('#recovered').innerHTML = global.TotalRecovered.toLocaleString('pt-BR');
    document.querySelector('#date').innerHTML = `Data de atualização: ${dateFns.format(global.Date,'DD.MM.YYYY HH:mm')}`;

    //Alimentando painel da direita
    let pizza = new Chart('pizza', {
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
    console.log(global)

}

main()