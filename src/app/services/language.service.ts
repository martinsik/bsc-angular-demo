import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../ngrx/state';
import * as languageActions from '../ngrx/actions/language.actions';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private store: Store<AppState>
  ) {
  }

  dispatchSetLanguage(language: string) {
    this.store.dispatch(languageActions.setCurrentLanguage({ language }));
  }
}
