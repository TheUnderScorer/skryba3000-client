import { SHOW_MODAL } from '../actions/types';

const InitialState = {
    content: ''
};

export default function( state = InitialState, action ) {

    switch ( action.type ) {

        case SHOW_MODAL:

            let { content } = action;

            return {
                ...state,
                content
            };

        default:

            return state;

    }

}
