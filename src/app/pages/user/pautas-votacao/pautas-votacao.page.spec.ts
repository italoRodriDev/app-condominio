import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PautasVotacaoPage } from './pautas-votacao.page';

describe('PautasVotacaoPage', () => {
  let component: PautasVotacaoPage;
  let fixture: ComponentFixture<PautasVotacaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PautasVotacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
