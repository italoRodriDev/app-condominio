import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentoConcluidoPage } from './agendamento-concluido.page';

describe('AgendamentoConcluidoPage', () => {
  let component: AgendamentoConcluidoPage;
  let fixture: ComponentFixture<AgendamentoConcluidoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgendamentoConcluidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
