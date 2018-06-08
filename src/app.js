import './style.scss';

import {
    generateColor,
    randomInRange
} from './helpers/utils';

import circleMenuBuilder from './oMenu';


const onOpenCb = () => {
    return {
        menu: {
            innerCircleContent: `
                <img src="https://randomuser.me/api/portraits/men/${randomInRange(0, 100)}.jpg" style="width: 100%; height: auto;">
            `
        },
        slices :[
            {
                content: '<i class="fa fa-send"></i>',
                styles:{
                    defaults: {
                        fill: '#8BC34A'
                    }
                },
                slices: [
                    {
                        value: 'message',
                        content: '<i class="fa fa-comment"></i>',
                    },
                    {
                        value: 'mail',
                        content: '<i class="fa fa-envelope"></i>',
                    }
                ]
            },
            {
                content: '<i class="fa fa-pencil"></i>',
                styles:{
                    defaults: {
                        fill: '#FF9800'
                    }
                },
                value: 'ediiit something'
            },
            {
                content: '<i class="fa fa-times"></i>',
                styles:{
                    defaults: {
                        fill: '#F44336'
                    }
                },
                value: { action: 'remove-something' }
            },
            {
                content: '<i class="fa fa-bar-chart"></i>',
                styles:{
                    defaults: {
                        fill: '#009688'
                    }
                },
                slices: [
                    {
                        content: '<i class="fa fa-pie-chart"></i>',
                    },
                    {
                        content: '<i class="fa fa-area-chart"></i>',
                    }
                ]
            },
            {
                content: '<i class="fa fa-cog"></i>',
                styles:{
                    defaults: {
                        fill: '#4CAF50'
                    }
                },
                slices: [
                    {
                        content: '<i class="fa fa-power-off"></i>',
                    },
                    {
                        content: '<i class="fa fa-server"></i>',
                    },
                    {
                        content: '<i class="fa fa-database"></i>',
                    }
                ]
            }
        ]
    }
};

const c = circleMenuBuilder('drawing', {
    menu: {
        innerCircleRadius: 55,
        // innerCircleContent: `
        //     <div class="inner-circle-content">
        //         <div>
        //             <span>34</span>
        //         </div>
        //         <div>
        //             <span>87</span>
        //         </div>
        //     </div>
        // `
        innerCircleContent: `
            <img src="https://randomuser.me/api/portraits/men/${randomInRange(0, 100)}.jpg" style="width: 100%; height: auto;">
        `

    },
    nthSlice: {
        contentSize: 22,
        iconDistanceFromInnerCircle: 5,
        parentFillMode: -0.3,
        styles: {
            defaults: {
                fill: 'rgb(104, 171, 28)',
                strokeWidth: 1,
                stroke: '#d6d6d6'
            },
            contentContainer:{
                fontSize: 22,
                color: '#efefef'
            }
        }
    },
    slice: {
        contentSize : 30,
        iconDistanceFromInnerCircle: 10,
        styles: {
            defaults: {
                fill: 'rgb(119, 208, 16)',
                // strokeWidth: 1,
                // stroke: '#d6d6d6'
            },
            contentContainer:{
                fontSize: 30,
                color: '#efefef'
            },
            hover: {

            }
        }
    },
    onOpen: onOpenCb,
    onEndCloseAnimation: val => {
        console.log(val);
    }
});

c.on('sliceClick', ev => {
    console.log(ev);
})
