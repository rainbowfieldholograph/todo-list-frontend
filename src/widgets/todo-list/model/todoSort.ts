import { atom } from '@reatom/framework';
import type { SortType } from '../config';

export const todoSortAtom = atom<SortType>('Default');
