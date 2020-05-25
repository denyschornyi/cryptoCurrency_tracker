let cryptoTableBody = document.querySelector('.crypto-tbody');
const cryptoLink = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
const imgUrl = 'https://www.cryptocompare.com/';

function getData(link = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD', callback = () => { }) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.response).Data);
            renderLine(JSON.parse(xhr.response).Data);
        }
    }
    xhr.send();
    setTimeout(getData, 5000);
}

getData(cryptoLink, initCurrency);

function renderLine(data) {
    console.log('function renderLine')
    
    for (let i = 0; i < data.length; i++) {
        var elem = document.getElementById(data[i].CoinInfo.Name);
        var newPrice = getNumber(data[i].DISPLAY.USD.PRICE);
        var valueCurrenly = getNumber(elem.textContent)
        elem.removeAttribute("class");
        if (newPrice !== valueCurrenly) {
            elem.innerHTML = newPrice;
            if(newPrice < valueCurrenly) {
                elem.classList.remove("green");
                elem.classList.add("red");
            } else {
                elem.classList.remove("red");
                elem.classList.add("green");
            }
            if (valueCurrenly) console.log(valueCurrenly)
            if (newPrice) console.log(newPrice)
        }

    }
}

function initCurrency(data) {
    console.log("function initCurrency")
    let line = ``;
    for (let i = 0; i < data.length; i++) {
        line += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td><img src="${imgUrl + data[i].CoinInfo.ImageUrl}" class="text-left crypto-img"/>${data[i].CoinInfo.Name}</td>
                <td>${data[i].CoinInfo.FullName}</td>
                <td id="${data[i].CoinInfo.Name}">
                ${data[i].DISPLAY.USD.PRICE}
                </td>
                <td>${(data[i].DISPLAY.USD.MKTCAP)}</td>
            </tr>
        `;
    }
    cryptoTableBody.innerHTML = line;
    console.log(data[0]);
}

function getNumber(value) {
    return parseFloat(value.replace(/\$/g, '').replace(/\,/g, ''))
}
