import Slice from './Slice.js';
import {
    degToRad,
    radToDeg,
    sliceToDeg,
    getCoordinatesForRads,
    createElementNS
} from '../utils/utils';

class NthLevelSlice extends Slice {
    /**
     * Plot slice
     */
    draw(data){
        this.data           = data;
        this.number         = this.data.number;
        
        const radius        = this.data.radius;

        this.rotateStepDeg  = 0;

        this.startArcRad    = (
            (this.data.radForStep * this.data.number) 
            + degToRad(this.data.circleDegOrigin)
            + degToRad(this.data.parentDeg)
        );
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

        this.group      = this.parent.group();
        
        this.group
            .addClass(this.options.sliceClass)
            .path(this.pathArray.join(' '))
            .fill(this.options.backgroundColor)
            .style(this.options.styles.defaults);

        this.drawContent();
        
        this.group
            .scale(0.2, this.data.radiusWithPadding, this.data.radiusWithPadding)
            .opacity(0);

        this.bindCallbacks();

        return this;
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
           height      : this.options.contentSize
       };
       
       const contentElement = createElementNS('foreignObject', attrs);

       contentElement.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="width: ${this.options.contentSize}px; height: ${this.options.contentSize}px; color:${this.options.contentColor}; font-size:${this.options.contentFontSize}px; cursor: pointer;">${this.options.contentHTML}</div>`;
       
       this.group.node.appendChild(contentElement);
   }

    // todo extract these two to ... decorator pattern?
    show(time = this.options.sliceShowTime){
        return new Promise((resolve) => {
            
            this.group
                .opacity(1)
                .animate(time)
                .scale(1, this.data.radiusWithPadding, this.data.radiusWithPadding)
                .after(resolve)
        });
    }

    hide(time = this.options.sliceHideTime){
        return new Promise((resolve) => {
            this.group
                .animate(time)
                .scale(0.01, this.data.radiusWithPadding, this.data.radiusWithPadding)
                .after(() => {
                    this.group.opacity(0)
                    resolve()                        
                });
        });
    }
}

export default NthLevelSlice;