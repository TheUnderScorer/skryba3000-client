import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/loader';
import './iframe.scss';

/**
 * @author Przemysław Żydek
 * */
class Iframe extends Component {

    static defaultProps = {
        src: ''
    };

    static propTypes = {
        src: PropTypes.string
    };

    constructor( props ) {
        super( props );

        this.state = {
            isLoading: true
        }

    }

    iframeLoaded() {
        this.setState( {
            isLoading: false
        } )
    }


    render() {
        return (
            <div className="iframe-container">
                <Loader visible={this.state.isLoading}/>
                <iframe title="Translation iframe" onLoad={() => this.iframeLoaded()} src={this.props.src}/>
            </div>
        );
    }

}

export default Iframe;
