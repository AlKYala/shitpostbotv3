import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitpostPageComponent } from './shitpost-page.component';

describe('ShitpostPageComponent', () => {
  let component: ShitpostPageComponent;
  let fixture: ComponentFixture<ShitpostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShitpostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShitpostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
