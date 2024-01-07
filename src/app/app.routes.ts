import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'entrar',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/auth/create-account/create-account.page').then( m => m.CreateAccountPage)
  },
  {
    path: 'recuperacao-conta',
    loadComponent: () => import('./pages/auth/recover-password/recover-password.page').then( m => m.RecoverPasswordPage)
  },
  // -> USUARIO
  {
    path: 'inicio',
    loadComponent: () => import('./pages/user/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'cadastro-agendamento',
    loadComponent: () => import('./pages/user/cadastro-agendamento/cadastro-agendamento.page').then( m => m.CadastroAgendamentoPage)
  },
  {
    path: 'info-agendamento',
    loadComponent: () => import('./pages/user/info-agendamento/info-agendamento.page').then( m => m.InfoAgendamentoPage)
  },
  {
    path: 'agendamento-concluido',
    loadComponent: () => import('./pages/user/agendamento-concluido/agendamento-concluido.page').then( m => m.AgendamentoConcluidoPage)
  },
];
