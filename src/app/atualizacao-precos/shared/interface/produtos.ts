import { Produto } from './produto';

export interface Produtos {
  items: Array<Produto>;
  hasNext: boolean;
  remainingRecords: number;
}
