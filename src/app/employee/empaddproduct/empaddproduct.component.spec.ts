import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpaddproductComponent } from './empaddproduct.component';

describe('EmpaddproductComponent', () => {
  let component: EmpaddproductComponent;
  let fixture: ComponentFixture<EmpaddproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpaddproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpaddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
