import { PokemonService } from './../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  pokeselect: Array<any> = [];
  calular: Array<any> = [];
  pokeiniciado: boolean = false;
  ivVida: any;
  ivdataque: any;
  ivdefensa: any;
  ivdataqueEsp: any;
  ivdefensaEsp: any;
  ivvelocidad: any;
  movimientos: Array<any> = [];
  ataque1: any;
  ataque2: any;
  ataque3: any;
  ataque4: any;
  ataque5: any;
  ataque6: any;
  borrar: boolean = false;
  load: boolean = false;
  der1: boolean = false;
  der2: boolean = false;
  der3: boolean = false;
  der4: boolean = false;
  der5: boolean = false;
  der6: boolean = false;
  calu: boolean = true;
  constructor(private route: ActivatedRoute, private poke: PokemonService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.getPokemon(id).then((data) => {
        this.pokeselect = data;
        console.log(this.pokeselect);
        this.pokeiniciado = true;
        console.log(this.pokeiniciado);
      });
    });
  }
  getPokemon = (id: any) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
      response.json()
    );
  calculo() {
    this.calu = false;
    if (this.ivVida <= 31 && this.ivVida >= 0) {
      this.load = true;
      this.der1 = true;
      this.ivVida = '';
    }
    if (this.ivdataque <= 31 && this.ivdataque >= 0) {
      this.ivdataque = '';
      this.load = true;
      this.der1 = true;
    }
    if (this.ivdefensa <= 31 && this.ivdefensa >= 0) {
      this.ivdefensa = '';
      this.load = true;
      this.der2 = true;
    }
    if (this.ivdataqueEsp <= 31 && this.ivdataqueEsp >= 0) {
      this.load = true;
      this.der2 = true;
      this.ivVida = 0;
      this.ivdataqueEsp= '';
    }
    if (this.ivdefensaEsp <= 31 && this.ivdefensaEsp >= 0) {
      this.ivdefensaEsp = '';
      this.load = true;
      this.der3 = true;
    }
    if (this.ivvelocidad <= 31 && this.ivvelocidad >= 0) {
      this.ivvelocidad = '';
      this.load = true;
      this.der3 = true;
    }
    this.borrar = true;
  }
  delet() {
    this.ivVida = '';
    this.ivdataque = '';
    this.ivdefensa = '';
    this.ivdataqueEsp = '';
    this.ivdefensaEsp = '';
    this.ivvelocidad = '';
    this.borrar = false;
    this.load = false;
    this.der1 = false;
    this.der2 = false;
    this.der3 = false;
    this.calu = true;
  }
}
