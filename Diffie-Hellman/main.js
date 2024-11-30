function decryptDiffie (n, Ka, Kb, Ya, Yb) {
    let KA = 1;
    for (let i = 0 ; i < Ka; i ++) {
        KA = (KA * Yb) % n;
    }
    let KB = 1;
    for (let i = 0 ; i < Kb; i ++) {
        KB = (KB * Ya) % n;
    }

    document.getElementById('KA').value = KA;
    document.getElementById('KB').value = KB;

    if (KA == KB) {
        if (KA == 1 || KB == 1 || KB == 0 || KA == 0) {
            document.getElementById('message-text').innerText = 'Ключи должны быть больше 1!';
        }
        return true;
    } else {
        document.getElementById('message-text').innerText = 'Ключи не верны!';
        return false;
    }
}


function encryptDiffie (a, n, Ka, Kb) {
    let Ya = 1;
    for (let i = 0 ; i < Ka; i ++) {
        Ya = (Ya * a) % n;
    }
    let Yb = 1;
    for (let i = 0 ; i < Kb; i ++) {
        Yb = (Yb * a) % n;
    }

    document.getElementById('Ya').value = Ya;
    document.getElementById('Yb').value = Yb;

    if (Ya == 1 || Yb == 1 || Ya == 0 || Yb == 0) {
        document.getElementById('message-text').innerText = 'Ключи должны быть больше 1!';
    }
}


function encryptText() {
    let a = Number(document.getElementById('a').value); 
    let n = Number(document.getElementById('n').value); 
    let Ka = Number(document.getElementById('Ka').value);
    let Kb = Number(document.getElementById('Kb').value);

    if (n <= a || a < 2) {
        document.getElementById('message-text').innerText = 'a должно быть меньше n и больше 1!';
        return 0;
    }

    if (Ka == 1 || Kb == 1 || Kb == 0 || Ka == 0) {
        document.getElementById('message-text').innerText = 'Ключи должны быть больше 1!';
        return 0;
    }

    if (encryptDiffie(a, n, Ka, Kb)) {
        document.getElementById('message-text').innerText = 
            'Произошел обмен ключами!';
    }
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let n = Number(document.getElementById('n').value); 
    let Ka = Number(document.getElementById('Ka').value);
    let Kb = Number(document.getElementById('Kb').value);
    let Ya = Number(document.getElementById('Ya').value);
    let Yb = Number(document.getElementById('Yb').value);

    if (Ka == 1 || Kb == 1 || Kb == 0 || Ka == 0) {
        document.getElementById('message-text').innerText = 'Ключи должны быть больше 1!';
        return 0;
    }
    if (Ya == 1 || Yb == 1 || Yb == 0 || Ya == 0) {
        document.getElementById('message-text').innerText = 'Ключи должны быть больше 1!';
        return 0;
    }
    if (Kb == Ka) {
        document.getElementById('message-text').innerText = 'Открытые и секретные ключи не должны быть равны!';
        return 0;
    }

    if (decryptDiffie(n, Ka, Kb, Ya, Yb)) {
        document.getElementById('message-text').innerText = 
            'Ключи верны!';
    }
    document.getElementById('message-box').removeAttribute('hidden');
}