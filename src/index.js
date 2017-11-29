import SVG from 'svg.js';

const getRandom     = (max, min = 0) => (Math.random() * (max - min + 1) ) << 0;
const radToDeg      = rad => rad * (180/Math.PI);
const degToRad      = deg => deg * (Math.PI/180);
const percentsToDeg = percents => (percents/100)*360;
const sliceToDeg    = slices => percentsToDeg(
    ((360/slices) / 360) *100
);
const prepareGetCoordinatesForPercent = (origin, r) => degs => {
    const x = origin + r * Math.cos(degs);
    const y = origin + r * Math.sin(degs);
    return [x,y];
};
const generatePart = () => {
    let part = Math.floor(Math.random()*255).toString(16);
    return part.length === 1 ? `0${part}` : part;
};
const generateColor = () => ['#', generatePart(), generatePart(), generatePart()].join('');

const button  		 = document.querySelector('button');
const width   		 = 350;
const height  		 = 350;
const padding 		 = 30;
const slices  		 = 7;
const radius  		 = (width/2)-(padding/2);
const marginRadius   = (width/2);
const slicesArray    = [];
const degForStep     = sliceToDeg(slices);
const radForStep	 = degToRad(degForStep);
const getCoordinatesForPercent = prepareGetCoordinatesForPercent(marginRadius, radius);
const circleDegOrigin = -90;

const closeTransform = slice => {
    const rotateStepDeg = -((slice.i * degForStep)+(degForStep/2))+circleDegOrigin;
    
    slice.group.animate(200).rotate(rotateStepDeg, marginRadius, marginRadius);
};

const openTransform = slice => {
    slice.group.animate(200).rotate(circleDegOrigin, marginRadius, marginRadius);
};

let open = true;
button.addEventListener('click', () => {
    if(open){
        slicesArray.forEach(closeTransform);
        open = false;
    }
    else {
        slicesArray.forEach(openTransform);
        open = true;
    }
});

const draw = SVG('drawing');
draw.size(width, height).viewbox(0,0,width, height)//.style('transform', 'rotate(-0.25turn)');

let cumulativeRadian = 0;
let cumulativeDeg = 0;

for(let i = 0; i < slices; ++i){
    const group = draw.group().rotate(circleDegOrigin, marginRadius, marginRadius);

    const [startX, startY] = getCoordinatesForPercent(cumulativeRadian);

    cumulativeRadian += radForStep;
    cumulativeDeg += degForStep;

    const [endX, endY] = getCoordinatesForPercent(cumulativeRadian);
    
    const pathData = [
        `M ${startX} ${startY}`, // Move
        `A ${radius} ${radius} 0 0 1 ${endX} ${endY}`, // Arc
        `L ${marginRadius} ${marginRadius}` // Line
    ].join(' ');
    
    group
        .path(pathData)
        .fill(generateColor());
    
    group.text(`${i}`)
    console.log();

    slicesArray.push({
        i,
        cumulativeDeg,
        group,
        cumulativeRadian
    });
}

class Segment {
    constructor(data){
        this.hidden       = true;
        this.segmentDeg   = null;
        this.segmentRad   = null;
        this.svgReference = null;
        this.number       = null;
        this.color        = null;
        this.content      = null;
        this.coords       = null;
    }
    
    hide(){
        
    }
    
    show(){
        
    }
}

const circleWidth = (width/2.2)-padding;
draw.circle(circleWidth).move(marginRadius - (circleWidth/2), marginRadius-(circleWidth/2)).fill('#fff')

console.log(slicesArray)