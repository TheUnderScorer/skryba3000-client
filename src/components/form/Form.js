import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWord } from '../../actions/wordActions';
import { func } from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormSection from './FormSection';
import Input from '@material-ui/core/Input/Input';
import { confirmation } from '../../actions/confirmationPopupActions';
import './scss/form.scss';

class Form extends Component {

    static propTypes = {
        addWord:      func.isRequired,
        confirmation: func.isRequired
    };

    state = {
        submitDisabled: true,
        isSubmit:       false,
        lang:           'english',
        pronounciation: false,
        multiple:       false,
        word:           '',
    };

    handleSubmit = e => {

        e.preventDefault();

        let { lang, word } = this.state;

        const Words    = word.split( ' ' ),
              LastWord = Words[ Words.length - 1 ];

        const callback = () => {

            this.props.addWord( {
                ...this.state,
                polish:  lang === 'polish' ? word : '',
                english: lang === 'english' ? word : ''
            } );

            this.setState( {
                submitDisabled: true,
                pronounciation: false,
                multiple:       false,
                word:           ''
            } )

        };

        if ( /[A-Z]/.test( Words[ 0 ] ) && !/[\^$.|?*+!]/.test( LastWord ) ) {
            this.props.confirmation( {
                onConfirm: callback,
                message:   'Are you sure it\'s not a sentence?'
            } )
        } else {
            callback();
        }

    };

    handleInput = input => {

    };

    handleDropdownChange = e => {
        this.setState( {
            [ e.target.name ]: e.target.selectedOptions[ 0 ].value
        } )
    };

    handleTyping = e => {

        let { value }      = e.target,
            submitDisabled = value === '';

        this.setState( {
            word: value,
            submitDisabled
        } )

    };

    handleCheckboxChange = e => {

        let { name } = e.target;

        console.log( name );

        this.setState( prevState => (
            {
                [ name ]: !prevState[ name ]
            }
        ) )
    };

    render() {

        let { submitDisabled, pronounciation, multiple, word } = this.state;

        return (
            <div className="translate-form">

                <form action="#" onSubmit={this.handleSubmit}>
                    <FormSection className="main">
                        <Input
                            autoComplete="off"
                            placeholder="Enter word or sentence"
                            ref={this.handleInput}
                            className="md-text"
                            type="text"
                            name="word"
                            id="word"
                            value={word}
                            onChange={this.handleTyping}/>

                        <select onChange={this.handleDropdownChange} name="lang" id="lang" className="language-selection">
                            <option value="english">English</option>
                            <option value="polish">Polish</option>
                        </select>

                        <Button disabled={submitDisabled} variant="raised" type="submit" color="primary">
                            +
                        </Button>
                    </FormSection>

                    <FormSection className="checkboxes">

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pronounciation}
                                    onClick={this.handleCheckboxChange}
                                    name="pronounciation"
                                    id="pronounciation"
                                    value="1"/>}
                            label="Pronounciation?"/>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={multiple}
                                    onClick={this.handleCheckboxChange}
                                    name="multiple"
                                    id="multiple"
                                    value="1"/>}
                            label="Multiple translations?"/>

                    </FormSection>

                </form>

            </div>
        );
    }

}

export default connect( null, { addWord, confirmation } )( Form );
