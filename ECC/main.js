function pointToText(text) {
    let finalText = text.replaceAll('.','ТЧК');
    finalText = finalText.replaceAll('Ё','Е');
    finalText = finalText.replaceAll(',','ЗПТ');
    finalText = finalText.replaceAll('-','ТРЗ');
    finalText = finalText.replaceAll(' ','ПРБ');
    finalText = finalText.replaceAll(':','ДВЗ');
    finalText = finalText.replaceAll('?','ВПЗ');
    finalText = finalText.replaceAll('!','ВСЗ');
    return finalText;
}

function textToPoint(text) {
    let finalText = text.replaceAll('ТЧК','.');
    finalText = finalText.replaceAll('ЗПТ',',');
    finalText = finalText.replaceAll('ТРЗ','-');
    finalText = finalText.replaceAll('ДВЗ',':');
    finalText = finalText.replaceAll('ПРБ',' ');
    finalText = finalText.replaceAll('ВПЗ','?');
    finalText = finalText.replaceAll('ВСЗ','!');
    return finalText;
}

function EccModd(value, mod) {
    return ((value % mod) + mod) % mod;
}

function EccPowMod(number, power, modul) {
    let result = number;
    for (let i = 1; i < power; i++) {
        result *= number;
        result %= modul;
    }
    return result;
}

function EccGcd(a, b) { 
    if (a == 0) 
        return b; 
    return EccGcd(b % a, a); 
}

function EccIsPrime(n) { 
    let result = [1, n]; 
    for (let i = 2; i < Math.pow(n, 0.5); i++) { 
        if (n % i == 0) {
            return false;
        } 
    }
    return true;
}

class EccPoint {
    constructor(a, b, x, y, modul) {
        this.a = a;
        this.b = b;
        this.point = (x != undefined && y != undefined) ? [x, y] : null;
        this.modul = modul;
    }

    static EccGcd(a, b) { 
        if (a == 0) 
            return b; 
        return EccPoint.EccGcd(b % a, a); 
    }

    static phi(number) {
        let count = 0;
        for (let x = 1; x <= number; x++) {
            if (EccPoint.EccGcd(number, x) == 1) count++;
        }
        return count;
    }

    static EccPowMod(number, power, modul) {
        let result = number;
        for (let i = 1; i < power; i++) {
            result *= number;
            result %= modul;
        }
        return result;
    }

    static div_by_mod(a, b, modul) {
        let phi = EccPoint.phi(modul);
        b = EccPoint.EccPowMod(b, phi - 1, modul);
        return (a * b) % modul;
    }

    get_x_y() {
        if (this.point != null) {
            return this.point;
        } else {
            return [0, 0];
        }
    }

    get_x_y_isize() {
        if (this.point != null) {
            return [this.point[0], this.point[1]];
        } else {
            return [0, 0];
        }
    }

    lambda_xx(rhs) {
        let [rhs_x, rhs_y] = rhs.get_x_y_isize();
        let [self_x, self_y] = this.get_x_y_isize();
        let left = EccModd(rhs_y - self_y, this.modul);
        let right = EccModd(rhs_x - self_x, this.modul);
        if (right == 0) {
            return null;
        }
        return EccPoint.div_by_mod(left, right, this.modul);
    }

    lambda_x2() {
        let [self_x, self_y] = this.get_x_y_isize();
        let left = EccModd(3 * self_x * self_x + this.a, this.modul);
        let right = EccModd(2 * self_y, this.modul);
        if (right == 0) {
            return null;
        }
        return EccPoint.div_by_mod(left, right, this.modul);
    }

    mul(n) {
        let point = this;
        let temp = new EccPoint(this.a, this.b, this.point[0], this.point[1], this.modul); // было просто = point
        for (let i = 1; i < n; i++) {
            temp = temp.add(point);    
        }
        return temp;
    }

    add(rhs) {
        let temp = new EccPoint(this.a, this.b, 0, 0, this.modul);
        if (this.point != null && rhs.point != null) {
            let [rhs_x, rhs_y] = rhs.get_x_y_isize();
            let [self_x, self_y] = this.get_x_y_isize();
            let lambda, x;
            if (self_x != rhs_x || self_y != rhs_y) {
                lambda = this.lambda_xx(rhs);
                if (lambda != null) {
                    lambda = lambda;
                } else {
                    temp.point = null;
                    return temp;
                }
                x = EccModd(lambda * lambda - self_x - rhs_x, this.modul);
            } else {
                lambda = this.lambda_x2();
                if (lambda !== null) {
                    lambda = lambda;
                } else {
                    temp.point = null;
                    return temp;
                }
                x = EccModd(lambda * lambda - 2 * self_x, this.modul);
            }
            let y = EccModd((lambda * EccModd(self_x - x, this.modul)) - self_y, this.modul);
            temp.point = [x, y];
            return temp;
        } else if (this.point == null && rhs.point == null) {
            temp.point = null;
            return temp;
        } else if (this.point == null) {
            return rhs;
        } else {
            return this;
        }
    }
}

