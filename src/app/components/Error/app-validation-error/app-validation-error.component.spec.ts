import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppValidationErrorComponent } from './app-validation-error.component';

describe('AppValidationErrorComponent', () => {
  let component: AppValidationErrorComponent;
  let fixture: ComponentFixture<AppValidationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppValidationErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppValidationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
