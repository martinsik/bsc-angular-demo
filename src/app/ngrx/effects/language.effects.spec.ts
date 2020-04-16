import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import * as languageActions from '../../ngrx/actions/language.actions';
import { LanguageEffects } from './language.effects';

describe('LanguageEffects', () => {
  let store: MockStore;
  let effect: LanguageEffects;
  let actions$: any;
  let location: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: { language: 'en' } }),
        provideMockActions(() => actions$),
      ],
    });

    const mockDocument = {
      defaultView: {
        location: {
          reload: () => void 0,
        },
      },
    };
    location = mockDocument.defaultView.location;
    spyOn(location, 'reload');
    store = TestBed.inject(MockStore);
    effect = new LanguageEffects(TestBed.inject(Actions), mockDocument as any);
  });

  it('should trigger page reload', () => {
    const action = languageActions.setCurrentLanguage({ language: 'en' });
    actions$ = cold('a', {
      a: action,
    });

    expect(effect.changeLanguage$).toBeObservable(cold('a', {
      a: action,
    }));
    expect(location.reload).toHaveBeenCalled();
  });
});
