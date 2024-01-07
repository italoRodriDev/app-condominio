import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApartamentosPage } from './apartamentos.page';

describe('ApartamentosPage', () => {
  let component: ApartamentosPage;
  let fixture: ComponentFixture<ApartamentosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApartamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
