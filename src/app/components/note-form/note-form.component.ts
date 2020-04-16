import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Note } from '../../../types/note';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent {
  @Input() set note(note: Note) {
    this.createForm(note);
    if (note) {
      this.noteId = note.id;
    }
  }

  @Output() save = new EventEmitter<[Note, () => void]>();

  form: FormGroup;
  sending = false;
  noteId: number;

  constructor(
    private fb: FormBuilder,
  ) {
    this.createForm({} as any);
  }

  onSubmitForm() {
    if (this.form.invalid) {
      return;
    }

    this.sending = true;

    const noteId = this.noteId;
    const value = {
      id: noteId,
      ...this.form.value,
    };
    this.save.next([value, () => this.sending = false]);
  }

  private createForm(note?: Note) {
    this.form = this.fb.group({
      title: [note?.title, Validators.required],
      content: note?.content,
    });
  }
}
