import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, number } from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import EditIcon from '@material-ui/icons/Edit';
import { clickWord } from '../../actions/wordButtonsActions';
import { showModal } from '../../actions/modalActions';
import { editTableRow } from '../../actions/tableActions';
import Iframe from '../iframe/Iframe';
import './scss/word-buttons.scss';
import ReversoImage from './images/reverso-context.png';
import GoogleTranslateIcon from '@material-ui/icons/Translate';
import DeepL from './images/deepl.png';

class WordButtons extends Component {

    state = {
        clickedWords: [],
        urls:         {}
    };

    static propTypes = {
        word:         string.isRequired,
        wordLang:     string.isRequired,
        editedIndex:  number.isRequired,
        editTableRow: func.isRequired,
        showModal:    func.isRequired,
    };

    constructor( props ) {

        super( props );

        let { wordLang } = props;

        if ( wordLang === 'english' ) {
            this.state.urls = {
                reversoContext:  'http://context.reverso.net/t%C5%82umaczenie/angielski-polski',
                googleTranslate: 'https://translate.google.pl/#en/pl',
                deepL:           'https://www.deepl.com/translator#en/pl'
            }
        } else if ( wordLang === 'polish' ) {

            this.state.urls = {
                reversoContext:  'http://context.reverso.net/t%C5%82umaczenie/polski-angielski',
                googleTranslate: 'https://translate.google.pl/#pl/en',
                deepL:           'https://www.deepl.com/translator#pl/en'
            }

        }

    }

    getSearchedWords() {

        let { clickedWords } = this.state,
            word             = this.props.word.split( ' ' );

        if ( !clickedWords.length ) {
            return word;
        }

        const Result = [];

        const getMatchingWords = ( item, index ) => {

            if ( clickedWords.indexOf( index ) > -1 ) {
                Result.push( item );
            }

        };

        word.forEach( getMatchingWords );

        return Result;

    }

    /**
     * @return String
     * */
    getReversoContextUrl() {

        let words         = this.getSearchedWords(),
            searchedWords = words.join( '+' ),
            url           = `${this.state.urls.reversoContext}/${searchedWords}`;

        return url;

    }

    getGoogleTranslateUrl() {

        let words         = this.getSearchedWords(),
            searchedWords = encodeURIComponent( words.join( ' ' ) ),
            url           = `${this.state.urls.googleTranslate}/${searchedWords}`;

        return url;

    }

    getDeepLUrl() {

        let words         = this.getSearchedWords(),
            searchedWords = encodeURIComponent( words.join( ' ' ) ),
            url           = `${this.state.urls.deepL}/${searchedWords}`;

        return url;

    }

    openInReversoContext = () => {
        let url = this.getReversoContextUrl();

        this.props.showModal( <Iframe src={url}/> )
    };

    openInGoogleTranslate = () => {
        let url = this.getGoogleTranslateUrl();

        window.open( url, '_blank' );
    };

    openInDeepL = () => {
        let url = this.getDeepLUrl();

        this.props.showModal( <Iframe src={url}/> )
    };

    selectWord = e => {

        let { index } = e.currentTarget.dataset;
        index = parseInt( index );

        let { clickedWords } = this.state;

        let indexOf = clickedWords.indexOf( index );

        if ( indexOf > -1 ) {
            clickedWords.splice( indexOf, 1 );
        } else {
            clickedWords.push( index );
        }

        return this.setState( { clickedWords } );

    };

    toggleLang = () => {

        let { editedIndex } = this.props;

        this.props.editTableRow( {
            editedLang: this.props.wordLang,
            editedIndex
        } )

    };

    render() {

        let splitted = this.props.word.split( ' ' );

        let { clickedWords } = this.state;

        const renderButtons = ( item, index ) => (
            <Button
                variant={clickedWords.indexOf( index ) > -1 ? 'raised' : 'flat'}
                color='primary'
                className={'edit text-button ' + clickedWords.indexOf( index ) > -1 ? 'active' : ''}
                key={index}
                data-word={item}
                data-index={index}
                onClick={this.selectWord}>
                {item}
            </Button>
        );

        return (
            <div className="word-buttons">
                <div className="words">
                    {splitted.map( renderButtons )}
                </div>

                <div className="word-actions">
                    <Button
                        title="Edit word"
                        className="has-icon edit-word"
                        onClick={this.toggleLang}
                        variant="raised">
                        <EditIcon/>
                    </Button>

                    <Button
                        title="Open in reverso translate"
                        className="has-icon"
                        onClick={this.openInReversoContext}
                        variant="raised">
                        <img className="icon-image" src={ReversoImage} alt="Reverso Context"/>
                    </Button>

                    <Button onClick={this.openInGoogleTranslate} title="Open in Google Translate" className="has-icon" variant="raised">
                        <GoogleTranslateIcon/>
                    </Button>

                    <Button onClick={this.openInDeepL} title="Open in DeepL" className="has-icon" variant="raised">
                        <img className="icon-image" src={DeepL} alt="DeepL"/>
                    </Button>
                </div>
            </div>
        );
    }

}

export default connect( null, { editTableRow, showModal } )( WordButtons );
