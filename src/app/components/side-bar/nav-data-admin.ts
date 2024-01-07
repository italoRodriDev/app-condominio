export const NAVBAR_DATA_MENU_ADMIN = [
  //{ title: 'Visão Geral', router: 'visao-geral', icon: 'home-outline', numberItems: 0 },
  { title: 'Técnicos', router: 'tecnicos', icon: 'person-outline', numberItems: 0 },
  { title: 'Clientes', router: 'clientes', icon: 'business-outline', numberItems: 0 },
  { title: 'Instrumentos', router: 'instrumentos', icon: 'speedometer-outline', numberItems: 0 },
  { title: 'Ensaios', router: 'ensaios', icon: 'flask-outline', numberItems: 0 },
  { title: 'Perguntas', router: 'perguntas', icon: 'chatbubbles-outline', numberItems: 0 },
  { title: 'Tipos de Produtos', router: 'tipos-produtos', icon: 'layers-outline', numberItems: 0 },
  { title: 'Projetos', router: 'projetos', icon: 'library-outline', numberItems: 0 },
  { title: 'Sair da conta', router: 'SAIR_DA_CONTA', icon: 'exit-outline', numberItems: 0 },
];

export interface ItemMenuData {
  title: string;
  router: string;
  icon: string;
  numberItems: number;
}