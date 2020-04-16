import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, pluck } from 'rxjs/operators';

import { Note } from '../../../types/note';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-form-page',
  templateUrl: './note-form-page.component.html',
  styleUrls: ['./note-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormPageComponent {

  note$ = this.route.data
    .pipe(
      pluck('fetched'),
    );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
  ) {
  }

  onSave([note, done]: [Note, () => void]) {
    const source$ = note.id ? this.notesService.put(note) : this.notesService.post(note);

    source$
      .pipe(
        finalize(done),
      )
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}
