import React from 'react';
import { Route } from 'react-router-dom';

const Button = ({ url, label, cssClass }) => (
    <Route render={({ history }) => (
        <button
            onClick={() => history.push(url)}
            className={cssClass || 'btn btn-primary'}>{label}</button>
    )} />
);

export default Button;