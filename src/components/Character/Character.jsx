import React from 'react';
import './Character.scss';

const mapSkinColorToBackgroundColor = (bgColor) => {
    const colorMap = {
        fair: 'pink',
        light: 'lightgray',
    };

    return colorMap[bgColor] || bgColor;
};

const Character = ({ name, bgColor }) => {
    const skinColorArray = bgColor.split(',').map(color => color.trim());
    const backgroundColors = skinColorArray.map(mapSkinColorToBackgroundColor);
    const bgColorValue = backgroundColors.length > 0 ? backgroundColors[0] : '#ffffff';
    const style = {
        backgroundColor: bgColorValue,
    };

    return (
        <div className='character__container' style={style}>
            <h2>{name}</h2>
        </div>
    );
};

export default Character;
