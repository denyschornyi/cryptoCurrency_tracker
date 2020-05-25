let cryptoTableBody = document.querySelector('.crypto-tbody');
const cryptoLink = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
const imgUrl = 'https://www.cryptocompare.com/';

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
        const inputVal = document.getElementsByName("${data[i].CoinInfo.Name}")[0].value;
        line += `
            <tr>
                <th scope="row">${i+1}</th>
                <td><img src="${imgUrl + data[i].CoinInfo.ImageUrl}" class="text-left crypto-img"/>${data[i].CoinInfo.Name}</td>
                <td>${data[i].CoinInfo.FullName}</td>
                <td class="${(inputVal !== ${data[i].DISPLAY.USD.PRICE} && inputVal < ${data[i].DISPLAY.USD.PRICE}) ? `green` : `red`}">
                    ${if(inputVal !== ${data[i].DISPLAY.USD.PRICE}) data[i].DISPLAY.USD.PRICE else inputVal}
                    <input type="hidden" name="${data[i].CoinInfo.Name}" value="${if(inputVal !== ${data[i].DISPLAY.USD.PRICE}) data[i].DISPLAY.USD.PRICE else inputVal}" />
                </td>
                <td>${(data[i].DISPLAY.USD.MKTCAP)}</td>
            </tr>
        `;
    }
    cryptoTableBody.innerHTML = line;
    console.log(data[0]);
}



