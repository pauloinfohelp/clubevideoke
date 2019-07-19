import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-new-entry',
  templateUrl: 'new-entry.html',
})
export class NewEntryPage {
  entryForm: FormGroup;

  entry = {
    value: '0,00',
    category: '1'
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private builder: FormBuilder) {

      this.entryForm = builder.group({
        value: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9,\.]+')])),
        category: new FormControl('', Validators.required),
      });
    }

  ionViewDidLoad() { }

  submitForm() {
    console.log('Enviando dados..');
    console.log(this.entry);
    this.showToast();
    this.navCtrl.pop();
  }

  goBack() {
    console.log('Cancelando...');
    this.navCtrl.pop();
  }

  private showToast() {
    const toast = this.toastCtrl.create({
      message: 'Lançamento efetuado com sucesso',
      duration: 3000
    });

    toast.present();
  }
}
