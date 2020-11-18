import { Type } from '@angular/core';

export interface Jugador {
    $key?: string; //Angular necesita este campo.
    nombre: string;
    apellido: string;
    posicion: NumeroPosicion;
    peso: number;
    altura: number;
    nacionalidad: Paises;
    zurdo: boolean;
  }

export enum NumeroPosicion{
    ARQUERO,
    DEFENSA,
    MEDIO,
    DELANTERO
}

export enum Paises{
    ARGENTINA,
    BRAZIL,
    CHILE,
    URUGUAY,
    MEXICO,
    PERU,
    BOLIVIA,
    PARAGUAY
}
