import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './scss/form-section.scss';

class FormSection extends Component {

    static defaultProps = {
        className: '',
    };

    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        let props = this.props;
        return (
            <div className={'form-section ' + props.className}>
                {props.children}
            </div>
        );
    }

}

export default FormSection;
