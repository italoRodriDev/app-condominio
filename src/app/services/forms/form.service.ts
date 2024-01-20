import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const EMPTY_REGEX = /(.|\s)*\S(.|\s)*/;
const PRICE_REGEX = /^[\d.,]+$/;
const NUMBER_REGEX = /^[0-9]+$/;

@Injectable({
  providedIn: 'root',
})
export class FormService {
  urlSiteOficial: string = '';
  readonly userNameValidator = [
    '',
    [Validators.minLength(3), Validators.maxLength(100), Validators.required],
  ];
  readonly searchValidator = [
    '',
    [
      Validators.pattern(EMPTY_REGEX),
      Validators.minLength(20),
      Validators.maxLength(200),
    ],
  ];
  readonly nameValidator = [
    '',
    [Validators.minLength(3), Validators.maxLength(100), Validators.required],
  ];
  readonly textValidator = [
    '',
    [Validators.minLength(1), Validators.maxLength(100), Validators.required],
  ];
  readonly emailValidator = [
    '',
    [
      Validators.email,
      Validators.minLength(8),
      Validators.maxLength(100),
      Validators.required,
    ],
  ];
  readonly passValidator = [
    '',
    [Validators.minLength(8), Validators.maxLength(30), Validators.required],
  ];
  readonly titleValidator = [
    '',
    [Validators.minLength(1), Validators.maxLength(100), Validators.required],
  ];
  readonly descValidator = [
    '',
    [Validators.minLength(8), Validators.maxLength(9000), Validators.required],
  ];
  readonly numberAddressValidator = [
    '',
    [
      Validators.pattern(NUMBER_REGEX),
      Validators.minLength(1),
      Validators.maxLength(10),
      Validators.required,
    ],
  ];

  readonly numberValidator = [
    '',
    [
      Validators.pattern(NUMBER_REGEX),
      Validators.minLength(0),
      Validators.maxLength(9999),
    ],
  ];

  readonly phoneValidator = [
    '',
    [
      Validators.pattern(NUMBER_REGEX),
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.required,
    ],
  ];
  readonly formattedAddressValidator = [
    '',
    [Validators.minLength(10), Validators.maxLength(300), Validators.required],
  ];
  readonly reqValidator = ['', [Validators.required]];

  readonly priceValidator = [
    '',
    [Validators.required, Validators.pattern(PRICE_REGEX)],
  ];

  listThemes: Array<any> = [
    { id: '1', title: 'Azul Marinho', primary: '#003B95' },
    { id: '2', title: 'Roxo', primary: '#6200ee' },
    { id: '3', title: 'Azul Bebê', primary: '#00b3ff' },
    { id: '4', title: 'Azul', primary: '#014bd5' },
    { id: '5', title: 'Azul Turquesa', primary: '#00ced1' },
    { id: '6', title: 'Rosa Pink', primary: '#ff0088' },
    { id: '7', title: 'Rosa Claro', primary: '#ff94cd' },
    { id: '8', title: 'Amarelo', primary: '#ffc800' },
    { id: '9', title: 'Vermelho', primary: '#ff0000' },
    { id: '10', title: 'Vermelho Claro', primary: '#ff2e2e' },
    { id: '11', title: 'Vermelho Sangue', primary: '#8b0000' },
    { id: '12', title: 'Laranja', primary: '#ff4d00' },
    { id: '13', title: 'Laranja Lima', primary: '#ff9500' },
    { id: '14', title: 'Laranja Vivo', primary: '#ff5c00' },
    { id: '15', title: 'Margenta', primary: '#ee00ff' },
    { id: '16', title: 'Verde Água', primary: '#00ff84' },
    { id: '17', title: 'Verde Limão', primary: '#82ff2e' },
    { id: '18', title: 'Preto', primary: '#000000' },
    { id: '19', title: 'Dark', primary: '#262626' },
    { id: '20', title: 'Azul Céu', primary: '#87ceeb' },
    { id: '21', title: 'Verde Musgo', primary: '#7cbb0e' },
    { id: '22', title: 'Verde Jade', primary: '#00a86b' },
    { id: '23', title: 'Cinza', primary: '#808080' },
    { id: '24', title: 'Verde Oliva', primary: '#556b2f' },
    { id: '25', title: 'Violeta', primary: '#8a2be2' },
    { id: '26', title: 'Violeta bebê', primary: '#b19cd9' },
    { id: '27', title: 'Azul Safira', primary: '#0f52ba' },
    { id: '28', title: 'Verde Lima', primary: '#adff2f' },
    { id: '29', title: 'Rosa Choque', primary: '#ff1493' },
    { id: '30', title: 'Amarelo Ouro', primary: '#ffd700' },
    { id: '31', title: 'Verde Esmeralda', primary: '#008000' },
    { id: '32', title: 'Azul Ciano', primary: '#00ffff' },
    { id: '33', title: 'Roxo Escuro', primary: '#9400d3' },
    { id: '34', title: 'Amarelo Mostarda', primary: '#ffdb58' },
  ].sort((a, b) => a.title.localeCompare(b.title));

