import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsjgrupalComponent } from './msjgrupal.component';

describe('MsjgrupalComponent', () => {
  let component: MsjgrupalComponent;
  let fixture: ComponentFixture<MsjgrupalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsjgrupalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsjgrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
