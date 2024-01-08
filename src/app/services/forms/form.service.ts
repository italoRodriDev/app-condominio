import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const EMPTY_REGEX = /(.|\s)*\S(.|\s)*/;
const PRICE_REGEX = /^[\d.,]+$/;
const NUMBER_REGEX = /^[0-9]+$/;

@Injectable({
  providedIn: 'root',
})
export class FormService {
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

  formConfirmPass: FormGroup = this.fb.group({
    idUser: this.reqValidator,
    idApt: this.reqValidator,
    idCondominio: this.reqValidator,
    email: this.emailValidator,
    password: this.passValidator,
    confirmPassword: this.reqValidator
  });

  formRecoveryPass: FormGroup = this.fb.group({
    email: this.emailValidator,
  });

  formSignIn: FormGroup = this.fb.group({
    email: this.emailValidator,
    password: this.passValidator,
  });

  formSignUp: FormGroup = this.fb.group({
    idApt: this.reqValidator,
    email: this.emailValidator,
    password: this.passValidator,
  });

  formSignUpFinish: FormGroup = this.fb.group({
    name: this.nameValidator,
    phone: this.phoneValidator,
    cnpj: this.reqValidator,
  });

  formProfile: FormGroup = this.fb.group({
    name: this.nameValidator,
    email: this.emailValidator,
    cpf: this.reqValidator,
    birthDate: this.reqValidator,
    phone: this.phoneValidator,
    gender: this.reqValidator,
    photoProfile: [],
  });

  formAgendamento: FormGroup = this.fb.group({
    nomeResponsavel: this.nameValidator,
    data: this.reqValidator,
    tipo: this.reqValidator,
    apartamento: this.reqValidator,
    observacao: this.descValidator,
    id: []
  });

  formApartamento: FormGroup = this.fb.group({
    id: [],
    condominio: [],
    nome: this.nameValidator,
    numeroBloco: this.reqValidator,
    email: this.emailValidator,
    telefone: this.phoneValidator,
    status: this.reqValidator,
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

    this.formApartamento.patchValue({
      status: true
    });
  }
}
