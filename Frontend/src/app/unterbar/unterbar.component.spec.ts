import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnterbarComponent } from './unterbar.component';

describe('UnterbarComponent', () => {
  let component: UnterbarComponent;
  let fixture: ComponentFixture<UnterbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnterbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
