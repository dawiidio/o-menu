import './style.scss';

import {
    generateColor
} from './utils/utils';

import circleMenuBuilder from './utils/externalApi';

const onOpenCb = () => {
    return {
        slices :[
            {
                contentSize : 38,
                contentMoveX: 0,
                contentMoveY: 0,
                iconDistanceFromInnerCircle: 0,
                backgroundColor: generateColor(),
                contentColor: '#fff',
                contentFontSize: 38,
                contentHTML: '<i class="fa fa-home"></i>',
                sliceClass : 'circle-slice'
            },
            {
                contentSize : 38,
                contentMoveX: 0,
                contentMoveY: 10,
                iconDistanceFromInnerCircle: 0,
                backgroundColor: generateColor(),
                contentColor: '#fff',
                contentFontSize: 38,
                contentHTML: '<i class="fa fa-home"></i>',
                sliceClass : 'circle-slice'
            },
            {
                contentSize : 38,
                contentMoveX: 0,
                contentMoveY: 0,
                iconDistanceFromInnerCircle: 0,
                backgroundColor: generateColor(),
                contentColor: '#fff',
                contentFontSize: 38,
                contentHTML: '<i class="fa fa-home"></i>',
                sliceClass : 'circle-slice'
            },
            {
                contentSize : 38,
                contentMoveX: 0,
                contentMoveY: 0,
                iconDistanceFromInnerCircle: 0,
                backgroundColor: generateColor(),
                contentColor: '#fff',
                contentFontSize: 38,
                contentHTML: '<i class="fa fa-home"></i>',
                sliceClass : 'circle-slice'
            },
            {
                contentSize : 38,
                contentMoveX: 0,
                contentMoveY: 0,
                iconDistanceFromInnerCircle: 0,
                backgroundColor: generateColor(),
                contentColor: '#fff',
                contentFontSize: 38,
                contentHTML: '<i class="fa fa-home"></i>',
                sliceClass : 'circle-slice',
                onClick: () => {
                    console.log(123);
                }
            }
        ]
    }
};

circleMenuBuilder('drawing', {
    menu: {
        innerCircleRadius: 55
    },
    onOpen: onOpenCb
});