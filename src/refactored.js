import SVG from 'svg.js';

const SEGMENT_DEFAULTS = {
    iconSize: 50,
    iconMoveX: 0,
    iconMoveY: 0,
    iconDistanceFromInnerCircle: 0,
    background: 'black',
    html      : `<i style="font-size: 50px; color: white" class="fa fa-home"></i>`
};

const MENU_DEFAULTS = {
    width   : 350,
    height  : 350,
    padding : 60,
    id      : 'circleMenu'
};

class InnerCircle {
    constructor(segments, options){
        const {
            width,
            height,
            padding,
            id
        } = Object.assign({}, MENU_DEFAULTS, options);
        
        this.mathData = {
            width,
            height,
            padding,
            radius: (width/2)-(padding/2),
            radiusWithPadding: (width/2),
            circleDegOrigin: -90
        }
        
        this.__svg = SVG(id)
            .size(width, height)
            .viewbox(0,0,width, height);

    }
}

export class CircleMenu {
    constructor(options){
        
    }
}

class CircleMenuSegment {
    constructor(params, options){
        
    }
}

export class CircleMenuAnimation {
    
}

export class CircleContextMenu {
    
}
