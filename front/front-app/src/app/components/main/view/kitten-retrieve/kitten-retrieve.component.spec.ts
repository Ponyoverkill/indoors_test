import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KittenRetrieveComponent } from './kitten-retrieve.component';

describe('KittenRetrieveComponent', () => {
  let component: KittenRetrieveComponent;
  let fixture: ComponentFixture<KittenRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KittenRetrieveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KittenRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
