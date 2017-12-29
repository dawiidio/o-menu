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

        // if(this.slices.length){
        //     let radForStep = this.data.radForStep / this.slices.length;

        //     this.slices.forEach((slice, i) => {
        //         slice.draw({
        //             ...this.data,
        //             number           : i,
        //             radForStep       : radForStep,
        //             degForStep       : radToDeg(radForStep),
        //             innerCircleRadius: radius,
        //             radius           : this.data.radius + this.data.nthLevelSliceWidth,
        //             parentRad        : this.startArcRad,
        //             parentDeg        : radToDeg(this.startArcRad)
        //         });
        //     })
        // }

        this.group      = this.parent.group();
        
        this.group
            .addClass(this.options.sliceClass)
            .path(this.pathArray.join(' '))
            .fill(this.options.backgroundColor)
            .style(this.options.styles.defaults);

        this.drawContent();
        
        this.group
            // .rotate(
            //     this.data.parentDeg + this.data.circleDegOrigin,
            //     this.data.radiusWithPadding, 
            //     this.data.radiusWithPadding
            // )
            // .scale(0.2, this.data.radiusWithPadding, this.data.radiusWithPadding)
            // .opacity(0);

        this.bindCallbacks();

        return this;
    }

    // todo extract these two to ... decorator pattern?
    show(time = this.options.sliceShowTime){
        return new Promise((resolve) => {
            
            this.group
                .opacity(1)
                .scale(1, this.data.radiusWithPadding, this.data.radiusWithPadding)
            
            resolve();
        });
    }

    drawContent(){
        this.coords.content = getCoordinatesForRads(
            this.data.radiusWithPadding,
            this.data.innerCircleRadius + ((this.data.radius-this.data.innerCircleRadius)/3) + this.options.iconDistanceFromInnerCircle,
            this.endArcRad-(this.data.radForStep/2)
       );

       const [contentX, contentY] = this.coords.content;
       
       const test = this.data.circleDegOrigin/(this.number||1)
       console.log(test, this.group.node);
       
       const attrs = {
           x           : contentX-(this.options.contentSize/2.15)+this.options.contentMoveX,
           y           : contentY-(this.options.contentSize/1.6)+this.options.contentMoveY,
           width       : this.options.contentSize,
           height      : this.options.contentSize,
           // this.data.parentDeg + this.data.circleDegOrigin
        //    transform   : `rotate(${test} ${contentX} ${contentY})`
       };
       
       const contentElement = createElementNS('foreignObject', attrs);

       contentElement.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="width: ${this.options.contentSize}px; height: ${this.options.contentSize}px; color:${this.options.contentColor}; font-size:${this.options.contentFontSize}px; cursor: pointer;">${this.options.contentHTML}</div>`;
       
       this.group.node.appendChild(contentElement);
   }

    hide(time = this.options.sliceHideTime){
        let promises = [Promise.resolve()];

        if(this.slices.length)
            promises = this.slices.map(slice => slice.hide());

        return Promise.all(promises).then(() => {
            return new Promise((resolve) => {
                this.group
                    .opacity(0)
                    .scale(0.01, this.data.radiusWithPadding, this.data.radiusWithPadding)
                resolve()
            });
        });
    }
}

export default NthLevelSlice;