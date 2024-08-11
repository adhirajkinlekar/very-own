import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcademyComponent } from './create-academy.component';

describe('CreateAcademyComponent', () => {
  let component: CreateAcademyComponent;
  let fixture: ComponentFixture<CreateAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAcademyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
