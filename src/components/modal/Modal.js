import React, { Component } from 'react';
import { any, func } from 'prop-types';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modalActions';
import './modal.scss';

class Modal extends Component {

    state = {
        isVisible: false
    };

    static defaultProps = {
        content: ''
    };

    static propTypes = {
        content:   any,
        showModal: func.isRequired
    };

    static mapStateToProps = state => ({
        content: state.modal.content
    });

    componentWillReceiveProps( props ) {

        let isVisible = Boolean( props.content );

        this.setState( { isVisible } )

    }

    closeModal = () => {
        this.props.showModal( '' );
    };

    render() {

        let { content }   = this.props,
            { isVisible } = this.state;

        return (

            <div onClick={e => e.stopPropagation()} className={isVisible ? 'visible modal-outer' : 'modal-outer'}>
                <div className="overlay" onClick={this.closeModal}>

                </div>
                <div className="modal">
                    {content}
                </div>
            </div>
        );
    }

}

export default connect( Modal.mapStateToProps, { showModal } )( Modal );
