import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerImagesComponent } from './corner-images.component';

describe('CornerImagesComponent', () => {
  let component: CornerImagesComponent;
  let fixture: ComponentFixture<CornerImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CornerImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CornerImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
