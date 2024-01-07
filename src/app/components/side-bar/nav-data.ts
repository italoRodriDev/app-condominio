export const NAVBAR_DATA_MENU = [
  { title: 'Início', router: 'inicio', icon: 'home-outline', numberItems: 0 },
  { title: 'Apartamentos', router: 'apartamentos', icon: 'business-outline', numberItems: 0 },
  { title: 'Sair da conta', router: 'SAIR_DA_CONTA', icon: 'exit-outline', numberItems: 0 },
];

export interface ItemMenuData {
  title: string;
  router: string;
  icon: string;
  numberItems: number;
}