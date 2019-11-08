import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionManagerComponent } from './function-manager.component';

describe('FunctionManagerComponent', () => {
  let component: FunctionManagerComponent;
  let fixture: ComponentFixture<FunctionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
