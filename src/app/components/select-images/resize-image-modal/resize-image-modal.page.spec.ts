import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResizeImageModalPage } from './resize-image-modal.page';

describe('ResizeImageModalPage', () => {
  let component: ResizeImageModalPage;
  let fixture: ComponentFixture<ResizeImageModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResizeImageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
