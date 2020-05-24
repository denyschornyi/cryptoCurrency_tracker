const cryptoLink = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
function getData(link){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', link);
    xhr.onreadystatechange = () =>{
        if ((xhr.readyState==4) && (xhr.status==200)) {
            console.log(JSON.parse(xhr.response));
        }
    };
    
    xhr.send();
}
getData(cryptoLink);