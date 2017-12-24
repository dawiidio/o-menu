/**
 * convert degrees to radians
 * 
 * @param deg {number}
 */
export const degToRad      = deg => deg * (Math.PI/180);

/**
 * convert percents to degrees
 * 
 * @param percents {number}
 */
export const percentsToDeg = percents => (percents/100)*360;

/**
 * Calculate arc angle of circle for every slice based on their amount
 * 
 * @param slices {number}
 */
export const sliceToDeg    = slices => percentsToDeg(
    ((360/slices) / 360) *100
);

/**
 * generate part for one color in hex notation like 3f, 48 etc.
 * 
 * @returns {string}
 */
export const generatePart = () => {
    let part = Math.floor(Math.random()*255).toString(16);
    return part.length === 1 ? `0${part}` : part;
};

/**
 * Compose color from parts
 * 
 * @returns {string}
 */
export const generateColor = () => ['#', generatePart(), generatePart(), generatePart()].join('');

/**
 * calculate coords for slice angle
 * 
 * @param origin {number}
 * @param r {number}
 * @param rads {number}
 * @returns {number[]}
 */
export const getCoordinatesForRads = (origin, r, rads) => {
    const x = origin + r * Math.cos(rads);
    const y = origin + r * Math.sin(rads);
    return [x,y];
};

/**
 * Syntax sugar for document.createElementNS
 * 
 * @param elementName {string}
 * @param attrs {object}
 * @returns {Element}
 */
export const createElementNS = (elementName, attrs = {}) => {
    const el    = document.createElementNS("http://www.w3.org/2000/svg", elementName);
    const keys  = Object.keys(attrs);
    
    keys.forEach( key => el.setAttributeNS(null, key, attrs[key]) );
    
    return el;
};

/**
 * Small extend function for classes options
 * 
 * @param a {object}
 * @param b {object}
 * @param c {object}
 * @returns {object}
 */
export const dumpExtend = (a, b = {}, c = {}) => {
    let bKeys = Object.keys(b);

    bKeys.forEach(key => {
        if(!c.hasOwnProperty(key))
            return a[key] = b[key];
        else {
            if(typeof b[key] === 'object' && !!b[key] && !Array.isArray(b[key]))
                a[key] = dumpExtend({}, b[key], c[key]);
            else
                a[key] = c[key];
        }
    });

    return a;
};

/**
 * 
 * @param {array} slicesArr
 * @returns {bool} 
 */
export const hasNestedSlices = slicesArr => slicesArr.reduce((a, b) => !!(b.slices && b.slices.length), false);