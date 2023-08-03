const regex = /?/;
regex.test('jade123@topician.com'); // true
regex.test('jade123@topician.store'); // true
regex.test('jade123@topician'); // false
regex.test('ja_de.j-u-n@topician.store'); // true
regex.test('jade@jeon@topician.store'); // false
