const itemName = document.querySelector('.item-name')
const amount = document.querySelector('.amount')
const price = document.querySelector('.price')
const btnAdd = document.querySelector('.btn-add')
const table = document.querySelector('.table')
const tableBody = document.querySelector('.tableBody')
const sum = document.querySelector('.full-price')
const tableHead = document.querySelector('.tableHead')
const data = document.querySelector('.data')
const pln = document.querySelector('.pln')
const eur = document.querySelector('.eur')
const methods = document.querySelectorAll('.method')

const now = new Date()
const day = now.getDate()
const month = now.getMonth()
const year = now.getFullYear()
const dateNow = now.getTime()

data.value = `${day}.${month < 10 ? '0' + Number(month + 1) : Number(month + 1)}.${year}`

const regex = /^[1-9][0-9]*$/
const check = input => {
	return regex.test(input)
}

pln.addEventListener('click', () => {
	pln.classList.add('active')
	eur.classList.remove('active')
})

eur.addEventListener('click', () => {
	eur.classList.add('active')
	pln.classList.remove('active')
})

const createElementWithClass = (tagName, className, textContent) => {
	const element = document.createElement(tagName)
	element.classList.add(className)
	element.textContent = textContent
	return element
}

let totals = {
	PLN: 0,
	EURO: 0,
}

const addProduct = () => {
	const curr = document.querySelector('.active').textContent
	const totalPrice = amount.value * price.value

	const createTable = document.createElement('div')
	const createName = createElementWithClass('p', 'table-name2', itemName.value)
	const createAmount = createElementWithClass('p', 'table-amount2', amount.value)
	const createPrice = createElementWithClass('p', 'table-price2', price.value + ' ' + curr)
	const createFullPrice = createElementWithClass('p', 'table-all2', amount.value * price.value + ' ' + curr)
	const createDivForP = createElementWithClass('div', 'par-container')
	const createDelBtn = createElementWithClass('p', 'del-btn')
	createDelBtn.innerHTML = '&times;'

	createDivForP.append(createDelBtn)
	table.style.display = 'flex'

	createTable.classList.add('body-el')

	createTable.append(createName, createAmount, createPrice, createFullPrice, createDivForP)
	tableBody.append(createTable)

	const allPrices = document.querySelectorAll('.table-all2')
	let total = 0

	allPrices.forEach(priceElement => {
		total += parseFloat(priceElement.textContent)
	})

	totals[curr] += totalPrice
	updateSumText()

	check(amount)
	check(price)

	itemName.value = ''
	amount.value = ''
	price.value = ''
}

const updateSumText = () => {
	const sumTextParts = []

	for (const [currency, total] of Object.entries(totals)) {
		if (total > 0) {
			sumTextParts.push(`${total}${currency}`)
		}
	}

	sum.textContent = `${sumTextParts.join(' + ') || '0'}`
}

const updateSumAfterDelete = row => {
	const fullPriceText = row.querySelector('.table-all2').textContent
	const [priceValue, currency] = fullPriceText.split(' ')

	totals[currency] -= parseFloat(priceValue)
	updateSumText()
}

methods.forEach(method => {
	method.addEventListener('click', () => {
		methods.forEach(m => m.classList.remove('active-method'))
		method.classList.add('active-method')
	})
})

btnAdd.addEventListener('click', () => {
	if (itemName.value != '' && amount.value != '' && price.value != '') {
		addProduct()
	}
})

tableBody.addEventListener('click', event => {
	if (event.target.classList.contains('del-btn')) {
		const row = event.target.parentElement.closest('.body-el')
		row.remove()
		updateSumAfterDelete(row)
	}
})

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
document.querySelector('.clear-btn').addEventListener('click', function () {
	signaturePad.clear()
})

const pdfGenerate = document.querySelector('.generate-btn')

