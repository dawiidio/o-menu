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
                contentHTML: '<strong>1</strong>',
                sliceClass : 'circle-slice',
                slices: [
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
                    },
                    // {
                    //     contentSize : 38,
                    //     contentMoveX: 0,
                    //     contentMoveY: 0,
                    //     iconDistanceFromInnerCircle: 0,
                    //     backgroundColor: generateColor(),
                    //     contentColor: '#fff',
                    //     contentFontSize: 38,
                    //     contentHTML: '<i class="fa fa-home"></i>',
                    //     sliceClass : 'circle-slice',
                    // }
                ]
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
                sliceClass : 'circle-slice',
                slices: [
                    {
                        // contentSize : 38,
                        contentMoveX: 0,
                        contentMoveY: 0,
                        iconDistanceFromInnerCircle: 0,
                        backgroundColor: generateColor(),
                        contentColor: '#fff',
                        contentFontSize: 38,
                        contentHTML: '<i class="fa fa-home"></i>',
                        sliceClass : 'circle-slice',
                    },
                    {
                        // contentSize : 38,
                        contentMoveX: 0,
                        contentMoveY: 0,
                        iconDistanceFromInnerCircle: 0,
                        backgroundColor: generateColor(),
                        contentColor: '#fff',
                        contentFontSize: 38,
                        contentHTML: '<i class="fa fa-home"></i>',
                        sliceClass : 'circle-slice',
                    }
                ]
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
                },
                slices: [
                    {
                        // contentSize : 30,
                        contentMoveX: 0,
                        contentMoveY: 0,
                        iconDistanceFromInnerCircle: 0,
                        backgroundColor: generateColor(),
                        contentColor: '#fff',
                        contentFontSize: 30,
                        contentHTML: '<i class="fa fa-home"></i>',
                        sliceClass : 'circle-slice',
                    },
                    {
                        // contentSize : 38,
                        contentMoveX: 0,
                        contentMoveY: 0,
                        iconDistanceFromInnerCircle: 0,
                        backgroundColor: generateColor(),
                        contentColor: '#fff',
                        contentFontSize: 38,
                        contentHTML: '<i class="fa fa-home"></i>',
                        sliceClass : 'circle-slice',
                    },
                    {
                        // contentSize : 38,
                        contentMoveX: 0,
                        contentMoveY: 0,
                        iconDistanceFromInnerCircle: 0,
                        backgroundColor: generateColor(),
                        contentColor: '#fff',
                        contentFontSize: 38,
                        contentHTML: '<i class="fa fa-home"></i>',
                        sliceClass : 'circle-slice',
                    },
                    // {
                    //     contentSize : 38,
                    //     contentMoveX: 0,
                    //     contentMoveY: 0,
                    //     iconDistanceFromInnerCircle: 0,
                    //     backgroundColor: generateColor(),
                    //     contentColor: '#fff',
                    //     contentFontSize: 38,
                    //     contentHTML: '<i class="fa fa-home"></i>',
                    //     sliceClass : 'circle-slice',
                    // }
                ]
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

const c = circleMenuBuilder('drawing', {
    menu: {
        innerCircleRadius: 55
    },
    nthSlice: {
        contentSize: 30,
        contentFontSize: 30 //todo
    },
    onOpen: onOpenCb
});