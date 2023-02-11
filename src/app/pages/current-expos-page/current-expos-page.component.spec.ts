import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentExposPageComponent } from './current-expos-page.component';

describe('CurrentExposPageComponent', () => {
  let component: CurrentExposPageComponent;
  let fixture: ComponentFixture<CurrentExposPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentExposPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentExposPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
