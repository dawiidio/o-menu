import {
    degToRad,
    radToDeg,
    sliceToDeg,
    getCoordinatesForRads,
    createElementNS,
    setStyles
} from '../utils/utils';
import objectToCSS from 'object-to-css';
import PartInterface from './PartInterface';
import { SLICE_EVENTS } from '../config/defaults';

class Slice extends PartInterface {
    /**
     *
     * @param svg {Object} SVG.js element
     * @param options {Object} Options for Slice
     */
    constructor(svg, options){
        super();
        this.options        = options;
        this.parent         = svg;
        this.data           = {};
        this.group          = null;
        this.number         = null;
        this.clickValue     = null;
        this.coords         = {
            arcStart: [],
            arcEnd  : [],
            content : []
        };
        this.pathArray      = [];
        this.rotateStepDeg  = 0;
        this.slices         = [];
        this.isSlicesOpen   = false;
    }

    /**
     * Plot slice
     */
    draw(data){
        this.data           = data;
        this.number         = this.data.number;
        const radius        = this.data.radius;

        this.rotateStepDeg  = -((this.number * this.data.degForStep))+this.data.circleDegOrigin+(this.data.parentDeg||0);

        this.startArcRad    = this.data.radForStep * this.data.number;
        this.endArcRad      = this.data.radForStep + this.startArcRad;

        this.coords.arcStart= getCoordinatesForRads(
            this.data.radiusWithPadding,
            radius,
            this.startArcRad
        );

        this.coords.arcEnd  = getCoordinatesForRads(
            this.data.radiusWithPadding,
            radius,
            this.endArcRad
        );

        const [startX, startY] = this.coords.arcStart;
        const [endX, endY]     = this.coords.arcEnd;

        this.pathArray = [
            `M ${startX} ${startY}`, // Move
            `A ${radius} ${radius} 0 0 1 ${endX} ${endY}`, // Arc
            `L ${this.data.radiusWithPadding} ${this.data.radiusWithPadding}` // Line
        ];

        if(this.slices.length){
            let radForStep = this.data.radForStep / this.slices.length;

            this.slices.forEach((slice, i) => {
                slice.draw({
                    ...this.data,
                    number           : i,
                    radForStep       : radForStep,
                    degForStep       : radToDeg(radForStep),
                    innerCircleRadius: radius,
                    radius           : this.data.radius + this.data.nthLevelSliceWidth,
                    parentRad        : this.startArcRad,
                    parentDeg        : radToDeg(this.startArcRad),
                    parentFill       : this.options.styles.defaults.fill
                });
            })
        }

        this.group      = this.parent.group();

        this.group
            .addClass(this.options.sliceClass)
            .path(this.pathArray.join(' '))
            .style(this.options.styles.defaults);

        this.drawContent();

        this.group
            .rotate(
                this.rotateStepDeg,
                this.data.radiusWithPadding,
                this.data.radiusWithPadding
            )
            .scale(0.01, this.data.radiusWithPadding, this.data.radiusWithPadding);

        this.bindCallbacks();

        return this;
    }

    /**
     * Render content (eg. icon in Slice)
     */
    drawContent(){
         this.coords.content = getCoordinatesForRads(
             this.data.radiusWithPadding,
             this.data.innerCircleRadius + ((this.data.radius-this.data.innerCircleRadius)/3) + this.options.iconDistanceFromInnerCircle,
             this.endArcRad-(this.data.radForStep/2)
        );

        const [contentX, contentY] = this.coords.content;

        const attrs = {
            x           : contentX-(this.options.contentSize/2.15)+this.options.contentMoveX,
            y           : contentY-(this.options.contentSize/1.6)+this.options.contentMoveY,
            width       : this.options.contentSize,
            height      : this.options.contentSize,
            transform   : `rotate(${Math.abs(this.data.circleDegOrigin)} ${contentX} ${contentY})`
        };

        const contentElement   = createElementNS('foreignObject', attrs);
        const calculatedStyles = {
            ...this.options.styles.contentContainer,
            ...{
                width : this.options.contentSize,
                height: this.options.contentSize
            }
        };

        contentElement.innerHTML = `
            <div xmlns="http://www.w3.org/1999/xhtml" 
                style="${objectToCSS(calculatedStyles)}"
            >
                ${this.options.content}
            </div>
        `;

        this.group.node.appendChild(contentElement);
    }

    /**
     * Adds callbacks for events
     */
    bindCallbacks(){
        this.group.on('click', ev => {
            ev.preventDefault();

            this.trigger(SLICE_EVENTS.click, this.options.value);

            if(typeof this.options.onClick === 'function')
                this.options.onClick(ev, this);

            if(!this.slices.length){
                this.clickValue = this.options.value;

                return false;
            }

            ev.stopPropagation();

            if(this.isSlicesOpen){
                this.slices.map(s => s.hide());
                this.isSlicesOpen = false;
            }
            else {
                this.slices.map(s => s.show());
                this.isSlicesOpen = true;
            }
        });

        this.group.on('hover', () => {
            this.group.style(this.options.styles.hover);
        });
    }

    /**
     * Destroying class instance
     */
    destroy(){
        this.group.off('hover');
        this.group.off('click');
        this.group.remove();
        this.group = null;
    }

    // todo extract these two to ... decorator pattern?
    show(time = this.options.sliceShowTime){
        return new Promise((resolve) => {
            this.group.animate(time).scale(1, this.data.radiusWithPadding, this.data.radiusWithPadding).after(() => {
                this.group
                    .animate(time)
                    .rotate(this.data.circleDegOrigin, this.data.radiusWithPadding, this.data.radiusWithPadding)
                    .after(resolve);
            })
        });
    }

    hideChildrens(time = this.options.sliceHideTime){
        if(this.slices.length)
            return this.slices.map(slice => slice.hide());

        return [Promise.resolve()];
    }

    hide(time = this.options.sliceHideTime){
        return new Promise((resolve) => {
            this.group
                .animate(time).rotate(this.rotateStepDeg, this.data.radiusWithPadding, this.data.radiusWithPadding)
                .after(() =>{
                    this.group
                        .animate(time)
                        .scale(0.01, this.data.radiusWithPadding, this.data.radiusWithPadding)
                        .after(resolve);
                })
        });
    }
}

export default Slice;
