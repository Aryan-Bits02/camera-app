const QRCode = require('qrcode');
const url = 'https://yourdomain.com';  // replace with your public URL
QRCode.toFile('qr.png', url, { errorCorrectionLevel: 'H' }, err => {
  if (err) console.error(err);
  else console.log('QR code saved as qr.png');
});