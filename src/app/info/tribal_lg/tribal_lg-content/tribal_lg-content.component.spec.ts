import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ActivatedRouteStub } from '../../../shared/testing/active-router.stub';
import { TribalLgContentComponent } from './about-content.component';

describe('TribalLgContentComponent', () => {
  let component: TribalLgContentComponent;
  let fixture: ComponentFixture<TribalLgContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), TribalLgContentComponent],
      providers: [{ provide: ActivatedRoute, useValue: new ActivatedRouteStub() }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribalLgContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
