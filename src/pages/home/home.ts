import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import _ from 'lodash';
import { MusicasProvider } from '../../providers/musicas/musicas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  musicas=[];
  searchText:string='';
  

  constructor(public navCtrl: NavController, public musicap : MusicasProvider) { 
  }



  getAllProducts() {
    
    this.musicap.getAll()
      .then((result: any[]) => {
        this.musicas = result;
      });
  }

  ionViewDidEnter() {
    this.getAllProducts();
    //this.loadData();
  }
  filterProducts(ev: any) {
    this.getAllProducts();
  }

  private loadData() {
  //  this.loadMusicas();
  }
  /*
  private loadMusicas() {
    this.musicap
      .getAll()
        .then((data: any) => {
          this.musicas = data;
        });
  }*/
  consoleC()
    {
  console.log('teste');
  console.log(this.musicas);
    }
  
 
}
