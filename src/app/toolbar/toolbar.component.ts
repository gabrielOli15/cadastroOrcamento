import { Component, OnInit} from '@angular/core';
import { PoDialogService, PoNotificationService, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit { 

  ngOnInit(): void {
  }

  notificationActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-news',
      label: 'Custo do produto X ajustado',
      type: 'danger',
      action: item => this.onClickNotification(item)
    },
    { icon: 'po-icon-message', label: '2 projetos para orçar hoje', type: 'danger', action: item => this.openDialog(item) }
  ];

  profile: PoToolbarProfile = {
    avatar: 'https://via.placeholder.com/48x48?text=AVATAR',
    subtitle: 'joao@cardall.com.br',
    title: 'João'
  };

  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-user', label: 'Dados do Responsável', action: item => this.showAction(item) },
    { icon: 'po-icon-company', label: 'Dados da Empresa', action: item => this.showAction(item) },
    { icon: 'po-icon-settings', label: 'Opções', action: item => this.showAction(item) },
    { icon: 'po-icon-exit', label: 'Exit', type: 'Sair', separator: true, action: item => this.showAction(item) }
  ];

  actions: Array<PoToolbarAction> = [
    { label: 'Start cash register', action: item => this.showAction(item) },
    { label: 'Finalize cash register', action: item => this.showAction(item) },
    { label: 'Cash register options', action: item => this.showAction(item) }
  ];

  title: string = 'PO Toolbar Logged';

  constructor(
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService
  ) {}

  getNotificationNumber() {
    return this.notificationActions.filter(not => not.type === 'danger').length;
  }

  onClickNotification(item: PoToolbarAction) {
    window.open('https://github.com/po-ui/po-angular/blob/master/CHANGELOG.md', '_blank');

    item.type = 'default';
  }

  openDialog(item: PoToolbarAction) {
    this.poDialog.alert({
      title: 'Orçar',
      message: `O Prazo para orçar estes projetos é HOJE!`,
      ok: undefined
    });

    item.type = 'default';
  }

  showAction(item: PoToolbarAction): void {
    this.poNotification.success(`Action clicked: ${item.label}`);
  }

}
