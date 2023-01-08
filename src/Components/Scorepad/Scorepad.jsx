import React from "react";
import { useState } from 'react';
import './scorepad.css';
import { startData, startTotal } from './data.js';

export default function Scorepad() {

    const [data, setData] = useState(startData);

    const [total, setTotal] = useState(startTotal);

    const [focused, setFocused] = useState(null);

    const handleOnChange = (index, player, value) => {
        if(value ===  '') value = 0;
        value = parseInt(value); 
        if(value > 999) value = 999;
        setData( (prevData) => {
          let newData = [...prevData];
          newData[index][player] = value;
          return newData;
        })
    }

    const handleOnFocus = (target) => {
        if (focused === target) return;
        setFocused(target);
        setTimeout(function () { target.select(); }, 10);
    }
    
    React.useEffect( () => {
        let newTotal = { name: "Total", playerOne: 0, playerTwo: 0, playerThree: 0, playerFour: 0};
        for(let i = 0; i < data.length; i++){
            newTotal["playerOne"] += data[i]["playerOne"];
            newTotal["playerTwo"] += data[i]["playerTwo"];
            newTotal["playerThree"] += data[i]["playerThree"];
            newTotal["playerFour"] += data[i]["playerFour"];
        }
        setTotal(newTotal);
    }, [data])

    return (
        <div className="table-container">
            <table className="scorepad-table">
                <thead>
                    <tr>
                        <th>Five Tribes</th>
                        <th className="small-col">1</th>
                        <th className="small-col">2</th>
                        <th className="small-col">3</th>
                        <th className="small-col">4</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( (elem, index) => {
                        let colorClass;
                        switch(index){
                            case 0: colorClass = "money-row-color"; break;
                            case 1: colorClass = "vizier-row-color"; break;
                            case 2: colorClass = "elder-row-color"; break;
                            case 3: colorClass = "djin-row-color"; break;
                            case 4: colorClass = "palm-row-color"; break;
                            case 5: colorClass = "palace-row-color"; break;
                            case 6: colorClass = "camel-row-color"; break;
                            case 7: colorClass = "resource-row-color"; break;
                            default: colorClass = ""; break;
                        }
                    
                        return (
                            <tr key={"tr-"+index}>
                                <td className={colorClass}>{elem.name}</td>
                                <td className={`input small-col ${colorClass}`}>
                                    <input 
                                    className={`${colorClass}`}
                                    type="number" min="0" max="999" step="1"
                                    defaultValue={elem.playerOne} 
                                    onChange={ e => handleOnChange(index, "playerOne", e.target.value)} 
                                    onFocus={ e => handleOnFocus(e.target)}
                                    />
                                </td>
                                <td className={`input small-col ${colorClass}`}>
                                    <input 
                                    className={`${colorClass}`}
                                    type="number" min="0" max="999" step="1"
                                    defaultValue={elem.playerTwo} 
                                    onChange={ e => handleOnChange(index, "playerTwo", e.target.value)} 
                                    onFocus={ e => handleOnFocus(e.target)}
                                    />
                                </td>
                                <td className={`input small-col ${colorClass}`}>
                                    <input 
                                    className={`${colorClass}`}
                                    type="number" min="0" max="999" step="1"
                                    defaultValue={elem.playerThree} 
                                    onChange={ e => handleOnChange(index, "playerThree", e.target.value)} 
                                    onFocus={ e => handleOnFocus(e.target)}
                                    />
                                </td>
                                <td className={`input small-col ${colorClass}`}>
                                    <input 
                                    className={`${colorClass}`}
                                    type="number" min="0" max="999" step="1"
                                    defaultValue={elem.playerFour} 
                                    onChange={ e => handleOnChange(index, "playerFour", e.target.value)} 
                                    onFocus={ e => handleOnFocus(e.target)}
                                    />
                                </td>
                            </tr>
                        ) 
                    })}
                    <tr>
                        <td>{total.name}</td>
                        <td className="total small-col">{total.playerOne}</td>
                        <td className="total small-col">{total.playerTwo}</td>
                        <td className="total small-col">{total.playerThree}</td>
                        <td className="total small-col">{total.playerFour}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}