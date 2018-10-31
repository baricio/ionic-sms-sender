import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  phone: any;
  message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sms: SMS, private toast: ToastController) {
  }

  sendMessage(): void {
    let addToToast = null;

    if (this.sms.hasPermission()) {
      let options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          intent: '' // Sends sms without opening default sms app
        }
      }

      // Send a text message using default options
      this.sms.send(this.phone, this.message, options).then(() => {
        addToToast = this.toast.create({
          message: 'Sms enviado com sucesso!',
          duration: 5000
        })

        
      }).catch(() => {
        addToToast = this.toast.create({
          message: 'Ooops, algo de errado aconteceu...',
          duration: 5000
        })
      });
    } else {
      addToToast = this.toast.create({
        message: 'Permissão para enviar SMS não concedida.',
        duration: 5000
      })
    }
    addToToast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
