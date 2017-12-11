import SVG from 'svg.js';
import Slice from './Slice';

import {
    degToRad,
    sliceToDeg
} from '../utils/utils';

import {
    MENU_DEFAULTS,
    STYLES
} from './defaults';

class Menu {
    constructor(selector, slices, options){
        this.options = {...MENU_DEFAULTS, ...options};
        this.svg     = SVG(selector);
        this.slices  = [];
        
        this.svg.style(STYLES.hidden);
        
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
            
            return new Slice(this.svg, data, sliceOptions)
        });
    }

    createInnerCircle(){
        this.innerCircle = this.svg.circle(this.innerCircleDiameter)
            .move(this.radiusWithPadding - (this.innerCircleDiameter/2), this.radiusWithPadding-(this.innerCircleDiameter/2))
            .fill(this.options.innerCircleBackgroundColor)
            .attr('id', 'inner-circle');
    }

    // todo extract these two to ... decorator pattern?
    show(time = this.options.menuShowTime, sliceTime){
        this.svg.style(STYLES.visible);

        this.innerCircle.animate(time).scale(1, this.radiusWithPadding, this.radiusWithPadding).after(() => {
            this.slices.forEach(slice => {
                slice.show(sliceTime);
            });
        });
    }

    hide(time = this.options.menuHideTime, sliceTime){
        const promisesArr = this.slices.map(slice => slice.hide(sliceTime));

        Promise.all(promisesArr).then(() => {
            this.innerCircle.animate(time).scale(0.01, this.radiusWithPadding, this.radiusWithPadding).after(() =>{
                this.svg.style(STYLES.hidden)
            });
        });
    }
}

export default Menu;