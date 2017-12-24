import {
    degToRad,
    radToDeg,
    sliceToDeg,
    getCoordinatesForRads,
    createElementNS
} from '../utils/utils';
import PartInterface from './PartInterface';

class Slice extends PartInterface {
    /**
     * 
     * @param svg {Object} SVG.js element
     * @param options {Object} Options for Slice
     */
    constructor(svg, options){
        super();
        this.options    = options;
        this.data       = {};
        this.group      = svg.group();
        this.number     = null;
        this.coords     = {
            arcStart: [],
            arcEnd  : [],
            content : []
        };
        this.pathArray = [];
        this.rotateStepDeg = 0;
        this.slices = [];

        this.bindCallbacks();
    }

    /**
     * Plot slice
     */
    draw(data){
        this.data           = data;
        this.number         = this.data.number;
        
        this.group
            .rotate(
                this.data.circleDegOrigin, 
                this.data.radiusWithPadding, 
                this.data.radiusWithPadding
            )
            .addClass(this.options.sliceClass);

        this.rotateStepDeg = -((this.number * this.data.degForStep)+(this.data.degForStep/2))+this.data.circleDegOrigin;

        this.startArcRad    = this.data.radForStep * this.data.number;
        this.endArcRad      = this.data.radForStep + this.startArcRad;
        
        this.coords.arcStart = getCoordinatesForRads(
            this.data.radiusWithPadding,
            this.data.radius,
            this.startArcRad
        );

        this.coords.arcEnd = getCoordinatesForRads(
            this.data.radiusWithPadding,
            this.data.radius,
            this.endArcRad
        );
        
        const [startX, startY] = this.coords.arcStart;
        const [endX, endY]     = this.coords.arcEnd;

        this.pathArray = [
            `M ${startX} ${startY}`, // Move
            `A ${this.data.radius} ${this.data.radius} 0 0 1 ${endX} ${endY}`, // Arc
            `L ${this.data.radiusWithPadding} ${this.data.radiusWithPadding}` // Line
        ];

        if(this.slices.length){
            const degForStep = this.data.degForStep / this.options.slices.length;

            this.slices.forEach((slice, i) => {
                slice.draw({
                    ...this.data,
                    number: i,
                    radForStep: degToRad(degForStep),
                    degForStep
                });
            })
        }

        this.group
            .path(this.pathArray.join(' '))
            .fill(this.options.backgroundColor)
            .style(this.options.styles.defaults)

        this.drawContent();

        this.group
            .rotate(this.rotateStepDeg, this.data.radiusWithPadding, this.data.radiusWithPadding)
            .scale(0.01, this.data.radiusWithPadding, this.data.radiusWithPadding);

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
        
        const contentElement = createElementNS('foreignObject', attrs);

        contentElement.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="width: ${this.options.contentSize}px; height: ${this.options.contentSize}px; color:${this.options.contentColor}; font-size:${this.options.contentFontSize}px; cursor: pointer;">${this.options.contentHTML}</div>`;
        
        this.group.node.appendChild(contentElement);
    }

    /**
     * Adds callbacks for events
     */
    bindCallbacks(){
        if(this.options.onClick)
            this.group.on('click', this.options.onClick);
        
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

    hide(time = this.options.sliceHideTime){
        let promises = [Promise.resolve()];

        // if(this.slices.length)
            // this.slices.map(slice => slice.hide());

        return Promise.all(promises).then(() => {
            return new Promise((resolve) => {
                this.group.animate(time).rotate(this.rotateStepDeg, this.data.radiusWithPadding, this.data.radiusWithPadding).after(() =>{
                    this.group
                        .animate(time)
                        .scale(0.01, this.data.radiusWithPadding, this.data.radiusWithPadding)
                        .after(resolve)
                })
            });
        });
    }
}

export default Slice;