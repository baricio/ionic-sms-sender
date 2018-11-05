import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
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
  requests: Array<any>;
  campaing: CampaignMessages[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sms: SMS, private toast: ToastController, private socket: Socket) {
    this.phone = this.navParams.get('phone');

    this.getMessages().subscribe(messages => {
      this.campaing = messages as CampaignMessages[];
      for (var i = this.campaing.length - 1; i >= 0; i--) {
        console.log('3194076639', this.campaing[i].campaign.message);
        this.sendMessage('31985270196', this.campaing[i].campaign.message);
      }

      Promise.all(this.requests).then(()=>this.requests = []);
    });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  sendMessage(phone, message): void {
    if (this.sms.hasPermission()) {
      let options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          intent: '' // Sends sms without opening default sms app
        }
      }

      // Send a text message using default options
      this.requests.push(this.sms.send(phone, message, options))
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}

export interface CampaignMessages {
  id:any,
  phone_number:any,
  campaign_id:any,
  sender_id:any,
  reservation_id:any,
  reserved_at:any,
  sent_at:any,
  status_id:any,
  deleted_at:any,
  created_at:any,
  updated_at:any,
  campaign: {
      id: any,
      name: any,
      message: any,
      scheduled: any,
      start_date: any,
      end_date: any,
      start_time: any,
      end_time: any,
      user_id: any,
      status_id: any,
      deleted_at: any,
      created_at: any,
      updated_at: any
  }
}
