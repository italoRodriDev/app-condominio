import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPasswordPage } from './confirm-password.page';

describe('ConfirmPasswordPage', () => {
  let component: ConfirmPasswordPage;
  let fixture: ComponentFixture<ConfirmPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
