import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Note } from '../../types/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {
  }

  listNotes() {
    return this.http.get<Note[]>('notes');
  }

  delete(id: number) {
    return this.http.delete<any>(`notes/${id.toString()}`);
  }

  get(id: number) {
    return this.http.get<Note>(`notes/${id.toString()}`);
  }

  put(note: Note) {
    const data = {...note};
    delete data.id;
    return this.http.put<Note>(`notes/${note.id.toString()}`, data);
  }

  post(note: Note) {
    return this.http.post<Note>('notes', note);
  }
}
