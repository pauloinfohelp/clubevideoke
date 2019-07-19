import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-new-entry',
  templateUrl: 'new-entry.html',
})
export class NewEntryPage {
  entryForm: FormGroup;

  entry = {}

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public sqlite: SQLite,
    private builder: FormBuilder) {

      this.entryForm = builder.group({
        amount: new FormControl('', Validators.required),
        category_id: new FormControl('', Validators.required),
      });
    }

  ionViewDidLoad() { }

  submitForm() {
    console.log('Enviando dados..');
    console.log(JSON.stringify(this.entry));
    this.insertBD();
    this.navCtrl.pop();
  }

  goBack() {
    console.log('Cancelando...');
    this.navCtrl.pop();
  }

  insertBD() {
    console.log('início da gravação do BD');

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      console.log('bd criado');

      db.sqlBatch([
        "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)"
      ])
      .then(() => {
        const sql = "INSERT INTO entries (amount) VALUES (?)";
        const data = [this.entry['amount']];

        return db.executeSql(sql, data)
          .then(() => console.log('insert realizado com sucesso'))
          .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)));
      })
      .catch(e => console.error('erro ao criar a tabela', JSON.stringify(e)));
    });
  }
}
