import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'entrar',
    pathMatch: 'full',
  },
  {
    path: 'splash/:id',
    loadComponent: () => import('./pages/auth/splash/splash.page').then( m => m.SplashPage)
  },
 
  {
    path: 'entrar',
    loadComponent: () =>
      import('./pages/auth/signin/signin.page').then((m) => m.SigninPage),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/auth/signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'criar-senha',
    loadComponent: () => import('./pages/auth/confirm-password/confirm-password.page').then( m => m.ConfirmPasswordPage)
  },
  {
    path: 'finalizar-cadastro',
    loadComponent: () =>
      import('./pages/auth/finish-signup/finish-signup.page').then(
        (m) => m.FinishSignupPage
      ),
  },
  {
    path: 'recuperacao',
    loadComponent: () =>
      import('./pages/auth/recover-password/recover-password.page').then(
        (m) => m.RecoverPasswordPage
      ),
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
  {
    path: 'apartamentos',
    loadComponent: () => import('./pages/admin/apartamentos/apartamentos.page').then( m => m.ApartamentosPage)
  },
  {
    path: 'edit-apartamento',
    loadComponent: () => import('./pages/admin/apartamentos/edit-apartamento/edit-apartamento.page').then( m => m.EditApartamentoPage)
  },
  
];
