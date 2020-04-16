import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pluck } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-detail-page',
  templateUrl: './note-detail-page.component.html',
  styleUrls: ['./note-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailPageComponent {

  note$ = this.route.data
    .pipe(
      pluck('fetched'),
    );

  constructor(
    private route: ActivatedRoute,
  ) {
  }

}
