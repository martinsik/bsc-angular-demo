import { Component, Input } from '@angular/core';

import { Note } from '../../../types/note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent {
  @Input() note: Note;
}
