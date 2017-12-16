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

export const getCoordinatesForRads = (origin, r, rads) => {
    const x = origin + r * Math.cos(rads);
    const y = origin + r * Math.sin(rads);
    return [x,y];
};


export const createElementNS = (elementName, attrs = {}) => {
    const el    = document.createElementNS("http://www.w3.org/2000/svg", elementName);
    const keys  = Object.keys(attrs);
    
    keys.forEach( key => el.setAttributeNS(null, key, attrs[key]) );
    
    return el;
};

export const deepCopy = object => JSON.parse(JSON.stringify(object));
