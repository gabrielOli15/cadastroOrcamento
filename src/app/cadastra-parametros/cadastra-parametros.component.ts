import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField, SharedModule } from '../shared/shared.module';
import { PoPageDynamicEditComponent, PoPageDynamicEditActions, PoPageDynamicEditLiterals  } from '@po-ui/ng-templates';
import { Router } from '@angular/router';
import { CadastraParametrosService } from './shared/service/cadastra-parametros.service'; 

@Component({
  selector: 'app-cadastra-parametros',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cadastra-parametros.component.html',
  styleUrl: './cadastra-parametros.component.css'
})
export class CadastraParametrosComponent {
  @ViewChild('dynamicEdit', { static: true }) dynamicEdit: PoPageDynamicEditComponent | undefined;

  constructor(
      private router: Router,
      private cadastraParametrosService: CadastraParametrosService
  ) {}

  public readonly serviceApi = 'https://po-sample-api.onrender.com/v1/people';

  public readonly actions: PoPageDynamicEditActions = {
    save: '/documentation/po-page-dynamic-detail',
    saveNew: '/documentation/po-page-dynamic-edit'
  };

  public readonly literals: PoPageDynamicEditLiterals = {
    pageActionCancel: 'Descartar',
    pageActionSave: 'Gravar',
    pageActionSaveNew: 'Gravar e novo'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Orçamentos', action: () => this.router.navigate(['/']) },
      { label: 'Parâmetros', action: () => this.router.navigate(['orcamentos/parametros']) },
      { label: 'Cadastro' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { 
      property: 'b1_cod', 
      divider: 'Mão de Obra', 
      label: 'Mão de Obra', 
      key: true, 
      required: true, 
      optionsService: 'http://192.168.2.235:7200/rest/cardallapis/SB1',
      optionsMulti: false
    },
    { 
      property: 'g1_cod', 
      label: 'Estruturas', 
      key: true, 
      required: true, 
      optionsService: 'http://192.168.2.235:7200/rest/cardallapis/SG1',
      optionsMulti: true
    },
    { 
      property: 'zx2_tpprod', 
      label: 'Tp. Prod.', 
      required: true,
      options:[
        { value: 'K', label: 'Kg/h', color: 'color-01' }
      ]
    },
    { 
      property: 'zx2_vlprod', 
      label: 'Produtividade', 
      required: true,
      type: 'number'
    },
    { 
      property: 'zx2_kit', 
      divider: 'Kit Tinta', 
      label: 'Kit Tinta', 
      key: true, 
      required: true, 
      optionsService: 'http://192.168.2.235:7200/rest/cardallapis/SB1',
      optionsMulti: false
    },
    { property: 'zx2_cmc', divider: 'Consumíveis', label: '% Cons. MC', type: 'number', offsetMdColumns: 6,
      offsetLgColumns: 6,
      gridMdColumns: 6,
      gridLgColumns: 6 },
    { property: 'zx2_cmt', label: '% Cons. MT', type: 'number', gridLgColumns: 6 },
    { property: 'zx2_smc', label: '% Sucata MC', type: 'number', gridLgColumns: 6 },
    { property: 'zx2_smt', label: '% Sucata MT', type: 'number', gridLgColumns: 6 },
    { property: 'zx2_fmc', label: '% Frete MC', type: 'number', gridLgColumns: 6 },
    { property: 'zx2_fmt', label: '% Frete MT', type: 'number', gridLgColumns: 6  }
  ];

  onKeyDown(property: string, event: KeyboardEvent): void {
    if (event.code === 'F9') {
      if (this.dynamicEdit) {
        this.dynamicEdit.showAdditionalHelp(property);
      }
    }
  }
}
