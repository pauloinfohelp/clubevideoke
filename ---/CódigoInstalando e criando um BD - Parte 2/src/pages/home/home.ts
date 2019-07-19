import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewEntryPage } from '../new-entry/new-entry';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public sqlite: SQLite) { }

  addEntry() {
    console.log('Adicionar lançamento');
    this.navCtrl.push(NewEntryPage);
  }

  testDb() {
    console.log('Início do Teste DB');

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      console.log('BD criado');

      // Executa o comando create
      db.sqlBatch([
        "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)"
      ])
      .then(() => {
        console.log('tabelas criadas');

        const v1 = 100.2;
        const v2 = 'Felipe';

        // Insere um valor qualquer...
        const sqlInsert = "INSERT INTO entries (amount, description) VALUES (?, ?)";
        const dataInsert = [v1, v2];

        db.executeSql(sqlInsert, dataInsert)
        .then(() => {
          console.log('valores inseridos');

          const sql = "SELECT amount, description FROM entries;";
          const data = [];

          db.executeSql(sql, data)
          .then((values: any) => {

            console.log(values.rows.length);

            for(var i = 0; i < values.rows.length; i++) {
              console.log(JSON.stringify(values.rows.item(i)));
            }

          });
        })
        .catch((e) => {
          console.log('Erro ao inserir os valores no BD');
        });

      })
      .catch((e) => {
        console.error('erro ao executar o comando sql', JSON.stringify(e));
      });


    })
    .catch(() => {
      console.error('Erro ao criar o BD.');
    });
  }
}
