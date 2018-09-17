import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from './store';
import './App.scss';
import Form from './components/form/Form';
import Table from './components/table/Table';
import ConfirmationPopup from './components/confirmation-popup/ConfirmationPopup';
import Modal from './components/modal/Modal';
import Prompt from './components/prompt/Prompt';

class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <div className="App">
                    <Form/>
                    <Table/>
                    <ConfirmationPopup/>
                    <Prompt/>
                    <Modal/>
                </div>
            </Provider>
        );
    }
}

export default App;
