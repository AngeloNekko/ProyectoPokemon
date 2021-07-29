import { FirebaseService } from './../services/firebase.service';
import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  base1: Array<any> = [];
  pokes: Array<any> = [];
  poke1: Array<any> = [];
  count: any;
  search: any;
  spinner = false;
  model: any;
  constructor(
    private servipoke: PokemonService,
    private pokefire: FirebaseService,
    public alertController: AlertController
  ) {}
  ngOnInit() {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
    }, 4000);
    this.servipoke.getPokedex().then((data) => {
      this.base1 = data.results;
      for (let j = 0; j < this.base1.length; j++) {
        this.pokes[j] = data.results[j];
      }
      for (let j = 0; j < this.base1.length; j++) {
        this.getPersonajes(this.pokes[j].url).then((dato) => {
          this.poke1[j] = dato;
        });
      }
    });
  }
  getPersonajes = (j: any) => fetch(j).then((response) => response.json());
  //Guardar
  async putPoke(id: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar a este Pokemon',
      message: 'Quiere Agregar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Si',
          handler: () => {
            this.model = {
              user: '3',
              pokemon: id as string,
            };
            this.pokefire
              .agregarPokemon(this.model)
              .then((pipa) => {
                console.log(pipa);
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
    });

    await alert.present();
  }
}
