import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { NotesService } from '../services/notes.service';
import { Note } from '../../types/note';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoteDetailResolver implements Resolve<Note> {
  constructor(private notesService: NotesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note> {
    const noteId = Number(route.paramMap.get('id'));
    if (!noteId) {
      return throwError('Invalid note identifier');
    }
    return this.notesService.get(noteId);
  }
}
