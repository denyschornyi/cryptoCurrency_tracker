const cryptoLink = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';

function getData(link, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4 &&  xhr.status === 200){
            callback(JSON.parse(xhr.response).Data);
        }
    }
    xhr.send();
}

getData(cryptoLink, data =>{
    console.log(data);
});

