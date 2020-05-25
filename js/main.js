let cryptoTableBody = document.querySelector('.crypto-tbody');
const cryptoLink = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
const imgUrl = 'https://www.cryptocompare.com/';

let loading = `<div class="spinner-grow " role="status">
<span class="sr-only justify-content-center text-center align-middle" >Loading...</span>
</div>`;

function getData(link , callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4 &&  xhr.status === 200){
            callback(JSON.parse(xhr.response).Data);
        }
    }
    xhr.send();
    console.log('hey');
}
// getData(cryptoLink, renderLine);
setInterval(()=>{
    getData(cryptoLink, renderLine);
}, 3000);

function renderLine(data){
    let line = ``;
    if(data.length === undefined){
        cryptoTableBody.innerHTML = loading;

    }else{
        for(let i = 0; i<data.length; i++){
            line += `
                <tr>
                    <th scope="row">${i+1}</th>
                    <td><img src="${imgUrl + data[i].CoinInfo.ImageUrl}" class="text-left crypto-img"/>${data[i].CoinInfo.Name}</td>
                    <td>${data[i].CoinInfo.FullName}</td>
                    <td>${data[i].DISPLAY.USD.PRICE}</td>
                    <td>${(data[i].DISPLAY.USD.MKTCAP)}</td>
                </tr>
            `;
        }
        cryptoTableBody.innerHTML = line;
    }
}


