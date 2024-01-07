export interface CondominioModel {
  // Usuario
  idUser: string;
  name: string;
  email: string;
  cnpj: string;
  birthDate: string;
  phone: string;
  gender: string;
  typeRegister: string;
  photoProfile: Array<any>;
}