  listDays: Array<any> = [
    {
      day: 0,
      open: false,
      name: 'Domingo',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 1,
      open: false,
      name: 'Segunda',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 2,
      open: false,
      name: 'Terça',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 3,
      open: false,
      name: 'Quarta',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 4,
      open: false,
      name: 'Quinta',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 5,
      open: false,
      name: 'Sexta',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
    {
      day: 6,
      open: false,
      name: 'Sábado',
      openHour: '2023-01-10T08:00:00-03:00',
      closeHour: '2023-01-10T18:30:00-03:00',
    },
  ];

  formConfirmPass: FormGroup = this.fb.group({
    idUser: this.reqValidator,
    idApt: this.reqValidator,
    idCondominio: this.reqValidator,
    email: this.emailValidator,
    password: this.passValidator,
    confirmPassword: this.reqValidator,
  });

  formRecoveryPass: FormGroup = this.fb.group({
    email: this.emailValidator,
  });

  formSignIn: FormGroup = this.fb.group({
    email: this.emailValidator,
    password: this.passValidator,
  });

  formSignUp: FormGroup = this.fb.group({
    idApt: [],
    email: this.emailValidator,
    password: this.passValidator,
  });

  formSignUpFinish: FormGroup = this.fb.group({
    perfilCompleto: [],
    name: this.nameValidator,
    phone: this.phoneValidator,
    cnpj: this.reqValidator,
  });

  // -> Formularios de cadastro configuracao
  formSettings: FormGroup = this.fb.group({
    idUser: this.reqValidator,
    perfilCompleto: this.reqValidator,
    typeUser: this.reqValidator,
    name: this.nameValidator,
    phone: this.phoneValidator,
    cnpj: this.reqValidator,
    address: this.reqValidator,
    color: this.reqValidator,
    daysGourmet: this.reqValidator,
    logo: [],
  });

  formProfile: FormGroup = this.fb.group({
    name: this.nameValidator,
    email: this.emailValidator,
    cpf: this.reqValidator,
    birthDate: this.reqValidator,
    phone: this.phoneValidator,
    gender: this.reqValidator,
    logo: [],
  });

  formAgendamento: FormGroup = this.fb.group({
    nomeResponsavel: this.nameValidator,
    data: this.reqValidator,
    tipo: this.reqValidator,
    apartamento: this.reqValidator,
    observacao: this.descValidator,
    id: [],
  });

  formApartamento: FormGroup = this.fb.group({
    id: [],
    condominio: [],
    perfilCompleto: [],
    nome: this.nameValidator,
    numeroBloco: this.reqValidator,
    email: this.emailValidator,
    telefone: this.phoneValidator,
    status: this.reqValidator,
  });

  formPautaVotacao: FormGroup = this.fb.group({
    id: [],
    pauta: this.titleValidator,
    motivo: this.descValidator,
    status: this.reqValidator,
    data: this.reqValidator,
  });

  constructor(private fb: FormBuilder) {
    this.resetDataForm();
  }

  resetDataForm() {
    this.formRecoveryPass.reset();
    this.formSignIn.reset();
    this.formSignUp.reset();
    this.formProfile.reset();
    this.formSignUpFinish.reset();
    this.formAgendamento.reset();
    this.formApartamento.reset();
    this.formPautaVotacao.reset();
    this.formSettings.reset();

    this.formSettings.patchValue({
      logo: null,
    });

    this.formApartamento.patchValue({
      status: true,
    });

    this.formPautaVotacao.patchValue({
      status: true,
    });
  }
}
