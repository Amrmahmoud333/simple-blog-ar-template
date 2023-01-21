const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const writeHijri = () => new Date().toLocaleString('ar-u-ca-islamic', options);
const writeMiladi = () => new Date().toLocaleString('ar', options) + ' م';

document.getElementById('hijri').innerHTML = writeHijri();
document.getElementById('miladi').innerHTML = writeMiladi();
