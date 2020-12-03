// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDIOlDAzxJIa1vUjT5z5F_JRg5D5JSr0oQ",
      authDomain: "workofday-873ba.firebaseapp.com",
      databaseURL: "https://workofday-873ba.firebaseio.com",
      projectId: "workofday-873ba",
      storageBucket: "workofday-873ba.appspot.com",
      messagingSenderId: "949646765452",
      appId: "1:949646765452:web:7be6d1859b5b1a3ad4faa9",
      measurementId: "G-14P95W9HEE"
  },
};

/* var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'TEST-6590390036249147-120205-df8dbbdce5653e53c78f05d5c5e1301e-146617094'
});
 
var preference = {
  items: [
    {
      title: 'Test',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: 10.5
    }
  ]
};
 
mercadopago.preferences.create(preference)

 */

/* const mercadopagoCtrl = require(‘./mercadopago’);
exports.checkout = functions.https.onCall((preference, context) => {
  return mercadopagoCtrl.makecheckout(preference).then(response => {
  // Este es el checkout generado o link al que nos vamos a posicionar para pagar
  console.log(response.body.init_point);
  let init_point = response.body.init_point
  return { result: init_point };
  }).catch(error => {
   console.log(error);
   return error
  });
});

 */
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
