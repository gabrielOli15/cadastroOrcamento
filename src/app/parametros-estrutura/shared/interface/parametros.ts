import { Parametro } from './parametro';

export interface Parametros {
  items: Array<Parametro>;
  hasNext: boolean;
  remainingRecords: number;
}