pdfGenerate.addEventListener('click', () => {
	const fullName = document.querySelector('.name')
	const date = document.querySelector('.data')
	const ul = document.querySelector('.street')
	const postNumber = document.querySelector('.post-number')
	const city = document.querySelector('.city')
	const fullPrice = document.querySelector('.full-price')
	const payment = document.querySelector('.active-method')
	const signatureBuyer = 'data:image/png;base64,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'
	const signature = document.querySelector('.signature-pad')
	const pngDataUrl = signature.toDataURL('image/png')

	const pobierzDaneProduktow = () => {
		const nazwy = document.querySelectorAll('.table-name2')
		const ilosci = document.querySelectorAll('.table-amount2')
		const ceny = document.querySelectorAll('.table-price2')
		const laczneCeny = document.querySelectorAll('.table-all2')

		const produkty = []
		for (let i = 0; i < nazwy.length; i++) {
			produkty.push({
				nazwa: nazwy[i].textContent,
				ilosc: ilosci[i].textContent,
				cena: ceny[i].textContent,
				lacznaCena: laczneCeny[i].textContent,
			})
		}
		return produkty
	}

	const generujWiersze = produkty => {
		return produkty.map(produkt => [produkt.nazwa, produkt.ilosc, produkt.cena, produkt.lacznaCena])
	}

	const produkty = pobierzDaneProduktow()
	const wierszeTabeli = generujWiersze(produkty)
	const docDefinition = {
		content: [
			{ text: 'UMOWA KUPNA – SPRZEDAŻY', style: 'header' },
			{ text: date.value, alignment: 'right' },
			{ text: 'Sprzedający', style: 'subheader' },
			fullName.value,
			ul.value,
			`${postNumber.value} ${city.value}`,
			{ text: 'Kupujący', style: 'subheader' },
			'DROP UP Kacper Pietras',
			'Żwirki i Wigury 21',
			'62-561 Ślesin',
			'NIP: 6653051980',
			{ text: '§1', style: 'section' },
			'Sprzedający sprzedaje, a Kupujący kupuje następujące rzeczy:',
			{
				style: 'tableExample',
				table: {
					headerRows: 1,
					widths: ['*', 'auto', 'auto', 'auto'],
					body: [
						[
							{ text: 'Nazwa produktu', style: 'tableHeader' },
							{ text: 'Ilość', style: 'tableHeader' },
							{ text: 'Cena', style: 'tableHeader' },
							{ text: 'Łączna cena', style: 'tableHeader' },
						],
						...wierszeTabeli,
					],
				},
			},
			{ text: '§2', style: 'section' },
			`Kupujący zobowiązuje się do zapłaty Sprzedawcy za ww. przedmioty cenę brutto w wysokości  ${fullPrice.textContent}`,
			`Zapłata ceny brutto przez Kupującego nastąpi poprzez ${payment.textContent}`,
			{ text: '§3', style: 'section' },
			'1.	W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy kodeksu cywilnego.',
			'2.	Zmiana umowy wymaga formy pisemnej pod rygorem nieważności.',
			'3.	Sprzedawane towary są uznawane za używane.',
			'4.	Kupujący kupuje, a sprzedający sprzedaje produkty w stanie wolnym od wad.',
			'5.	Przeniesienie własności towaru następuje z chwilą jego wydania Kupującemu.',
			{ text: '§4', style: 'section' },
			'Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze stron.',
			{
				columns: [
					{	
						image: pngDataUrl,
          				width: 150,
						height: 50,
						alignment: 'left',
						margin: [0, 20, 0, 0],
					},
					{
						text: '',
						width: '*'
					  },
					{
						image: signatureBuyer,
						width: 150,
						height: 50,
						alignment: 'right',
						margin: [0, 20, 0, 0],
					},
				],
			},
			
			{
				columns: [
					{
						text: 'Podpis sprzedającego',
						alignment: 'left',
						
					},
					{
						text: 'Podpis kupującego',
						alignment: 'right',
						
					},
				],
			},
		],

		styles: {
			header: {
				fontSize: 18,
				bold: true,
				margin: [0, 0, 0, 10],
				alignment: 'center',
			},
			subheader: {
				fontSize: 14,
				bold: true,
				margin: [0, 10, 0, 5],
			},
			section: {
				bold: true,
				margin: [0, 10, 0, 10],
				alignment: 'center',
			},
			tableExample: {
				margin: [0, 5, 0, 15],
			},
			signature: {
				bold: true,
				margin: [0, 20, 0, 10],
			},
		},
	}
	pdfMake.createPdf(docDefinition).download()
	var data;
	pdfMake.createPdf(docDefinition).getDataUrl(function(dataURL) {
		data = dataURL;
		console.log(data);
		console.log(typeof data);
		const copiedFile = new File(
			[data],
			`umowa.pdf`,
			{
				type: 'pdf',
				lastModified: new Date(),
			}
		);
		console.log(copiedFile);
		console.log(typeof copiedFile);
	});

	
})
