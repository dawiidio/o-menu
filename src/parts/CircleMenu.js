import SVG from 'svg.js';
import PartInterface from './PartInterface';

import {
    degToRad,
    sliceToDeg,
    hasNestedSlices,
    createElementNS
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
            padding,
            innerCircleWidth,
            firstLevelSliceWidth,
            nthLevelSliceWidth
        } = this.options;
        
        this.size                = (
            innerCircleWidth * 2
            + firstLevelSliceWidth * 2
            + nthLevelSliceWidth * 2
            + padding * 2
        ); 
        this.radius              = (this.size/2)-(padding/2);
        this.radiusWithPadding   = (this.size/2);
        this.innerCircleDiameter = (innerCircleWidth*2)-padding;
        this.degForStep          = 0;
        this.radForStep          = 0;
        this.hasNestedSlices     = null;
        
        this.svg
            .size(this.size, this.size)
            .viewbox(0,0,this.size, this.size)
            .addClass(this.options.elClass)
            .style(this.options.styles.hidden)
            .style(this.options.styles.defaults);
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

        if(!this.hasNestedSlices){
            this.size = this.size - this.options.nthLevelSliceWidth * 2;

            this.radius              = (this.size/2)-(this.options.padding/2);
            this.radiusWithPadding   = (this.size/2);

            this.svg
                .size(this.size, this.size)
                .viewbox(0,0,this.size, this.size);
        }

        this.slices.forEach((slice, i) => {
            slice.draw({
                radius            : this.options.innerCircleWidth + this.options.firstLevelSliceWidth,
                radiusWithPadding : this.radiusWithPadding,
                number            : i,
                degForStep        : this.degForStep,
                radForStep        : this.radForStep,
                circleDegOrigin   : this.options.circleDegOrigin,
                innerCircleRadius : this.options.innerCircleWidth,
                nthLevelSliceWidth: this.options.nthLevelSliceWidth
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

        const contentElement = createElementNS('foreignObject', {
            width : this.innerCircleDiameter,
            height: this.innerCircleDiameter
        });

        contentElement.innerHTML = `
            <div xmlns="http://www.w3.org/1999/xhtml" 
                style="width: ${this.innerCircleDiameter}px; height: ${this.innerCircleDiameter}px; border-radius: 50%; overflow: hidden;"
            >
                ${this.options.innerCircleContent}
            </div>
        `;
                
        this.innerCircle = this.svg
            .group()
            .size(this.innerCircleDiameter)
            .move(
                this.size/2,
                this.size/2
            )
            .attr('id', 'inner-circle')
            .scale(0.01);

        this.innerCircle
            .circle(this.innerCircleDiameter)
            .style(this.options.styles.innerCircle)

        this.innerCircle.node.appendChild(contentElement);
        
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
            this.innerCircle.animate(time).scale(1).after(() => {
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
        const childrenPromisesArr = this.slices.map(slice => slice.hideChildrens(sliceTime));

        return new Promise((resolve) => {
            Promise.all(childrenPromisesArr).then(() => {
                const promisesArr = this.slices.map(slice => slice.hide(sliceTime));

                Promise.all(promisesArr).then(() => {
                    this.innerCircle.animate(time).scale(0.01).after(() =>{
                        this.svg.style(this.options.styles.hidden);
                        resolve();
                    });
                });
            });
        });
        
    }
}

export default Menu;