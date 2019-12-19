import React, { Component } from 'react';

export default class CommonLoading extends Component {
    render() {
        return (
            <div className="spinner-box">
                <div className="circle-border">
                    <div className="circle-core"></div>
                </div>
            </div>
        );
    }
}
