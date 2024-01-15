import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotacoesPage } from './votacoes.page';

describe('VotacoesPage', () => {
  let component: VotacoesPage;
  let fixture: ComponentFixture<VotacoesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VotacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
