import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NoteFormComponent } from './note-form.component';

describe('NoteFormComponent', () => {
  let component: NoteFormComponent;
  let fixture: ComponentFixture<NoteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzSpinModule,
        NzButtonModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should pre fill form', () => {
    component.note = {
      id: 1,
      title: 'Title',
    };

    fixture.detectChanges();
    const input = fixture.nativeElement.querySelectorAll('input')[0];

    expect(input.value).toBe('Title');
  });

  it('should emit event when pressing the button', done => {
    const input = fixture.nativeElement.querySelectorAll('input')[0];
    input.value = 'Text';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[0];

    component.save.subscribe(([data, doneSaving]: any) => {
      fixture.detectChanges();
      expect(data).toEqual({ title: 'Text', id: undefined, content: null });
      expect(button.classList.contains('ant-btn-loading')).toBeTrue();

      doneSaving();
      fixture.detectChanges();

      expect(button.classList.contains('ant-btn-loading')).toBeFalse();
      done();
    });

    button.click();
  });
});
