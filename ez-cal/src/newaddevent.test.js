import React from 'react';
import ReactDOM from 'react-dom';
import Addevents from './newaddevents'

it('successful render', () => {
    const div = document.createElement('div');
    const {getByText, getByTestId, container} = render(<Addevents />, div);
    const elem = getByTestId('save-holder');
    ReactDOM.unmountComponentAtNode(div);
})

it('button clickable', () => {
    const div = document.createElement('div');
    const {getByText, getByTestId, container} = render(<Addevents />, div);
    const elem = getByTestId('save-button');
})