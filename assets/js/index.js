async function main() {
    const result = await axios('https://api.covid19api.com/summary');

    const global = result.data.Global;

    document.querySelector('#confirmed').innerHTML = global.TotalConfirmed;
}

main()