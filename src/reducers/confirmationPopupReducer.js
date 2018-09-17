import { SHOW_CONFIRMATION_POPUP } from '../actions/types';

const InitialState = {
    message:   'Are you sure?',
    confirm:   'Yes',
    deny:      'No',
    onConfirm: false,
    onDeny:    false,
};

export default function( state = InitialState, action ) {

    switch ( action.type ) {

        case SHOW_CONFIRMATION_POPUP:

            return {
                ...state,
                ...action
            };

        default:
            return state;

    }

}
