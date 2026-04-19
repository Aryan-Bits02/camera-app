const QRCode = require('qrcode');

const url = 'https://camera-app-production-6cc4.up.railway.app/index.html';

QRCode.toFile('qr.png', url, { errorCorrectionLevel: 'H' }, err => {
    if (err) console.error(err);
    else console.log('QR code saved as qr.png');
});