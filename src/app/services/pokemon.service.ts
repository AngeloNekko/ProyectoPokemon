import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor() { }
  //Todos los pokes
  getPokedex=()=>fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`).then((response)=>response.json());
  //Un solo pokemon
  getPokemon=(id: any)=>fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response)=>response.json());
}
