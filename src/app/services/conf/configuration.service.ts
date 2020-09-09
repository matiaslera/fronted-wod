import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

   
}

export const firebaseConfig = {
  apiKey: "AIzaSyDIOlDAzxJIa1vUjT5z5F_JRg5D5JSr0oQ",
    authDomain: "workofday-873ba.firebaseapp.com",
    databaseURL: "https://workofday-873ba.firebaseio.com",
    projectId: "workofday-873ba",
    storageBucket: "workofday-873ba.appspot.com",
    messagingSenderId: "949646765452",
    appId: "1:949646765452:web:7be6d1859b5b1a3ad4faa9",
    measurementId: "G-14P95W9HEE"
};

var firebase2 = require('firebase');
var firebaseui = require('firebaseui');

 // Initialize Firebase
 //firebase.initializeApp(firebaseConfig);
 //firebase.analytics();