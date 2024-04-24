const itemName = document.querySelector('.item-name')
const amount = document.querySelector('.amount')
const price = document.querySelector('.price')
const btnAdd = document.querySelector('.btn-add')
const tableBody = document.querySelector('.tableBody')
const sum = document.querySelector('.sum')
const tableHead = document.querySelector('.tableHead')


const regExp = () => {

}

const addProduct = () => {
    const createTable = document.createElement('div');
    const createName = document.createElement('p')
    const createAmount = document.createElement('p')
    const createPrice = document.createElement('p')
    const createFullPrice = document.createElement('p')

    tableHead.style.display = 'flex'

    createTable.classList.add('body-el')
    createName.classList.add('table-name')
    createAmount.classList.add('table-amount')
    createPrice.classList.add('table-price')
    createFullPrice.classList.add('table-all')

    createName.textContent = itemName.value
    createAmount.textContent = amount.value
    createPrice.textContent = price.value
    createFullPrice.textContent = amount.value * price.value

    createTable.appendChild(createName);
    createTable.appendChild(createAmount);
    createTable.appendChild(createPrice);
    createTable.appendChild(createFullPrice);

    tableBody.append(createTable)

    const allPrices = document.querySelectorAll('.table-all');
    let total = 0;
    
    allPrices.forEach(priceElement => {
        total += parseFloat(priceElement.textContent);
    });

    sum.textContent = `Suma: ${total.toFixed(2)}`;

    itemName.value = ''
    amount.value = ''
    price.value = ''
}


btnAdd.addEventListener('click', addProduct)