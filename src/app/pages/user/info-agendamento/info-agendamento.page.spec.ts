import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoAgendamentoPage } from './info-agendamento.page';

describe('InfoAgendamentoPage', () => {
  let component: InfoAgendamentoPage;
  let fixture: ComponentFixture<InfoAgendamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoAgendamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
