async function main() {
    const result = await axios('https://api.covid19api.com/summary');

    const global = result.data.Global;

    document.querySelector('#confirmed').innerHTML = global.TotalConfirmed.toLocaleString('pt-BR');
    document.querySelector('#death').innerHTML = global.TotalDeaths.toLocaleString('pt-BR');
    document.querySelector('#recovered').innerHTML = global.TotalRecovered.toLocaleString('pt-BR');
    document.querySelector('#date').innerHTML = `Data de atualização: ${dateFns.format(global.Date,'DD.MM.YYYY HH:mm')}`;

    console.log(global)
    console.log(dateFns.isToday(new Date()))
}

main()