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
      this.createTable(db)
      .then(() => {
        console.log('tabelas criadas');

        const a = 99.2;
        const d = 'Felipe';

        // Insere um valor qualquer...
        this.insert(a, d, db)
        .then(() => {
          console.log('valores inseridos');

          // Seleciona o valor
          this.select(db)
          .then((values: any) => {

            console.log(values.rows.length);
            console.log('select 1');

            for(var i = 0; i < values.rows.length; i++) {
              console.log(JSON.stringify(values.rows.item(i)));
            }

            this.update(999, 'alterado', 5, db)
            .then(() => {

              console.log('select 2');
              this.select(db)
              .then((values: any) => {

                console.log(values.rows.length);

                for(var i = 0; i < values.rows.length; i++) {
                  console.log(JSON.stringify(values.rows.item(i)));
                }

                this.delete(6, db)
                .then(() => {

                  console.log('select 3');
                  this.select(db)
                  .then((values: any) => {

                    console.log(values.rows.length);

                    for(var i = 0; i < values.rows.length; i++) {
                      console.log(JSON.stringify(values.rows.item(i)));
                    }
                  });


                });
              });


            });

          });

        })

      });

    })
    .catch(() => {
      console.error('Erro ao criar o BD.');
    });
  }

  createTable(db) {
    console.log('BD criado');

    // Executa o comando create
    return db.sqlBatch([
      "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)"
    ])
    .catch(e => console.error('erro ao criar a tabela', JSON.stringify(e)));
  }

  insert(v1, v2, db) {
    // Insere um valor qualquer...
    const sql = "INSERT INTO entries (amount, description) VALUES (?, ?)";
    const data = [v1, v2];

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)));
  }

  update(v1, v2, id, db) {
    const sql = "UPDATE entries SET amount = ?, description = ? WHERE id = ?";
    const data = [v1, v2, id];

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)));
  }

  delete(id, db) {
    const sql = "DELETE FROM entries WHERE id = ?";
    const data = [id];

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao inserir na tabela', JSON.stringify(e)));
  }

  select(db) {
    const sql = "SELECT * FROM entries;";
    const data = [];

    return db.executeSql(sql, data)
      .catch(e => console.error('erro ao selecionar registros', JSON.stringify(e)));
  }
}
