export interface Parametro {
    $selected?: boolean;
    codigo: string;
    tipoProdutividade: string;
    valorProdutividade: number;
    kitTinta: string;
    variavel: string;
    CMC: number;
    CMT: number;
    SMC: number;
    SMT: number;
    FMC: number;
    FMT: number;
    estruturas: Array<any>;
}

// ZX2->ZX2_FILIAL
// ZX2->ZX2_COD
// ZX2->ZX2_TPPROD
// ZX2->ZX2_VLPROD
// ZX2->ZX2_KIT
// ZX2->ZX2_VAR
// ZX2->ZX2_CMC
// ZX2->ZX2_CMT
// ZX2->ZX2_SMC
// ZX2->ZX2_SMT
// ZX2->ZX2_FMC
// ZX2->ZX2_FMT