import { Injectable } from "@angular/core";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class LoginFacebookService {
  constructor(private fb: Facebook, private fireAuth: AngularFireAuth) {}

  async login() {
    return this.fb
      .login(["email"])
      .then((response: FacebookLoginResponse) => {
        console.log(response.authResponse.accessToken);
        return this.onLoginSuccess(response);
      })
      .catch((error) => {
        console.log(error);
        alert("error:" + error);
      });
  }

  onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(
      res.authResponse.accessToken
    );
    this.fireAuth.signInWithCredential(credential).then((response) => {
      console.log("Success", response);
    });
  }

  recuperarUsuario(): firebase.User {
    let user;
    this.fireAuth.onAuthStateChanged((data) => {
      if (data) {
        user = data;
      }
    });

    if (user !== null) {
      return user;
    } else {
      return null;
    }
  }
}
