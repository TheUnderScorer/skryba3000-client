import { SHOW_MODAL } from './types';

export const showModal = content => dispatch => {

    dispatch( {
        type: SHOW_MODAL,
        content
    } )

};
