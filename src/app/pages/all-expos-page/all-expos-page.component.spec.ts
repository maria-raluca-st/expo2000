import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExposPageComponent } from './all-expos-page.component';

describe('AllExposPageComponent', () => {
  let component: AllExposPageComponent;
  let fixture: ComponentFixture<AllExposPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllExposPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExposPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
