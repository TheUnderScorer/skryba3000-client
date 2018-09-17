import { combineReducers } from 'redux';
import wordReducer from './wordReducer';
import confirmationPopupReducer from './confirmationPopupReducer';
import tableReducer from './tableReducer';
import wordButtonsReducer from './wordButtonsReducer';
import modalReducer from './modalReducer';
import promptReducer from './promptReducer';

export default combineReducers( {
    words:             wordReducer,
    confirmationPopup: confirmationPopupReducer,
    table:             tableReducer,
    wordButtons:       wordButtonsReducer,
    modal:             modalReducer,
    prompt:            promptReducer,
    wordManager:       wordButtonsReducer
} )
