import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number, oneOfType, object, func } from 'prop-types';
import { editWord } from '../../actions/wordActions';
import { editTableRow } from '../../actions/tableActions';
import { setWordInputValue } from '../../actions/wordManagerActions';
import FormSection from '../form/FormSection';
import Input from '@material-ui/core/Input/Input';
import WordButtons from '../word-buttons/WordButtons';
import Suggestions from '../suggestions/Suggestions';
import './scss/word-manager.scss';

class WordManager extends Component {

    static propTypes = {
        editedIndex:       number,
        editedLang:        string,
        word:              oneOfType( [ string, object ] ),
        wordLang:          string.isRequired,
        editWord:          func.isRequired,
        editTableRow:      func.isRequired,
        newInputValue:     string,
        setWordInputValue: func.isRequired
    };

    static mapStateToProps = state => ({
        ...state.table,
        ...state.wordManager
    });

    handleInputChange = e => {

        let { value }                   = e.target,
            { editedLang, editedIndex } = this.props;

        this.props.editWord( editedIndex, {
            [ editedLang ]: value
        } );

    };

    componentDidMount() {
        document.addEventListener( 'keyup', this.handleKeyPress );
    }

    componentWillUnmount() {
        document.removeEventListener( 'keyup', this.handleKeyPress );
    }

    handleKeyPress = e => {

        let { editedIndex, editTableRow, editedLang } = this.props;

        switch ( e.which ) {

            //Arrow down
            case 40:

                editedIndex++;

                /*   if ( editedIndex >= api.getWords().length ) {
                       return;
                   }*/

                editTableRow( {
                    editedIndex,
                    editedLang,
                } );

                break;

            //Arrow up
            case 38:

                if ( editedIndex === 0 ) {
                    return;
                }

                editedIndex--;

                editTableRow( {
                    editedIndex,
                    editedLang,
                } );

                break;

            //Enter or escape
            case 13:
            case 27:

                editTableRow( {} );

                break;

        }

    };

    handleInput = input => {

        if ( input && this.props.newInputValue ) {

            input.value = this.props.newInputValue;

            this.props.setWordInputValue( '' );

        }

    };

    render() {

        let { word, wordLang, editedLang, editedIndex } = this.props;

        if ( typeof word === 'object' ) {
            word = '';
        }

        if ( editedLang === wordLang ) {
            return (
                <FormSection className="word-input-container">
                    <Input
                        autoComplete="off"
                        className="md-text"
                        type="text"
                        name="edit_word"
                        id="edit_word"
                        ref={this.handleInput}
                        value={word}
                        onChange={this.handleInputChange}/>

                    <Suggestions/>
                </FormSection>
            )
        }

        return (
            <WordButtons word={word} wordLang={wordLang} editedIndex={editedIndex}/>
        )

    }

}

export default connect( WordManager.mapStateToProps, { editWord, editTableRow, setWordInputValue } )( WordManager );
