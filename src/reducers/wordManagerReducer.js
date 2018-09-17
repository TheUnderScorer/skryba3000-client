import { SET_WORD_INPUT_VALUE } from '../actions/types';

const InitialState = {
    newInputValue:     '',
    currentInputValue: ''
};

export default function( state = InitialState, action ) {

    switch ( action.type ) {

        case SET_WORD_INPUT_VALUE:

            let newInputValue = action.value;

            return {
                ...state,
                newInputValue
            };

        default:

            return state;

    }

}
