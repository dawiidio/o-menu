export const radToDeg      = rad => rad * (180/Math.PI);

export const degToRad      = deg => deg * (Math.PI/180);

export const percentsToDeg = percents => (percents/100)*360;

export const sliceToDeg    = slices => percentsToDeg(
    ((360/slices) / 360) *100
);

export const generatePart = () => {
    let part = Math.floor(Math.random()*255).toString(16);
    return part.length === 1 ? `0${part}` : part;
};

export const generateColor = () => ['#', generatePart(), generatePart(), generatePart()].join('');

export const getCoordinatesForPercent = (origin, r, rads) => {
    const x = origin + r * Math.cos(rads);
    const y = origin + r * Math.sin(rads);
    return [x,y];
};

export const createElementNS = (elementName, attributes) => {
    const keys = Object.keys(attributes);
    const el = document.createElementNS("http://www.w3.org/2000/svg", elementName);

    keys.forEach(key => {
        el.setAttributeNS(null, key, attributes[key]);
    });
    
    return el;
};