import { Action, createReducer, on } from '@ngrx/store';

import * as languageActions from '../actions/language.actions';
import { STORED_LANGUAGE } from '../../../consts';

const languageReducer = createReducer(
  STORED_LANGUAGE,
  on(languageActions.setCurrentLanguage, (state, { language }) => language),
);

export function reducer(state: string | undefined, action: Action) {
  return languageReducer(state, action);
}
