import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditApartamentoPage } from './edit-apartamento.page';

describe('EditApartamentoPage', () => {
  let component: EditApartamentoPage;
  let fixture: ComponentFixture<EditApartamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditApartamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
