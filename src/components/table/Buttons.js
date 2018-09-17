import React, { Component } from 'react';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
import { confirmation } from '../../actions/confirmationPopupActions';
import { clearWords } from '../../actions/wordActions';
import { addWord } from '../../actions/wordActions';
import { showPrompt } from '../../actions/promptActions';
import { toggleLoader } from '../../actions/tableActions';
import FormSection from '../form/FormSection';
import Button from '@material-ui/core/Button/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DownloadIcon from '@material-ui/icons/FileDownload';
import ImportIcon from '@material-ui/icons/FileUpload';
import SaveIcon from '@material-ui/icons/Save';
import download from 'downloadjs';
import Client from '../../api/Skryba/Client';

class Buttons extends Component {

    state = {
        triggerUpload: false
    };

    static propTypes = {
        confirmation: func.isRequired,
        clearWords:   func.isRequired,
        addWord:      func.isRequired,
        showPrompt:   func.isRequired,
        toggleLoader: func.isRequired,
        words:        array.isRequired
    };

    static mapStateToProps = state => ({
        words: state.words
    });

    clearTable = () => {

        let { confirmation, clearWords } = this.props;

        confirmation( {
            message:   'Are you sure you want to clear table?',
            onConfirm: () => clearWords()
        } )

    };

    handleImport = e => {

        let { files } = e.target;

        let { addWord } = this.props;

        const addWords = text => {

            const Words = text.split( '\n' );

            for ( let word of Words ) {

                if ( !word ) {
                    continue;
                }

                let [ polish, english ] = word.split( '/' ),
                    multiple            = polish.indexOf( '[2]' ) > -1,
                    pronounciation      = polish.indexOf( '(wymowa)' ) > -1;

                polish = polish.replace( '(wymowa)', '' ).replace( '[2]', '' ).trim();
                english = english.trim();

                addWord( { english, polish, multiple, pronounciation } )

            }

        };

        if ( files && files.length ) {

            for ( let file of e.target.files ) {

                const Reader = new FileReader();

                Reader.onload = e => addWords( e.target.result );
                Reader.readAsText( file, 'utf-8' );


            }

        }

        e.target.value = '';

    };

    getWordsForDownload( sort = true ) {

        let result = '';

        let { words } = this.props;

        if ( sort ) {

            const Sentences = [],
                  Words     = [];

            const getWords = item => {

                let last = item.english.substring( item.english.length - 1 );

                if ( /[\^$.|?*+!]/.test( last ) ) {
                    Sentences.push( item );
                } else {
                    Words.push( item );
                }
            };

            words.forEach( getWords );

            words = [ ...Sentences, ...Words ];

        }

        for ( let line of words ) {

            const format = word => word.replace( / +(?= )/g, '' ).trim();

            let { english, polish, multiple, pronounciation } = line;

            english = format( english );
            polish = format( polish );

            result += polish;

            if ( pronounciation ) {
                result += ' (wymowa)'
            }

            if ( multiple ) {
                result += ' [2]'
            }

            result += `/${english}`;
            result += '\n';

        }

        return result;

    }

    handleDownload = () => {

        const callback = name => {

            if ( !name ) {
                return;
            }

            const FileBlob = new Blob( [ '\uFEFF' + this.getWordsForDownload() ] );

            download( FileBlob, `${name}.txt` );

        };

        this.props.showPrompt( {
            message:      'Enter file name: ',
            defaultValue: 'file',
            callback
        } )

    };

    triggerUpload = e => {

        const Input = e.target.querySelector( '#import' );

        if ( Input ) {
            Input.click();
        }

    };

    handleSave = () => {

        let { words } = this.props;

        let { toggleLoader } = this.props;

        toggleLoader( true );

        Client.post( '/insert-words', { words } ).then( response => {

            toggleLoader( false );

            if ( response.result ) {
                window.alert( `Imported ${response.result} words into database` )
            } else if ( response.message ) {
                window.alert( response.message );
            } else {
                window.alert( 'No words imported.' )
            }

        } );

    };

    render() {

        return (
            <FormSection className="buttons">
                <Button
                    onClick={this.handleDownload}
                    className="has-icon"
                    variant="raised"
                    type="button"
                    color="primary">
                    <DownloadIcon/>
                    <span>Download as .txt</span>
                </Button>

                <Button
                    onClick={this.triggerUpload}
                    className="has-icon"
                    variant="raised"
                    type="button"
                    color="primary">
                    <ImportIcon/>
                    Import from .txt file
                    <input
                        multiple={true}
                        accept=".txt"
                        style={{ display: 'none' }}
                        type="file"
                        name="import"
                        id="import"
                        onChange={this.handleImport}/>

                </Button>

                <Button
                    className="has-icon"
                    variant="raised"
                    type="button"
                    color="primary"
                    onClick={this.handleSave}>
                    <SaveIcon/>
                    Save into database
                </Button>

                <Button
                    onClick={this.clearTable}
                    className="has-icon"
                    variant="contained"
                    color="secondary">
                    <ClearIcon/>
                    <span>Clear table</span>
                </Button>
            </FormSection>
        );
    }

}

export default connect( Buttons.mapStateToProps, {
    confirmation,
    clearWords,
    addWord,
    showPrompt,
    toggleLoader
} )( Buttons );
