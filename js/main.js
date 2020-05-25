let cryptoTableBody = document.querySelector('.crypto-tbody');
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
getData(cryptoLink, renderLine);

function renderLine(data){
    let line = ``;
    
    for(let i = 0; i<data.length; i++){
        line += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].CoinInfo.Name}</td>
                <td>${data[i].CoinInfo.FullName}</td>
                <td>${data[i].DISPLAY.USD.PRICE}</td>
                <td>${(data[i].DISPLAY.USD.MKTCAP)}</td>
            </tr>
        `;
    
    }
    cryptoTableBody.innerHTML = line;
    console.log(data[0]);
}



