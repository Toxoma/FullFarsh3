"use strict";

const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	//создаётся стрелочная ф-ия, принимающая type и сборочный массив values(...rest). Ф-ия отбирает из значений массива values элементы тип которох соотв. переменной type.

	hideAllResponseBlocks = () => {
		//созд. стрел ф-ии.
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//формируем массив из div с классом 'dialog__response-block' и записываем в переменную. Т.к. изначально это нода и foreаch недоступна.
		responseBlocksArray.forEach(block => block.style.display = 'none');
		//перебор эл-ов и скрытие каждого на странице.
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//созд. стрел ф-ии c 3мя переменными
		hideAllResponseBlocks();
		//вызов стрел. ф-ии hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block';
		//выбор элемента blockSelector и отображение на странице (видимость)
		if (spanSelector) {
			//если spanSelector существует
			document.querySelector(spanSelector).textContent = msgText;
			// запись в эл-т spanSelector текст = msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// созд стрел. ф-ии с 1 параметром (msgText). Внутри вызов showResponseBlock и передача 3х компонент
	// ('.dialog__response-block_error', msgText, '#error')

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// созд стрел. ф-ии с 1 параметром (msgText). Внутри вызов showResponseBlock и передача 3х компонент
	// ('.dialog__response-block_ok', msgText, '#ok')

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// созд стрел. ф-ии. Внутри вызов showResponseBlock и передача значения '.dialog__response-block_no-results'

	tryFilterByType = (type, values) => {
		// созд стрел. ф-ии с 2мя параметрами (type, values). 
		try {
			//обёртка try catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// созд. переменной = итогу функции filterByType, в которую засунули 2 переменные type и values и соединному в строку через (, ).
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			// создание строки из текста и переменной type и значения valuesArray, в том случае если valuesArray.length !== 0. Иначе строка из текста и переменной type.
			showResults(alertMsg);
			// вызов showResults и передача в неё alertMsg
		} catch (e) {
			showError(`Ошибка: ${e}`);
			// вызов showError и передача в неё строки из текста и переменной (e), в случае если код в блоке try выполнился с ошибкой!
		}
	};

const filterButton = document.querySelector('#filter-btn');
// вытаскиваем элемент с id = filter-btn

filterButton.addEventListener('click', e => {
	//навешиваем обработчик клика на этот элемент (filterButton)
	const typeInput = document.querySelector('#type');
	// вытаскиваем элемент с id = type
	const dataInput = document.querySelector('#data');
	// вытаскиваем элемент с id = data

	if (dataInput.value === '') {
		//если dataInput пустой то:
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//создаём у элемента dataInput сообщение об ошибке 
		showNoResults();
		//вызов showNoResults
	} else {
		//иначе
		dataInput.setCustomValidity('');
		//создаём (убираем) у элемента dataInput сообщение об ошибке
		e.preventDefault();
		//предотвращаем стандартное поведение (обновление страницы при нажатии кнопки)
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
		//вызов tryFilterByType и передаём 2 значения. 1ое = значению typeInput без боковых пробелов, 2ое = значению dataInput без боковых пробелов.
	}
});