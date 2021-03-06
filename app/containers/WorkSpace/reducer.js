/*
 *
 * WorkSpace reducer
 *
 */

import { fromJS } from 'immutable';
import {
  COPY_CATEGORIES,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  QUESTION_ANSWERED,
  UPDATE_REMAINING_QUESTIONS,
} from './constants';

export const initialState = fromJS({
  remainingQuestions: 0,
  selectedCategories: {
    HTML: [],
    CSS: [],
    JS: [],
  },
  selectedCategoryList: [],
  categories: {
    HTML: [],
    CSS: [],
    JS: [],
  },
  categoryList: [],
  answeredQuestions: {
    HTML: [],
    CSS: [],
    JS: [],
  },
});

function workSpaceReducer(state = initialState, action) {
  switch (action.type) {
    case COPY_CATEGORIES:
      return state
        .set('categories', action.categories)
        .set('categoryList', action.categoryList);
    case ADD_CATEGORY:
      return state
        .setIn(
          ['selectedCategoryList', state.get('selectedCategoryList').size],
          action.categoryName,
        )
        .setIn(
          ['selectedCategories', action.categoryName],
          fromJS(action.category),
        );
    case REMOVE_CATEGORY:
      return state
        .updateIn(['selectedCategories', action.categoryName], () => [])
        .deleteIn([
          'selectedCategoryList',
          state
            .get('selectedCategoryList')
            .toJS()
            .findIndex(categoryName => categoryName === action.categoryName),
        ]);
    case QUESTION_ANSWERED:
      return state
        .setIn(
          [
            'answeredQuestions',
            action.categoryName,
            state.getIn(['answeredQuestions', action.categoryName]).size,
          ],
          fromJS(action.question),
        )
        .deleteIn([
          'selectedCategories',
          action.categoryName,
          action.questionIndex,
        ]);
    case UPDATE_REMAINING_QUESTIONS:
      return state.set('remainingQuestions', action.value);
    default:
      return state;
  }
}

export default workSpaceReducer;
