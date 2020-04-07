import React, { Component } from 'react';
import './ColorSelect.css';

var cards;

export class ColorSelect extends Component
{
    blueClick()
    {
       
        
    }

    render()
    {


        return (
            <div id="color-select">
                <div className="pop-up">
                    <button id="blue-button" onClick={(e) => this.blueClick(e)}>Blue</button>
                    <button id="red-button" onClick={(e) => this.blueClick(e)}>Red</button>
                    <button id="yellow-button" onClick={(e) => this.blueClick(e)}>Yellow</button>
                    <button id="green-button" onClick={(e) => this.blueClick(e)}>Green</button>
                </div>
                
            </div>
        );
    }
}