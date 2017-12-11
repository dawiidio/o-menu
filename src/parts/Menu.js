import {
    degToRad,
    generateColor,
    generatePart,
    percentsToDeg,
    getCoordinatesForRads,
    sliceToDeg
} from '../utils/utils';
import {SliceAnimation} from './Animation';
import SVG from 'svg.js';


const MENU_DEFAULTS = {
    size    : 300,
    padding : 10,
    elClass : 'circle-menu',
    circleDegOrigin: -90,
    innerCircleRadius: 45,
    innerCircleBackgroundColor: '#fff',
};

class Menu {
    constructor(selector, slices, options){
        this.options = {...MENU_DEFAULTS, ...options};
        this.svg     = SVG(selector);
        this.slices  = [];
        
        const {
            size, 
            padding,
            innerCircleRadius
        } = this.options;
        
        const slicesLength    = slices.length;
        
        this.degForStep          = sliceToDeg(slicesLength);
        this.radForStep          = degToRad(this.degForStep);
        this.radius              = (size/2)-(padding/2);
        this.radiusWithPadding   = (size/2);
        this.innerCircleDiameter = (innerCircleRadius*2)-padding;
        
        
        this.svg
            .size(size, size)
            .viewbox(0,0,size, size)
            .addClass(this.options.elClass);
        
        this.createSlices(slices);
        this.createInnerCircle();
    }
    
    createSlices(slices){
        this.slices = slices.map((sliceOptions, i) => {
            const data = {
                radius            : this.radius,
                radiusWithPadding : this.radiusWithPadding,
                number            : i,
                degForStep        : this.degForStep,
                radForStep        : this.radForStep,
                circleDegOrigin   : this.options.circleDegOrigin,
                innerCircleRadius : this.options.innerCircleRadius
            };
            
            return new SliceAnimation(this.svg, data, sliceOptions)
        });
    }

    createInnerCircle(){
        this.innerCircle = this.svg.circle(this.innerCircleDiameter)
            .move(this.radiusWithPadding - (this.innerCircleDiameter/2), this.radiusWithPadding-(this.innerCircleDiameter/2))
            .fill(this.options.innerCircleBackgroundColor)
            .attr('id', 'inner-circle');
    }
}

export default Menu;