import * as versions from './versions.json';

export const environment = {
  production: true,
  versions: {
    version: versions.version,
    revision: versions.revision
  },
  firebase: {
    apiKey: 'AIzaSyBIQyGmuHzizv-MNxX4plVBLoErVopOEiE',
    authDomain: 'our-brothers.firebaseapp.com',
    databaseURL: 'https://our-brothers.firebaseio.com',
    projectId: 'our-brothers',
    storageBucket: 'our-brothers.appspot.com',
    messagingSenderId: '140734739420',
    appId: '1:140734739420:web:9a51b356b893428505d519',
    measurementId: 'G-ZQNFNV8NWQ'
  }
};
