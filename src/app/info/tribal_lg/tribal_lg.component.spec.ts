import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TribalLgComponent } from './tribal_lg.component';

describe('TribalLgComponent', () => {
  let component: TribalLgComponent;
  let fixture: ComponentFixture<TribalLgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        TribalLgComponent, // standalone component
      ],
      schemas: [NO_ERRORS_SCHEMA], // ignore unknown child components in template
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribalLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

