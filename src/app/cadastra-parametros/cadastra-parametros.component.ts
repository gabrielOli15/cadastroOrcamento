import { Component, ViewChild, OnInit, viewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField, SharedModule, PoNotificationService } from '../shared/shared.module';
import { Router } from '@angular/router';
import { CadastraParametrosService } from './shared/service/cadastra-parametros.service';
import { PoDialogService, PoDynamicFormValidation, PoPageAction, PoDynamicFormComponent } from '@po-ui/ng-components';
import { api } from '../model/api';
import { ActivatedRoute } from '@angular/router';

const apiData: api = new api();

@Component({
  selector: 'app-cadastra-parametros',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cadastra-parametros.component.html',
  styleUrl: './cadastra-parametros.component.css'
})
export class CadastraParametrosComponent {
  @ViewChild('dynamicForm', { static: true }) dynamicForm: PoDynamicFormComponent | undefined;
  
  constructor(
    private router: Router,
    private cadastraParametrosService: CadastraParametrosService,
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute
    
  ) {}

  parametro: any;
  isHideLoading = true;
  isEdit = false;

  actions: PoPageAction[] = [
    {
      label: 'Salvar',
      action: this.confirmSave.bind(this),
      disabled: () => this.dynamicForm?.form.invalid
    },
    {
      label: 'Voltar',
      action: () => this.router.navigate(['orcamentos/parametros'])
    }
  ];
 

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Orçamentos', action: () => this.router.navigate(['/']) },
      { label: 'Parâmetros', action: () => this.router.navigate(['orcamentos/parametros']) },
      { label: 'Cadastro' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { 
      property: 'zx2_cod', 
      divider: 'Mão de Obra', 
      label: 'Mão de Obra', 
      key: true, 
      optionsService: apiData.URL + "/cardallapis/produtos?filter=b1_grupo eq '99'",
      optionsMulti: false,
      fieldLabel: 'b1_desc',
      fieldValue: 'b1_cod'
    }, 
    { 
      property: 'zx2_desc', 
      label: 'Descrição', 
      required: true,
      maxLength: 70 
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
      optionsService: apiData.URL + "/cardallapis/produtos?filter=b1_grupo eq '40'",
      optionsMulti: false,
      fieldLabel: 'b1_desc',
      fieldValue: 'b1_cod'
    },
    { property: 'zx2_cmc', divider: 'Consumíveis', label: '% Cons. MC', type: 'number', mask: '99.99' },
    { property: 'zx2_cmt', label: '% Cons. MT', type: 'number', mask: '99.99' },
    { property: 'zx2_smc', label: '% Sucata MC', type: 'number', mask: '99.99' },
    { property: 'zx2_smt', label: '% Sucata MT', type: 'number', mask: '99.99' },
    { property: 'zx2_fmc', label: '% Frete MC', type: 'number', mask: '99.99' },
    { property: 'zx2_fmt', label: '% Frete MT', type: 'number', mask: '99.99'  }
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params && params['parametro']) {
          this.parametro =  JSON.parse(params['parametro']); 
          this.isEdit = true; 
          console.log('parametros',this.parametro); 
        }
      }
    )
  } 

  confirmSave() {
    this.poDialog.confirm({
      title: 'Confirmação',
      message: 'Deseja realmente salvar o registro?',
      confirm: () => this.saveRecord(),
      cancel: () => console.log('Cancelado')
    });
  }

  retornar() {
    this.router.navigate(['orcamentos/parametros'])
  }

  saveRecord() {
    this.isHideLoading = false;
 
    console.log('Salvando registro', this.parametro);
    // if (this.isEdit) {
    //   this.cadastraParametrosService.editParametro(this.parametro).subscribe(
    //     response => {
    //       console.log('Registro salvo', response);
    //       this.isHideLoading = true;
    //       this.poNotification.success('Parâmetro atualizado com sucesso');
    //       this.router.navigate(['orcamentos/parametros']);
    //     },
    //     error => {
    //       console.error('Erro ao editar registro', error);
    //     }
    //   );
    // } else {
    //   this.cadastraParametrosService.saveParametro(this.parametro).subscribe(
    //     response => {
    //       console.log('Registro salvo', response);
    //   this.isHideLoading = true;

    //       this.poNotification.success('Parâmetro criado com sucesso');
    //       this.router.navigate(['orcamentos/parametros']);
    //     },
    //     error => {
    //       console.error('Erro ao salvar registro', error);
    //     }
    //   );
    // }
  } 
}