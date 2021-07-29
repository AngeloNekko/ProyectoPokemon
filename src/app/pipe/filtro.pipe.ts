import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DBD',
})
export class FiltroPipe implements PipeTransform {
  transform(value: any, arg: any[]): any {
    let resultPost = value;
    if(arg){
      resultPost = value.filter((pokemon) => {
        if (pokemon.name.indexOf(arg) > -1) {
          return true;
        }
        return false;
      });
    }
    return resultPost;
  }
}
