import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaturaCondominioPage } from './fatura-condominio.page';

describe('FaturaCondominioPage', () => {
  let component: FaturaCondominioPage;
  let fixture: ComponentFixture<FaturaCondominioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FaturaCondominioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
