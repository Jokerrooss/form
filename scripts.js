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
const methods = document.querySelectorAll('.method');




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
    const createDivForP = createElementWithClass('div', 'par-container')
    const createDelBtn = createElementWithClass('p', 'del-btn')
    createDelBtn.innerHTML = '&times;'

    createDivForP.append(createDelBtn)
    tableHead.style.display = 'flex'

    createTable.classList.add('body-el')

    createTable.append(createName, createAmount, createPrice, createFullPrice, createDivForP);
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



const updateSumAfterDelete = (row) => {
    const fullPriceText = row.querySelector('.table-all').textContent;
    const [priceValue, currency] = fullPriceText.split(' ');

    totals[currency] -= parseFloat(priceValue);
    updateSumText();
};

methods.forEach(method => {
    method.addEventListener('click', () => {
        methods.forEach(m => m.classList.remove('active'));
        method.classList.add('active');
    });
});


btnAdd.addEventListener('click', () => {
    if(itemName.value != '' && amount.value != '' && price.value != ''){
        addProduct()
    }
    
})

tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('del-btn')) {
        const row = event.target.closest('.body-el');
        row.remove();
        updateSumAfterDelete(row);
    }
});

const canvas = document.querySelector('.signature-pad')
const resizeCanvas = () => {
    const ratio = Math.max(1, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.getContext('2d').scale(ratio, ratio)
}
window.onresize = resizeCanvas
resizeCanvas()

const signaturePad = new SignaturePad(canvas)
document.querySelector('.clear-btn').addEventListener('click', function(){
    signaturePad.clear();
})




