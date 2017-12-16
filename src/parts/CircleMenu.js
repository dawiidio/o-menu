import SVG from 'svg.js';
import Slice from './Slice';

import {
    degToRad,
    sliceToDeg
} from '../utils/utils';

import {
    MENU_DEFAULTS
} from '../config/defaults';

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
        
        this.radius              = (size/2)-(padding/2);
        this.radiusWithPadding   = (size/2);
        this.innerCircleDiameter = (innerCircleRadius*2)-padding;
        this.degForStep          = 0;
        this.radForStep          = 0;
        
        this.svg
            .size(size, size)
            .viewbox(0,0,size, size)
            .addClass(this.options.elClass)
            .style(this.options.styles.hidden);
        
        this.createSlices(slices)
            .createInnerCircle();

    }
    
    createSlices(slices){
        if(this.slices.length) {
            this.slices.forEach(slice => slice.destroy());
            this.slices = [];
        }
        
        const slicesLength    = slices.length;

        this.degForStep          = sliceToDeg(slicesLength);
        this.radForStep          = degToRad(this.degForStep);
        
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
        
        return this;
    }

    createInnerCircle(){
        if(this.innerCircle)
            this.innerCircle.remove();
        
        this.innerCircle = this.svg.circle(this.innerCircleDiameter)
            .move(this.radiusWithPadding - (this.innerCircleDiameter/2), this.radiusWithPadding-(this.innerCircleDiameter/2))
            .fill(this.options.innerCircleBackgroundColor)
            .attr('id', 'inner-circle')
            .scale(0.01, this.radiusWithPadding, this.radiusWithPadding);
        
        return this;
    }
    
    destroy(){
        this.svg = null;
        
        this.svg.remove();
        
        this.slices.forEach(slice => slice.destroy());
        this.slices = null;
    }

    // todo extract these two to ... decorator pattern?
    show(time = this.options.menuShowTime, sliceTime){
        this.svg.style(this.options.styles.visible);

        return new Promise(resolve => {
            this.innerCircle.animate(time).scale(1, this.radiusWithPadding, this.radiusWithPadding).after(() => {
                let promisesArr =  this.slices.map(slice => slice.show(sliceTime));
                
                Promise.all(promisesArr).then(resolve);
            });
        });
    }

    hide(time = this.options.menuHideTime, sliceTime){
        const promisesArr = this.slices.map(slice => slice.hide(sliceTime));

        return Promise.all(promisesArr).then(() => {
            this.innerCircle.animate(time).scale(0.01, this.radiusWithPadding, this.radiusWithPadding).after(() =>{
                this.svg.style(this.options.styles.hidden)
            });
        });
    }
}

export default Menu;