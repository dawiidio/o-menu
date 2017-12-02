import SVG from 'svg.js';

const getRandom     = (max, min = 0) => (Math.random() * (max - min + 1) ) << 0;
const radToDeg      = rad => rad * (180/Math.PI);
const degToRad      = deg => deg * (Math.PI/180);
const percentsToDeg = percents => (percents/100)*360;
const sliceToDeg    = slices => percentsToDeg(
    ((360/slices) / 360) *100
);

const generatePart = () => {
    let part = Math.floor(Math.random()*255).toString(16);
    return part.length === 1 ? `0${part}` : part;
};
const generateColor = () => ['#', generatePart(), generatePart(), generatePart()].join('');

const button  		 = document.querySelector('button');
const width   		 = 350;
const height  		 = 350;
const innerCircleRadius = 80;
const padding 		 = 30;
const slices  		 = 5;
const radius  		 = (width/2)-(padding/2);
const marginRadius   = (width/2);
const slicesArray    = [];
const degForStep     = sliceToDeg(slices);
const radForStep	 = degToRad(degForStep);
const getCoordinatesForPercent = (origin, r, rads) => {
    const x = origin + r * Math.cos(rads);
    const y = origin + r * Math.sin(rads);
    return [x,y];
};
// const getCoordinatesForPercent2 = prepareGetCoordinatesForPercent(marginRadius, innerCircleRadius + ((radius-innerCircleRadius)/2));
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

    const [startX, startY] = getCoordinatesForPercent(marginRadius, radius, cumulativeRadian);
    
    cumulativeRadian += radForStep;
    cumulativeDeg += degForStep;
    
    const [endX, endY] = getCoordinatesForPercent(marginRadius, radius, cumulativeRadian);
    
    const pathData = [
        `M ${startX} ${startY}`, // Move
        `A ${radius} ${radius} 0 0 1 ${endX} ${endY}`, // Arc
        `L ${marginRadius} ${marginRadius}` // Line
    ].join(' ');
    
    group
        .path(pathData)
        .fill(generateColor());

    const iconSize  = 50;
    const iconMoveX = 0;
    const iconMoveY = 0;
    
    // const t     = group.text(`${i}`);
    const fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");

    // const bcr   = t.node.getBoundingClientRect();

    const [textX, textY] = getCoordinatesForPercent(
        marginRadius, 
        innerCircleRadius + ((radius-innerCircleRadius)/3),
        cumulativeRadian-(radForStep/2)
    );
    
    fo.setAttributeNS(null, 'x', textX-(iconSize/2.15)+iconMoveX);
    fo.setAttributeNS(null, 'y', textY-(iconSize/1.6)+iconMoveY);
    fo.setAttributeNS(null, 'width', iconSize);
    fo.setAttributeNS(null, 'height', iconSize);
    fo.setAttributeNS(null, 'transform', `rotate(${Math.abs(circleDegOrigin)} ${textX} ${textY})`);
    
    fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml"><i style="font-size: ${iconSize}px; color: white" class="fa fa-home"></i></div>`;
    
    group.node.appendChild(fo);

    // group.circle(50).fill('#fff').move(textX-25, textY-25);
    group.circle(2).fill('white').move(textX, textY);

    // t.translate(textX, textY).rotate(Math.abs(circleDegOrigin));
    //todo wystepuje dziwne przesuniecie
    // console.log(t)
    
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

const innerCircleDiameter = (innerCircleRadius*2)-padding;
draw.circle(innerCircleDiameter).move(marginRadius - (innerCircleDiameter/2), marginRadius-(innerCircleDiameter/2)).fill('#fff')

console.log(slicesArray)