import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemploApi } from './ejemplo-api';

describe('EjemploApi', () => {
  let component: EjemploApi;
  let fixture: ComponentFixture<EjemploApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjemploApi],
    }).compileComponents();

    fixture = TestBed.createComponent(EjemploApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
