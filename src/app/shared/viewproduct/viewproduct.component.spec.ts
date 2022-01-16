import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductComponent } from './viewproduct.component';

describe('ViewproductComponent', () => {
  let component: ViewproductComponent;
  let fixture: ComponentFixture<ViewproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewproductComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
