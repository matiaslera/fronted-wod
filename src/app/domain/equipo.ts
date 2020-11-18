import { Jugador, Paises } from './jugador';

export interface Equipo {
    $key?: string;
    nombre: string;
    pais: Paises;
    players: Jugador[];
  }