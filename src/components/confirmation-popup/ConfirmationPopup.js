import React, { Component } from 'react';
import { bool, string, func, oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import './scss/confirmation-popup.scss';

class ConfirmationPopup extends Component {

    static propTypes = {
        message:   string,
        confirm:   string,
        deny:      string,
        onConfirm: oneOfType( [ func, bool ] ),
        onDeny:    oneOfType( [ func, bool ] ),
    };

    state = {
        isVisible: false
    };

    constructor( props ) {
        super( props );

        setTimeout( () => document.addEventListener( 'keyup', this.handleKeypress ), 100 );
    }


    static mapStateToProps = state => ({
        ...state.confirmationPopup
    });

    componentWillReceiveProps( props ) {

        if ( typeof props.onConfirm !== 'function' ) {

            this.setState( {
                isVisible: false,
            } );

            return;

        }

        this.setState( {
            isVisible: true
        } );

    }

    handleKeypress = e => {

        if ( !this.state.isVisible ) {
            return;
        }

        switch ( e.which ) {

            case 13:
                //this.handleConfirmation();
                break;

            case 27:
                this.handleDeny();
                break;

        }

    };
    handleConfirmation = () => {

        let { onConfirm } = this.props;

        if ( typeof onConfirm === 'function' ) {
            onConfirm();
        }

        this.setState( {
            isVisible: false,
        } )

    };

    handleDeny = () => {

        let { onDeny } = this.props;

        if ( typeof onDeny === 'function' ) {
            onDeny();
        }

        this.setState( {
            isVisible: false,
        } )

    };

    render() {

        let { message, confirm, deny } = this.props,
            { isVisible }              = this.state;

        return (
            <div className={isVisible ? 'popup-container visible' : 'popup-container'}>

                <div className="confirmation-popup">
                    <div className="message">
                        {message}
                    </div>

                    <div className="actions">

                        <Button
                            onClick={this.handleConfirmation}
                            className="confirmation"
                            variant="raised"
                            type="button"
                            color="primary">
                            {confirm}
                        </Button>

                        <Button
                            onClick={this.handleDeny}
                            className="confirmation"
                            variant="raised"
                            type="button"
                            color="secondary">
                            {deny}
                        </Button>
                    </div>
                </div>

                <div className="popup-overlay" onClick={this.handleDeny}/>

            </div>
        );

    }

}

export default connect( ConfirmationPopup.mapStateToProps )( ConfirmationPopup );
