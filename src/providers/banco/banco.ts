import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class BancoProvider {
  private dbConnection: SQLiteObject;
  
  constructor(
    public sqlite: SQLite) {
    this.initDB();
  }

  get db(): SQLiteObject {
    return this.dbConnection;
  }

  private initDB() {
    console.log('init db');

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.dbConnection = db;

        // this.dropTables();
        // this.createTables();
        //this.loadRecords();

        console.log('Banco Criado com Sucesso!!!');
      })
      .catch(e => console.error('error on load db', JSON.stringify(e)));
  }


  
}
