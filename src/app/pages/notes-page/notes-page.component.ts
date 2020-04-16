import { ChangeDetectionStrategy, Component } from '@angular/core';
import { concat, of, Subject } from 'rxjs';
import { shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';

import { NotesService } from '../../services/notes.service';
import { Note } from '../../../types/note';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesPageComponent {

  refresh$ = new Subject();
  notes$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => concat(of(null), this.notesService.listNotes())),
    shareReplay(1),
  );

  constructor(
    private notesService: NotesService,
    private modalService: NzModalService,
  ) {
  }

  onRemoveNote(note: Note) {
    this.modalService.warning({
      nzTitle: $localize`Confirm`,
      nzContent: $localize`Do you really want to remove note "${note.title}"?`,
      nzOkText: $localize`OK`,
      nzCancelText: $localize`Cancel`,
      nzNoAnimation: true,
      nzMaskClosable: true,
      nzWidth: 600,
      nzOnOk: () => this.notesService.delete(note.id)
        .pipe(
          tap(() => this.refresh$.next()),
        )
        .toPromise(),
    });
  }
}
