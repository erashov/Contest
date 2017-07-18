import React from 'react';
import './App.sass';
import Header from './blocks/Header/Header.jsx';

export default class extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
