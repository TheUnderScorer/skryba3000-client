import React, { Component } from 'react';
import { string, func, oneOfType, bool } from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormSection from '../form/FormSection';
import './scss/prompt.scss';

class Prompt extends Component {

    static propTypes = {
        message:      string,
        defaultValue: string,
        callback:     oneOfType( [ func, bool ] )
    };

    static defaultProps = {
        message:      'Provide value: ',
        defaultValue: '',
        callback:     false,
    };

    state = {
        isVisible: false,
        value:     ''
    };

    constructor( props ) {
        super( props );

        setTimeout( () => document.addEventListener( 'keyup', this.handleKeypress ), 100 );
    }


    static mapStateToProps = state => ({
        ...state.prompt
    });

    componentWillReceiveProps( props ) {

        if ( typeof props.callback !== 'function' ) {

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

        let { callback } = this.props;

        let value = this.state.value ? this.state.value : this.props.defaultValue;

        if ( typeof callback === 'function' ) {
            callback( value );
        }

        this.setState( {
            isVisible: false,
        } )

    };

    handleDeny = () => {

        this.setState( {
            isVisible: false,
        } )

    };

    handleChange = e => {
        this.setState( {
            value: e.target.value
        } )
    };

    handleKeyPress = e => {

        if ( e.which === 13 ) {
            this.handleConfirmation();
        }

    };

    render() {

        let { message, defaultValue } = this.props,
            { isVisible, value }      = this.state;

        value = value ? value : defaultValue;

        return (
            <div className={isVisible ? 'popup-container visible' : 'popup-container'}>

                <div className="prompt">
                    <div className="message">
                        {message}
                    </div>

                    <FormSection>
                        <Input
                            value={value}
                            onKeyUp={this.handleKeyPress}
                            onChange={this.handleChange}
                        />
                    </FormSection>

                    <div className="actions">

                        <Button
                            onClick={this.handleConfirmation}
                            className="confirmation"
                            variant="raised"
                            type="button"
                            color="primary">
                            Continue
                        </Button>

                        <Button
                            onClick={this.handleDeny}
                            className="confirmation"
                            variant="raised"
                            type="button"
                            color="secondary">
                            Cancel
                        </Button>
                    </div>
                </div>

                <div className="popup-overlay" onClick={this.handleDeny}/>

            </div>
        );

    }

}

export default connect( Prompt.mapStateToProps )( Prompt );
