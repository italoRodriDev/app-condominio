import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVotacaoPage } from './edit-votacao.page';

describe('EditVotacaoPage', () => {
  let component: EditVotacaoPage;
  let fixture: ComponentFixture<EditVotacaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditVotacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
