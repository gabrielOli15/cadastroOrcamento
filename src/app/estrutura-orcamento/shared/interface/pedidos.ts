import { Estrutura } from './estrutura';

export interface Estruturas {
  items: Array<Estrutura>;
  hasNext: boolean;
  remainingRecords: number;
}
