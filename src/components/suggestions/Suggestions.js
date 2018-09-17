import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setWordInputValue } from '../../actions/wordManagerActions';
import { editWord } from '../../actions/wordActions';
import { func, string, number, object } from 'prop-types';
import Client from '../../api/Skryba/Client';
import './scss/suggestions.scss';

class Suggestions extends Component {

    static propTypes = {
        setWordInputValue: func.isRequired,
        editWord:          func.isRequired,
        word:              object.isRequired,
        editedLang:        string.isRequired,
        editedIndex:       number.isRequired,
    };

    state = {
        suggestions: []
    };

    static mapStateToProps = state => {

        let { editedIndex, editedLang } = state.table,
            word                        = state.words[ editedIndex ];

        return {
            word,
            editedLang,
            editedIndex
        }


    };

    setWordValue = e => {

        let { word }                    = e.currentTarget.dataset,
            { editedLang, editedIndex } = this.props;

        this.props.editWord( editedIndex, {
            [ editedLang ]: word
        } )

    };

    componentWillMount() {

        const Lang = this.props.editedLang === 'english' ? 'polish' : 'english';

        Client.get( '/get-translations', {
            word:     this.props.word[ Lang ],
            language: Lang,
        } ).then( data => {

            if ( data.result && data.result.length ) {
                this.setState( {
                    suggestions: data.result
                } )
            }

        } )

    }

    render() {

        let { editedLang, word } = this.props;
        let { suggestions } = this.state;

        word = word[ editedLang ];

        //let targetLang = editedLang === 'english' ? 'polish' : 'english';

        const callback = ( item, index ) => (
            <li onClick={this.setWordValue} data-word={item[ editedLang ]} key={index}>
                {item[ editedLang ]}
            </li>
        );

        return (
            <ul className="suggestions">
                {!word && suggestions.length > 0 && suggestions.map( callback )}
            </ul>
        );
    }

}

export default connect( Suggestions.mapStateToProps, { setWordInputValue, editWord } )( Suggestions );
