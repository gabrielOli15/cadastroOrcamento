import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormField, SharedModule, PoNotificationService, PoDialogService, PoDynamicFormValidation, PoPageAction, PoDynamicFormComponent } from '../shared/shared.module';
import { CadastraParametrosService } from './shared/service/cadastra-parametros.service';
import { api } from '../model/api';
import { Parametro } from './shared/interface/parametro';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
const apiData: api = new api();

@Component({
  selector: 'app-cadastra-parametros',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cadastra-parametros.component.html',
  styleUrl: './cadastra-parametros.component.css'
})
export class CadastraParametrosComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicForm', { static: true }) dynamicForm: PoDynamicFormComponent | undefined;
  
  parametro: Parametro | null = null;
  isEdit = false;

  private readonly MENSAGENS = {
    SUCESSO_CRIAR: 'Parâmetro criado com sucesso',
    SUCESSO_EDITAR: 'Parâmetro atualizado com sucesso',
    ERRO_CRIAR: 'Erro ao salvar registro',
    ERRO_EDITAR: 'Erro ao editar registro',
    CONFIRMAR_SALVAR: 'Deseja realmente salvar o registro?',
    CARREGANDO: 'Processando...',
  };

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private cadastraParametrosService: CadastraParametrosService,
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute
  ) {}

  readonly actions: PoPageAction[] = [
    {
      label: 'Salvar',
      action: this.confirmSave.bind(this),
      disabled: () => this.dynamicForm?.form.invalid
    },
    {
      label: 'Voltar',
      action: () => this.navegarParaParametros()
    }
  ];

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Orçamentos', action: () => this.router.navigate(['/']) },
      { label: 'Parâmetros', action: () => this.navegarParaParametros() },
      { label: 'Cadastro' }
    ]
  };

  readonly fields: Array<PoDynamicFormField> = [
    {
      property: 'zx2_cod',
      divider: 'Parâmetro', 
      label: 'Código',
      key: true,
      required: true,
      disabled: true,
      gridColumns: 4,
      gridSmColumns: 4
    },
    { 
      property: 'zx2_desc', 
      label: 'Descrição', 
      placeholder: 'Nome do parâmetro',
      required: true,
      maxLength: 70,
      gridColumns: 4,
      gridSmColumns: 4 
    },
    { 
      property: 'zx2_mod', 
      divider: 'Mão de Obra e Produtividade',
      label: 'Mão de Obra', 
      key: true, 
      optionsService: `${apiData.URL}/cardallapis/modobra`,
      optionsMulti: false,
      fieldLabel: 'b1_desc',
      fieldValue: 'b1_cod',
      gridColumns: 4,
      gridSmColumns: 4
    }, 
    { 
      property: 'zx2_tpprod', 
      label: 'Tipo Produtividade', 
      required: true, 
      options: [
        { value: 'K', label: 'KG/H', color: 'color-01' },
        { value: 'H', label: 'Horas', color: 'color-02' } 
      ],
      type: 'label',
      gridColumns: 4,
      gridSmColumns: 4
    },
    { 
      property: 'zx2_vlprod', 
      label: 'Valor Produtividade', 
      required: true,
      type: 'number',
      gridColumns: 4,
      gridSmColumns: 4
    },
    { 
      property: 'zx2_kit', 
      divider: 'Kit Tinta', 
      label: 'Kit Tinta', 
      key: true, 
      optionsService: `${apiData.URL}/cardallapis/kittinta`,
      optionsMulti: false,
      fieldLabel: 'b1_desc',
      fieldValue: 'b1_cod',
      gridColumns: 4,
      gridSmColumns: 4
    },
    {
      property: 'zx2_var',
      label: 'Variável',
      type: 'label',
      options: [
        { value: 'P', label: 'Peso', color: 'color-01' },
        { value: 'E', label: 'Externa', color: 'color-02' },
        { value: 'I', label: 'Interna', color: 'color-03' },
        { value: '', label: 'Não possui', color: 'color-05' }
      ]
    },
    { 
      property: 'zx2_cmc', 
      divider: 'Consumíveis', 
      label: '% Consumíveis MC', 
      type: 'number', 
      maxValue: 100.00,
      gridColumns: 4,
      gridSmColumns: 4
    },
    
    { 
      property: 'zx2_smc', 
      label: '% Sucata MC', 
      type: 'number', 
      maxValue: 100.00,
      gridColumns: 4,
      gridSmColumns: 4
    },
    { 
      property: 'zx2_fmc', 
      label: '% Frete MC', 
      type: 'number', 
      maxValue: 100.00,
      gridColumns: 4,
      gridSmColumns: 4
    },
    { 
      property: 'zx2_cmt', 
      label: '% Consumíveis MT', 
      type: 'number', 
      maxValue: 100.00,
      gridColumns: 4,
      gridSmColumns: 4
    },
    { 
      property: 'zx2_smt', 
      label: '% Sucata MT', 
      type: 'number', 
      maxValue: 100.00,
      gridColumns: 4,
      gridSmColumns: 4
    }, 
    { 
      property: 'zx2_fmt', 
      label: '% Frete MT', 
      type: 'number', 
      maxValue: 100.00,
      gridColumns: 4,
      gridSmColumns: 4
    }
  ];

  ngOnInit(): void {
    this.carregarParametro();
  }

  private carregarParametro(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params && params['parametro']) {
          try {
            console.log('parametro',params['parametro']);
            const parametroObj = JSON.parse(params['parametro']);
            this.parametro = parametroObj;
            this.isEdit = true; 
          } catch (error) {
            this.tratarErro(error, false);
          }
        } else {
          // Definir valores padrão como 0 para campos numéricos
          this.parametro = {
            zx2_cod: '',
            zx2_desc: '',
            zx2_mod: '',
            zx2_kit: '',
            zx2_vlprod: 0,
            zx2_var: '',
            zx2_cmc: 0,
            zx2_cmt: 0,
            zx2_smc: 0,
            zx2_smt: 0,
            zx2_fmc: 0,
            zx2_fmt: 0,
            zx2_tpprod: ''
          };
        }
      });
  }

  private navegarParaParametros(): void {
    this.router.navigate(['orcamentos/parametros']);
  }

  confirmSave(): void {
    this.poDialog.confirm({
      title: 'Confirmação',
      message: this.MENSAGENS.CONFIRMAR_SALVAR,
      confirm: () => this.saveRecord(),
      cancel: () => {}
    });
  }

  private async saveRecord(): Promise<void> {
    try {
      if (this.isEdit) {
        await this.editarParametro();
      } else {
        await this.criarNovoParametro();
      }

      this.navegarParaParametros();
    } catch (error) {
      this.tratarErro(error, this.isEdit);
    }
  }

  private async editarParametro(): Promise<void> {
    if (!this.parametro) {
      throw new Error('Parâmetro não encontrado');
    }
    await this.cadastraParametrosService.editParametro(this.parametro).toPromise();
    this.poNotification.success(this.MENSAGENS.SUCESSO_EDITAR);
  }

  private async criarNovoParametro(): Promise<void> {
    const formData = this.dynamicForm?.form.value;
    if (!formData) {
      throw new Error('Dados do formulário inválidos');
    }
    await this.cadastraParametrosService.saveParametro(formData).toPromise();
    this.poNotification.success(this.MENSAGENS.SUCESSO_CRIAR);
  }

  private tratarErro(error: unknown, isEdit: boolean): void {
    const mensagem = isEdit ? this.MENSAGENS.ERRO_EDITAR : this.MENSAGENS.ERRO_CRIAR;
    let mensagemErro = 'Erro desconhecido';
    
    if (error instanceof Error) {
      mensagemErro = error.message;
    } else if (this.isHttpError(error)) {
      console.log(error.error.errorMessage);
      mensagemErro = decodeURIComponent(escape(error.error.errorMessage ?? '')) || 'Erro na requisição';
    } else if (typeof error === 'string') {
      mensagemErro = error;
    }

    this.poNotification.error(`${mensagem}: ${mensagemErro}`);
    console.error('Erro detalhado:', {
      tipo: error?.constructor?.name || typeof error,
      mensagem: mensagemErro,
      erro: error
    });
  }

  private isHttpError(error: unknown): error is { error: { errorMessage?: string } } {
    return (
      typeof error === 'object' && 
      error !== null && 
      'error' in error &&
      typeof (error as any).error === 'object'
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}