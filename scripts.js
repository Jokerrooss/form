const itemName = document.querySelector('.item-name')
const amount = document.querySelector('.amount')
const price = document.querySelector('.price')
const btnAdd = document.querySelector('.btn-add')
const tableBody = document.querySelector('.tableBody')
const sum = document.querySelector('.sum')
const tableHead = document.querySelector('.tableHead')
const data = document.querySelector('.data')
const pln = document.querySelector('.pln')
const eur = document.querySelector('.eur')
const currency = document.querySelectorAll('.currency')



const now = new Date()
const day = now.getDate()
const month = now.getMonth()
const year = now.getFullYear()
const dateNow = now.getTime()

data.value = `${day}.${month < 10 ? '0' + Number(month + 1): Number(month + 1)}.${year}`

const regex = /^[1-9][0-9]*$/;
const check = (input) => {
   return regex.test(input)
}

pln.addEventListener('click', () => {
    pln.classList.add('active'); 
    eur.classList.remove('active');
});

eur.addEventListener('click', () => {
    eur.classList.add('active');
    pln.classList.remove('active');
});

const createElementWithClass = (tagName, className, textContent) => {
    const element = document.createElement(tagName);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
};

let totals = {
    PLN: 0,
    EURO: 0
};

const addProduct = () => {
    const curr = document.querySelector('.active').textContent
    const totalPrice = amount.value * price.value;

    const createTable = document.createElement('div');
    const createName = createElementWithClass('p', 'table-name', itemName.value);
    const createAmount = createElementWithClass('p', 'table-amount', amount.value);
    const createPrice = createElementWithClass('p', 'table-price', price.value + ' ' + curr);
    const createFullPrice = createElementWithClass('p', 'table-all', (amount.value * price.value)+ ' ' + curr);

    tableHead.style.display = 'flex'

    createTable.classList.add('body-el')

    createTable.append(createName, createAmount, createPrice, createFullPrice);
    tableBody.append(createTable)

    const allPrices = document.querySelectorAll('.table-all');
    let total = 0;
    
    allPrices.forEach(priceElement => {
        total += parseFloat(priceElement.textContent);
    });

    totals[curr] += totalPrice;
    updateSumText();

    check(amount)
    check(price)

    itemName.value = ''
    amount.value = ''
    price.value = ''
}

const updateSumText = () => {
    const sumTextParts = [];

    for (const [currency, total] of Object.entries(totals)) {
        if (total > 0) {
            sumTextParts.push(`${total}${currency}`);
        }
    }

    sum.textContent = `Suma: ${sumTextParts.join(' + ') || '0'}`;
}


btnAdd.addEventListener('click', () => {
    if(itemName.value != '' && amount.value != '' && price.value != ''){
        addProduct()
    }
    
})
