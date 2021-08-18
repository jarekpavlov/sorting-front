import React from 'react';

const Option = (props) => {
    return (
        <option {...props}>
            {props.children}
        </option>
    );
};

export default Option;