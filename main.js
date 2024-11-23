function textIsValid(text) {
    let finalText = '';

    for (let i = 0 ; i < text.length; i++) {
        let isNotValid = true;

        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == text[i]) {
                isNotValid = false;
                finalText += ru[j];
            }
        }

        if (text[i] == '.' || text[i] == ',' || text[i] == ' ') {
            if (text[i] == '.') {
                finalText += 'ТЧК';
            }
            if (text[i] == ',') {
                finalText += 'ЗПТ';
            }
            isNotValid = false;
        }

        if (isNotValid) {
            document.getElementById('message-errorText').innerText = 
                'Текст использует недопустимые знаки после ' + i + ' знака';
            document.getElementById('errorMessage-box')
                .removeAttribute('hidden');

            finalText += '!здесь!';
        }
    }
    return finalText;
}

function encryptFunction(text) {
    text = text.toUpperCase();
    text = textIsValid(text);

    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        for (let j = 0 ; j < ru.length; j ++) {
            if (ru[j] == text[i]) {
                encryptedText += ru[(31 - j) % ru.length];
            }
        }
    }
    return encryptedText;
}

function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;

    // Запуск функции шифрования, вывод результата на сайт
    const encryptedText = encryptFunction(text);
    document.getElementById('result').value = encryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}


