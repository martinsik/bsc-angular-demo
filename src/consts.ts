export const CURRENT_LANGUAGE_KEY = 'language';
export const DEFAULT_LANGUAGE = 'en';

export const STORED_LANGUAGE = localStorage.getItem(CURRENT_LANGUAGE_KEY) || DEFAULT_LANGUAGE;
