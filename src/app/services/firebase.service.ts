import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firebase: AngularFirestore) {}
  //Aqui metodo para listar todos los pokemons
  agregarPokemon(pokemon: any) {
    return this.firebase.collection('pokemons').add(pokemon);
  }

  eliminarPokemon(pokemon: any) {
    return this.firebase.collection('pokemons').doc(pokemon).delete();
  }

  retornarPokemons() {
    return this.firebase
      .collection('pokemons')
      .snapshotChanges()
      .pipe(
        map((base) =>
          base.map((separado) => {
            const id = separado.payload.doc.id;
            const documento = separado.payload.doc.data() as Object;
            return { id, ...documento };
          })
        )
      );
  }
}
