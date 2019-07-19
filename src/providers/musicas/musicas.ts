
import { Injectable } from '@angular/core';
import { BancoProvider } from '../../providers/banco/banco';

/*
  Generated class for the MusicasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MusicasProvider {

  constructor(public banco: BancoProvider) {
    console.log('Hello MusicasProvider Provider');
  }

  getAll() {
    const sql = 'SELECT * FROM musicas ORDER BY codigo';
    const data = [];

    return this.banco.db
      .executeSql(sql, data)
        .then((data: any) => {
          if (data.rows.length > 0) {
            let musicas: any[] = [];

            for (var i = 0; i < data.rows.length; i++) {
              musicas.push(data.rows.item(i));
            }

            return musicas;
          } else {
            return null;
          }
        })
        .catch((e) => console.error('error on get', JSON.stringify(e)));
  }

  
}
