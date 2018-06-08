/**
 *
 * @param {Node} node
 * @param {Object} styles
 */


export const setStyles     = (node, styles) => {
    const keys = Object.keys(styles);

    keys.forEach(key => node.style[key] = styles[key]);

    return node;
};


/**
 *
 * @param {number} min
 * @param {number} max
 */
export const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * convert degrees to radians
 *
 * @param deg {number}
 */
export const degToRad      = deg => deg * (Math.PI/180);

/**
 * convert degrees to radians
 *
 * @param deg {number}
 */
export const radToDeg      = rad => (rad *180) / Math.PI;


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
    let temp = Object.keys(b).concat(Object.keys(c));
    let keys = [];

    (new Set(temp)).forEach(val => keys.push(val))

    keys.forEach(key => {
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
export const hasNestedSlices = slicesArr => slicesArr.reduce((a, b) => a || !!(b.slices && b.slices.length), false);

/**
 *
 * @param {array} arr
 * @param {string} key
 */
export const recursivelyForEachSlices = (arr, cb) => {
	let val = null;

	for(let slice of arr){
		cb(slice);

		if(slice.slices && slice.slices.length)
		    recursivelyForEachSlices(slice.slices, cb);
	}

	return val;
};
