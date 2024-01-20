import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagamentosCondominioPage } from './pagamentos-condominio.page';

describe('PagamentosCondominioPage', () => {
  let component: PagamentosCondominioPage;
  let fixture: ComponentFixture<PagamentosCondominioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagamentosCondominioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
