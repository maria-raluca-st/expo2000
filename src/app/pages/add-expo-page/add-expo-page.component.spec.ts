import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpoPageComponent } from './add-expo-page.component';

describe('AddExpoPageComponent', () => {
  let component: AddExpoPageComponent;
  let fixture: ComponentFixture<AddExpoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
