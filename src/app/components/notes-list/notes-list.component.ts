import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Note } from '../../../types/note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {
  @Input() notes: Note[];
  @Output() removeNote = new EventEmitter<Note>();

  constructor(
  ) { }
}
