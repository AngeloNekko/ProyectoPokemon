import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  datos: Array<any> = [];
  pokedato: Array<any> = [];
  pokeiniciado: boolean = false;
  constructor(
    private favo: FirebaseService,
    public alertController: AlertController
  ) {}
  ngOnInit() {
    this.favo.retornarPokemons().subscribe((dato) => {
      this.datos = dato;
      const tamaño = this.datos;
      for (let j = 0; j < tamaño.length; j++) {
        if (this.datos[j].user === '3') {
          this.getPokemon(this.datos[j].pokemon).then((poke) => {
            console.log(poke);
            poke.firebase = j;
            this.pokedato[j] = poke;
            console.log(this.pokedato[j]);
          });
        }
      }
    });
    this.pokeiniciado = true;
  }
  getPokemon = (id: any) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
      response.json()
    );
  //Borrar personaje Favorito
  async deletePoke(id: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Quitar pokemon',
      message: 'Quiere Quitar de tus favoritos?',
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
            this.pokeiniciado=false;
            this.favo.eliminarPokemon(this.datos[id].id).then(()=>{
              location.reload();
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
