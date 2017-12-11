import {
    getCoordinatesForRads,
    createElementNS
} from '../utils/utils';

import {
    SLICE_DEFAULTS
} from './defaults';

class Slice {
    constructor(svg, data, options){
        this.options    = {...SLICE_DEFAULTS, ...options};
        this.data       = data;
        this.group      = svg.group();
        this.number     = this.data.number;
        this.coords     = {
            arcStart: [],
            arcEnd  : [],
            content : []
        };
        this.pathArray = [];
        
        this.group
            .rotate(
                data.circleDegOrigin, 
                data.radiusWithPadding, 
                data.radiusWithPadding
            )
            .addClass(this.options.sliceClass)
        
        this.drawSlice();
        this.drawContent();
    }
    
    drawSlice(){
        this.startArcRad    = this.data.radForStep * this.data.number;
        this.endArcRad      = this.data.radForStep + this.startArcRad;
        
        console.log(this);
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

        this.group
            .path(this.pathArray.join(' '))
            .fill(this.options.backgroundColor);
    }
    
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

        contentElement.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="width: ${this.options.contentSize}px; height: ${this.options.contentSize}px; color:${this.options.contentColor}; font-size:${this.options.contentFontSize}px;">${this.options.contentHTML}</div>`;

        this.group.node.appendChild(contentElement);
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
        const rotateStepDeg = -((this.number * this.data.degForStep)+(this.data.degForStep/2))+this.data.circleDegOrigin;

        return new Promise((resolve) => {
            this.group.animate(time).rotate(rotateStepDeg, this.data.radiusWithPadding, this.data.radiusWithPadding).after(() =>{
                this.group
                    .animate(time)
                    .scale(0.01, this.data.radiusWithPadding, this.data.radiusWithPadding)
                    .after(resolve)
            })
        });
    }
}

export default Slice;