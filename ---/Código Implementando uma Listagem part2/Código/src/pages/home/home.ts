import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewEntryPage } from '../new-entry/new-entry';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  entries = [];

  constructor(
    public navCtrl: NavController,
    public sqlite: SQLite) {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  addEntry() {
    console.log('Adicionar lançamento');
    this.navCtrl.push(NewEntryPage);
  }

  loadData() {
    console.log('Início do Teste DB');

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      console.log('BD criado');

      const sql = "SELECT * FROM entries;";
      const data = [];

      return db.executeSql(sql, data)
        .then((values: any) => {
          let data;
          this.entries = [];

          for(var i = 0; i < values.rows.length; i++) {
            data = values.rows.item(i);
            console.log(JSON.stringify(data));
            this.entries.push(data);
          }
        })
        .catch(e => console.error('erro ao selecionar registros', JSON.stringify(e)));
    })
    .catch(e => console.error('erro ao criar o bd', JSON.stringify(e)));
  }
}
