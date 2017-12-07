import SVG from 'svg.js';
import {
    degToRad,
    percentsToDeg,
    sliceToDeg,
    generatePart,
    generateColor,
    getCoordinatesForPercent
} from  './utils';

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
    constructor(options){
        
    }
}

export class CircleMenu {
    constructor(slices, options){
        this.options = Object.assign({}, MENU_DEFAULTS, options);
        this.svg = SVG('drawing');
        

        this.createSlices();
    }
    
    createSlices(){
        this.slices = slices.map( slice => new Slice(slice))
    }
}

class Slice {
    //todo slice powinno tworzyc samego siebie, bez dostawania z gory instancji svg
    constructor(options){
        
    }
}

export class CircleMenuAnimation {
    
}

export class CircleContextMenu {
    
}
