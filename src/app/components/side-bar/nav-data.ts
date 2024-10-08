export const NAVBAR_DATA_MENU_CONDOMINIO = [
  { title: 'Início', router: 'inicio', icon: 'home-outline', numberItems: 0 },
  { title: 'Apartamentos', router: 'apartamentos', icon: 'business-outline', numberItems: 0 },
  { title: 'Pagamentos', router: 'pagamentos-condominio', icon: 'card-outline', numberItems: 0 },
  { title: 'Votações', router: 'votacoes', icon: 'archive-outline', numberItems: 0 },
  { title: 'Configurações', router: 'configuracoes', icon: 'settings-outline', numberItems: 0 },
  { title: 'Sair da conta', router: 'SAIR_DA_CONTA', icon: 'exit-outline', numberItems: 0 },
];

export const NAVBAR_DATA_MENU_MORADOR = [
  { title: 'Início', router: 'inicio', icon: 'home-outline', numberItems: 0 },
  { title: 'Pautas de votação', router: 'pautas-votacao', icon: 'archive-outline', numberItems: 0 },
  { title: 'Fatura', router: 'fatura-condominio', icon: 'card-outline', numberItems: 0 },
  { title: 'Sair da conta', router: 'SAIR_DA_CONTA', icon: 'exit-outline', numberItems: 0 },
];

export const NAVBAR_DATA_MENU_NULL = [
  { title: 'Sair da conta', router: 'SAIR_DA_CONTA', icon: 'exit-outline', numberItems: 0 },
];

export interface ItemMenuData {
  title: string;
  router: string;
  icon: string;
  numberItems: number;
}