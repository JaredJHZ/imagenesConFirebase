// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDG4-LnljCLq_zx6faWvQLkbFdKYE8C2YA ',
    authDomain: 'fotos-ed9ed',
    databaseURL: "https://fotos-ed9ed.firebaseio.com",
    projectId: 'fotos-ed9ed',
    storageBucket: "fotos-ed9ed.appspot.com",
    messagingSenderId: "331548576580"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
