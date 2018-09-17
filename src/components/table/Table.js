import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, number, string, oneOfType, bool } from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { confirmation } from '../../actions/confirmationPopupActions';
import { removeWord } from '../../actions/wordActions';
import { editTableRow } from '../../actions/tableActions';
import WordManager from '../word-manager/WordManager';
import './scss/table.scss';
import Buttons from './Buttons';
import Loader from '../loader/loader';

class Table extends Component {

    static propTypes = {
        words:        array.isRequired,
        confirmation: func.isRequired,
        removeWord:   func.isRequired,
        editTableRow: func.isRequired,
        editedIndex:  oneOfType( [ number, bool ] ),
        editedLang:   string,
    };

    static mapStateToProps = state => ({
        words: state.words,
        ...state.table
    });

    componentDidMount() {
        document.addEventListener( 'click', this.disableEdition );
    }

    componentWillUnmount() {
        document.removeEventListener( 'click', this.disableEdition );
    }

    deleteRow = e => {

        const Index = parseInt( e.currentTarget.dataset.index );

        this.props.confirmation( {
            onConfirm: () => this.props.removeWord( Index ),
            message:   'Are you sure you want to remove this row?'
        } )

    };

    enableRowEdition = e => {

        let { lang, index } = e.currentTarget.dataset;

        this.props.editTableRow( {
            editedLang:  lang,
            editedIndex: parseInt( index )
        } )

    };

    disableEdition = ( e ) => {

        if ( (e.target.classList.contains( 'edit' ) ||
            e.target.classList.contains( 'words' ) ||
            e.target.classList.contains( 'overlay' ) ||
            e.target.id === 'edit_word' ||
            e.target.tagName === 'svg' ||
            e.target.tagName === 'path' ||
            e.target.tagName === 'EM' ||
            e.target.tagName === 'IMG' ||
            e.target.tagName === 'SPAN' ||
            e.target.tagName === 'BUTTON' ||
            e.target.tagName === 'LI' ||
            e.target.tagName === 'UL' ||
            e.target.classList.contains( 'MuiButtonBase-root-23' )) ) {
            return;
        }

        this.props.editTableRow( {
            editedIndex: false
        } )

    };

    getRows() {

        const Rows = [];

        let index           = 0,
            { editedIndex } = this.props;

        for ( let { pronounciation, multiple, english, polish } of this.props.words ) {

            let additional = '';

            if ( pronounciation ) {
                additional += ' (wymowa)';
            }

            if ( multiple ) {
                additional += '[2]'
            }

            Rows.push(
                <tr key={index}>
                    <td>
                        {editedIndex === index ?
                            <WordManager word={polish} wordLang="polish"/>
                            :
                            <span onClick={this.enableRowEdition} data-lang="polish" className="polish" data-index={index}>
                                {polish ? `${polish} ${additional}` : <em>Click to edit</em>}
                        </span>}
                    </td>
                    <td>
                        {editedIndex === index ?
                            <WordManager word={english} wordLang="english"/>
                            :
                            <span onClick={this.enableRowEdition} data-lang="english" className="english" data-index={index}>
                             {english ? english : <em>Click to edit</em>}
                        </span>
                        }
                    </td>
                    <td>
                        <Button
                            data-index={index}
                            onClick={this.deleteRow}
                            className="has-icon delete-icon"
                            variant="contained"
                            color="secondary">
                            <DeleteIcon/>
                        </Button>
                    </td>
                </tr>
            );

            index++;

        }

        return Rows;

    }

    render() {

        return (

            <div className="table-container">
                <Buttons/>
                <Loader visible={this.props.isVisible}/>
                <table className="words-table">
                    <thead>
                    <tr>
                        <td>
                            Polish
                        </td>
                        <td>
                            English
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getRows()}
                    </tbody>
                </table>

            </div>

        );
    }

}

export default connect( Table.mapStateToProps, { confirmation, removeWord, editTableRow } )( Table );
