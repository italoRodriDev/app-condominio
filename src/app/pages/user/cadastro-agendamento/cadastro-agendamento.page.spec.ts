import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAgendamentoPage } from './cadastro-agendamento.page';

describe('CadastroAgendamentoPage', () => {
  let component: CadastroAgendamentoPage;
  let fixture: ComponentFixture<CadastroAgendamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastroAgendamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
