function keyIsValid(key) {
    
    let keyIsNotValid = false;

    if (key < 1 || key > 31) {
        keyIsNotValid = true;
    }

    return keyIsNotValid;
}

function encryptFunction(str, text) {

    let key = Number(str);
    text = text.toUpperCase();
    text = textIsValid(text);

    if (keyIsValid(key)) {
        document.getElementById('message-errorText').innerText = 
            document.getElementById('message-errorText').value +
        '   Ключ не находится в пределах от 1 до 31!!!!!';
        document.getElementById('errorMessage-box').removeAttribute('hidden');

        return;
    }

    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        for (let j = 0 ; j < ru.length; j ++) {
            if (ru[j] == text[i]) {
                encryptedText += ru[(j + key) % ru.length];
            }
        }
    }

    // возвращаем шифртекст
    return encryptedText;
}

function encryptText() {
    // получение данных с формы
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;

    
    const encryptedText = encryptFunction(key, text);
    document.getElementById('result').value = encryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;
    // Здесь нужно использовать алгоритм расшифрования
    const decryptedText = encryptFunction(32 - key, text);
    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function closeMessageBox() {
    document.getElementById('message-box').setAttribute('hidden', true);
}

function closeErrorMessageBox() {
    document.getElementById('errorMessage-box').setAttribute('hidden', true);
}
