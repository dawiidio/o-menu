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
const width   		 = 250;
const height  		 = width;
const innerCircleRadius = 45;
const padding 		 = 10;
const slices  		 = 6;
const iconSize  = 38;
const iconMoveX = 0;
const iconMoveY = 0;
const iconDistanceFromInnerCircle = 7;
const radius  		 = (width/2)-(padding/2);
const marginRadius   = (width/2);
const slicesArray    = [];
const degForStep     = sliceToDeg(slices);
const radForStep	 = degToRad(degForStep);
const innerCircleDiameter = (innerCircleRadius*2)-padding;
let innerCircle, draw;
const getCoordinatesForRads = (origin, r, rads) => {
    const x = origin + r * Math.cos(rads);
    const y = origin + r * Math.sin(rads);
    return [x,y];
};
// const getCoordinatesForPercent2 = prepareGetCoordinatesForPercent(marginRadius, innerCircleRadius + ((radius-innerCircleRadius)/2));
const circleDegOrigin = -90;

const closeTransformSegment = slice => {
    const rotateStepDeg = -((slice.i * degForStep)+(degForStep/2))+circleDegOrigin;
    
    return new Promise((resolve, reject) => {
        slice.group.animate(100).rotate(rotateStepDeg, marginRadius, marginRadius).after(() =>{
            slice.group.animate(100).scale(0.01, marginRadius, marginRadius).after(( ) => {
                resolve(1);
            })
        })
    });
};

const openTransformSegment = slice => {
    return new Promise((resolve, reject) => {
        slice.group.animate(100).scale(1, marginRadius, marginRadius).after(() => {
            slice.group.animate(100).rotate(circleDegOrigin, marginRadius, marginRadius);
        })
    });
};

const closeFn = () => {
    const promisesArr = slicesArray.map(closeTransformSegment);
    
    Promise.all(promisesArr).then(() => {
        innerCircle.animate(100).scale(0.01, marginRadius, marginRadius).after(() =>{
            draw.addClass('hidden-animation-end');
        })
    });
};

const openFn = () => {
    draw.removeClass('hidden-animation-end');

    innerCircle.animate(100).scale(1, marginRadius, marginRadius).after(() => {
        slicesArray.forEach(openTransformSegment);
    });
};

let open = true;
const onClick = () => {
    closeFn();
    open = false;
    document.removeEventListener('click', onClick);
}

document.body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    
    //todo wykrywac scrollbary, jesli sa to dodatkowe 35px do odleglosci
    
    let positionX = ev.x-marginRadius;
    let positionY = ev.y-marginRadius;

    console.log(ev, positionX + marginRadius, window.innerWidth);

    if(positionX < 0)
        positionX = 0;
    else if(positionX + width > window.innerWidth)
        positionX = window.innerWidth - width;
    
    if(positionY < 0)
        positionY = 0;
    else if(positionY + height > window.innerHeight)
        positionY = window.innerHeight - width;
    
    if(open){
        closeFn();
        open = false;
    }
    else {
        draw.style({ transform: `translate3d(${positionX}px, ${positionY}px, 0)` });
        openFn();
        open = true;
        document.addEventListener('click', onClick);
    }
});

draw = SVG('drawing');

draw
    .size(width, height)
    .viewbox(0,0,width, height)
    .addClass('circle-menu');

let cumulativeRadian = 0;
let cumulativeDeg = 0;

for(let i = 0; i < slices; ++i){
    const group = draw.group().rotate(circleDegOrigin, marginRadius, marginRadius);

    const [startX, startY] = getCoordinatesForRads(marginRadius, radius, cumulativeRadian);
    
    cumulativeRadian += radForStep;
    cumulativeDeg += degForStep;
    
    const [endX, endY] = getCoordinatesForRads(marginRadius, radius, cumulativeRadian);
    
    const pathData = [
        `M ${startX} ${startY}`, // Move
        `A ${radius} ${radius} 0 0 1 ${endX} ${endY}`, // Arc
        `L ${marginRadius} ${marginRadius}` // Line
    ].join(' ');
    
    group
        .path(pathData)
        .fill(generateColor());
    
    const fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");

    const [textX, textY] = getCoordinatesForRads(
        marginRadius, 
        innerCircleRadius + ((radius-innerCircleRadius)/3) + iconDistanceFromInnerCircle,
        cumulativeRadian-(radForStep/2)
    );
    
    fo.setAttributeNS(null, 'x', textX-(iconSize/2.15)+iconMoveX);
    fo.setAttributeNS(null, 'y', textY-(iconSize/1.6)+iconMoveY);
    fo.setAttributeNS(null, 'width', iconSize);
    fo.setAttributeNS(null, 'height', iconSize);
    fo.setAttributeNS(null, 'transform', `rotate(${Math.abs(circleDegOrigin)} ${textX} ${textY})`);
    
    fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="width: ${iconSize}px; height: ${iconSize}px;"><i style="font-size: ${iconSize}px; color: white" class="fa fa-home"></i></div>`;
    
    group.node.appendChild(fo);
    group.addClass('circle-slice');
    
    slicesArray.push({
        i,
        cumulativeDeg,
        group,
        cumulativeRadian
    });
}

innerCircle = draw.circle(innerCircleDiameter)
    .move(marginRadius - (innerCircleDiameter/2), marginRadius-(innerCircleDiameter/2))
    .fill('#fff')
    .attr('id', 'inner-circle');

console.log(slicesArray)