class CipherValue {
    constructor(s, a, b, modul) {
        let buff = s.replaceAll("(", "").replaceAll(")", "").split(',').map(x => parseInt(x));
        if (buff.length >= 3) {
          this.point = new EccPoint(a, b, buff[0], buff[1], modul);
          this.value = buff[2];
        } else {
          throw new Error("Unexpected behavior");
        }
    }

    toString() {
        return `(${this.point},${this.value})`;
    }
}

function EccGetPoints(a, b, modul) {
    let ys = Array.from({ length: modul }, (_, i) => i);
    let y2s = [];
    ys.forEach(y => y2s[((y * y) % modul)] = y);
    let xs = [...ys];
    let y4x = xs.map(x => EccModd((x ** 3) + a * x + b, modul));
    y4x = y4x.map(y => typeof y2s[y] != 'undefined' ? y : null);
    let xys = [];
    for (let [y4xi, xsi] of y4x.map((y, i) => [y, xs[i]]).filter(a => a[0] != null)) {
        xys.push(new EccPoint(a, b, xsi, y2s[y4xi], modul));
        if (y2s[y4xi] != 0) {
            xys.push(new EccPoint(a, b, xsi, EccModd(-(y2s[y4xi]), modul), modul));
        }
    }
    return xys;
}

function EccGetQ(n) {
    let q = 1;
    for (let i = 3; i < n; i++) {
        if (EccGcd(n, i) == i && EccIsPrime(i)) {
            q = i;
        }
    }
    return (q == 1) ? n : q;
}

function validateEll(a, b, modul) {
    return EccModd(4 * (a ** 3) + 27 * (b ** 2), modul) != 0;
}

function EccEnc(mi, db, g, k, q) {
    let r = g.mul(k);
    let p = db.mul(k);
    let [x, _] = p.get_x_y_isize();
    while (x == 0) {
        k = Math.floor(Math.random() * q + 1);
        r = g.mul(k);
        p = db.mul(k);
        [x, _] = p.get_x_y_isize();
    }
    let m = EccModd(mi * x, p.modul);
    let result = `((${r.point[0]},${r.point[1]}),${m})`;
    return result;
}

function EccEncrypt(phrase, db, g, q) {
    let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    const result = Array.from(phrase, x => {
        let mi = alphabet.indexOf(x) + 1;
        let k = Math.floor(Math.random() * q + 1);
        return EccEnc(mi, db, g, k, q);
    }).join("");
    return result;
}

function EccDec(cb, value, modul) {
    let q = value.point.mul(cb);
    let [x, _] = q.get_x_y();
    return EccModd(value.value * EccPowMod(x, modul - 2, modul), modul);
}

function EccDecrypt(phrase, cb, a, b, modul) {
    let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    let re = /\(\(\d+,\d+\),\d+\)/g; // ищет походие этой подстроке ((1,1),2)
    let result = Array.from(phrase.match(re), x => {
        let val = new CipherValue(x, a, b, modul);
        let m = EccDec(cb, val, modul);
        return alphabet[m - 1];
        // return m;
    }).join("");
    return result;
}

function EccPrepairPhrase(phrase, a, b, p, Gx, Gy, q, Cb, crtype) {
    if (crtype) {
        let newText = pointToText(phrase).toLocaleLowerCase();

        let ptest = EccIsPrime(p);
        if (!ptest) {
            return 'P - должно быть простым числом'
        }
        if (!validateEll(a, b, p)) {
            return 'Кривая не соответствует условию'
        }

        let n = EccGetPoints(a, b, p).length + 1;
        // q = 7;
        q = EccGetQ(n);
        document.getElementById('Q').value = q;

        let g = new EccPoint(a, b, Gx, Gy, p);
        let db = g.mul(Cb);
        let Yx = db.point[0];
        let Yy = db.point[1];
        document.getElementById('Yx').value = Yx;
        document.getElementById('Yy').value = Yy;

        return EccEncrypt(newText, db, g, q);

    } else {
        let ptest = EccIsPrime(p);
        if (!ptest) {
            return 'p - должно быть простым числом'
        }
        if (!validateEll(a, b, p)) {
            return 'Кривая не соответствует условию'
        }

        let newText = textToPoint(EccDecrypt(phrase, Cb, a, b, p));
        return newText;
    }
}


function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;
    let enA = Number(document.getElementById("A").value);
    let enB = Number(document.getElementById("B").value);
    let enP = Number(document.getElementById("P").value);
    let enGx = Number(document.getElementById("Gx").value);
    let enGy = Number(document.getElementById("Gy").value);
    let enCb = Number(document.getElementById("Cb").value);

    let encryptedText = EccPrepairPhrase(text, enA, enB, enP, enGx, enGy, 0, enCb, true);

    document.getElementById('result').value = encryptedText;
    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('result').value;
    let enA = Number(document.getElementById("A").value);
    let enB = Number(document.getElementById("B").value);
    let enP = Number(document.getElementById("P").value);
    let enCb = Number(document.getElementById("Cb").value);

    let decryptedText = EccPrepairPhrase(text, enA, enB, enP, 0, 0, 0, enCb, false);

    document.getElementById('result').value = decryptedText;
    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}