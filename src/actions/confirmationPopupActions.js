import { SHOW_CONFIRMATION_POPUP } from './types';

export const confirmation = ( {
                                  message = 'Are you sure?',
                                  confirm = 'Yes',
                                  deny = 'No',
                                  onConfirm = false,
                                  onDeny = false,
                              } ) => dispatch => {

    dispatch( {
        type: SHOW_CONFIRMATION_POPUP,
        message,
        confirm,
        deny,
        onConfirm,
        onDeny,
    } )

};
