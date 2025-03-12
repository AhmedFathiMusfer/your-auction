import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionFormComponentComponent } from './auction-form-component.component';

describe('AuctionFormComponentComponent', () => {
  let component: AuctionFormComponentComponent;
  let fixture: ComponentFixture<AuctionFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
