import SVG from 'svg.js';
// import Slice from './FirstLevelSlice';
import PartInterface from './PartInterface';

import {
    degToRad,
    sliceToDeg,
    hasNestedSlices
} from '../utils/utils';

class Menu extends PartInterface {
    /**
     * 
     * @param selector {string} css id for parent element where menu should be triggered
     * @param options {Object} Options for menu
     */
    constructor(selector, options){
        super();
        this.options = options;
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
        this.hasNestedSlices     = null;
        
        this.svg
            .size(size, size)
            .viewbox(0,0,size, size)
            .addClass(this.options.elClass)
            .style(this.options.styles.hidden)
            .style(this.options.styles.defaults);
        
        // this.draw(slices)
        //     .createInnerCircle();
    }

    /**
     * Map config array to Slice class instances
     * 
     * @returns {Menu}
     */
    draw(){
        this.hasNestedSlices     = hasNestedSlices(this.slices);                
        this.degForStep          = sliceToDeg(this.slices.length);
        this.radForStep          = degToRad(this.degForStep);
        
        this.slices.forEach((slice, i) => {
            slice.draw({
                radius            : this.radius,
                radiusWithPadding : this.radiusWithPadding,
                number            : i,
                degForStep        : this.degForStep,
                radForStep        : this.radForStep,
                circleDegOrigin   : this.options.circleDegOrigin,
                innerCircleRadius : this.options.innerCircleRadius
            });
        });

        this.createInnerCircle();
        
        return this;
    }

    /**
     * Create inner circle, where we can put some additional content
     * 
     * @returns {Menu}
     */
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

    /**
     * Destroys instance
     */
    destroy(){
        this.svg.remove();
        this.svg = null;

        this.slices.forEach(slice => slice.destroy());
        this.slices = [];
    }

    // todo extract these two to ... decorator pattern?
    /**
     * Show menu and triggers show on linked Slices
     * 
     * @param time {number} Time for innerCircle
     * @param sliceTime {number} Time for slices
     * @returns {Promise}
     */
    show(time = this.options.menuShowTime, sliceTime){
        this.svg.style(this.options.styles.visible);

        return new Promise(resolve => {
            this.innerCircle.animate(time).scale(1, this.radiusWithPadding, this.radiusWithPadding).after(() => {
                let promisesArr =  this.slices.map(slice => slice.show(sliceTime));
                
                Promise.all(promisesArr).then(resolve);
            });
        });
    }

    /**
     * Hide menu and triggers hide on linked Slices
     *
     * @param time {number} Time for innerCircle
     * @param sliceTime {number} Time for slices
     * @returns {Promise}
     */
    hide(time = this.options.menuHideTime, sliceTime){
        const promisesArr = this.slices.map(slice => slice.hide(sliceTime));

        return new Promise((resolve) => {
            Promise.all(promisesArr).then(() => {
                this.innerCircle.animate(time).scale(0.01, this.radiusWithPadding, this.radiusWithPadding).after(() =>{
                    this.svg.style(this.options.styles.hidden);
                    resolve();
                });
            });
        });
        
    }
}

export default Menu;