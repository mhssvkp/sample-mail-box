import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailMenuComponent } from './mail-menu.component';

describe('MailMenuComponent', () => {
  let component: MailMenuComponent;
  let fixture: ComponentFixture<MailMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
