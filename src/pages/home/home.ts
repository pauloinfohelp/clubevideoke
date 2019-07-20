import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import _ from 'lodash';
import { MusicasProvider } from '../../providers/musicas/musicas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  list: Array<{ inicio: string, musica: string, interprete: string, codigo: string }>;
  allList: any;
  queryText: string;




  musicas=[];
  todasMusicas: any;
  searchText:string=null;
  search: "";

  constructor(public navCtrl: NavController, public musicap : MusicasProvider) { 

    this.queryText = '';
    this.list = [
      { inicio: 'Vai sentando', musica: 'Vai descendo', interprete: '*', codigo: '1234' },
      { inicio: 'Vai sentando2', musica: 'Vai descendo2', interprete: '2*', codigo: '12342' }
    ];
    this.allList = this.list;
    
  }



  
  ionViewDidEnter() {
  //  this.getAllProducts();
this.loadData();
  }
  
  filterMusic(lis: any ){
        let val = lis.target.value;
    if (val && val.trim() != '') {
      this.musicas = _.values(this.todasMusicas);
      this.musicas = this.musicas.filter((lista) =>{
        return (lista.todos.toLowerCase().indexOf(val.toLowerCase()) > - 1);
      })
      } else {
      this.musicas = this.todasMusicas;
    }
    

  }


  private loadData() {
  this.loadMusicas();
  }
  ///*
  
  private loadMusicas() {
    this.musicap
      .getAll()
        .then((data: any) => {
          this.musicas = data;
          this.todasMusicas=this.musicas;
        });
  }
  //*/
  consoleC()
    {
  console.log('teste');
  console.log(this.musicas);
    }
  
 
}
