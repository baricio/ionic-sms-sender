import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
{
  name: 'login-page'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  phone = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
  }

  joinToServer() {
    this.socket.connect();
    this.socket.emit('login', this.phone);
    this.navCtrl.push('HomePage', { phone: this.phone });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
