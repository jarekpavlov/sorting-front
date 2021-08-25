import React from 'react';

const Select = ({optionAttributes, setListName}) => {
    return (
        <select id="select" onChange={e => setListName(e.target.value)}>
            {optionAttributes.map((item, index) =>
                <option key={index} value={item.value}>{item.text}</option>
            )}
        </select>
    );
};

export default Select;