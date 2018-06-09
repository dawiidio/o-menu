import './style.scss';

import {
    generateColor,
    randomInRange
} from './helpers/utils';

import circleMenuBuilder from './oMenu';


const c = circleMenuBuilder('mainElement', {
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
    }
});

c.on('sliceEnter', ev => {
    console.log(ev);
})
c.on('hideAnimationEnd', ev => {
    console.log(ev);
})

document.getElementById('mainElement').addEventListener('contextmenu', ev => {
    ev.preventDefault();

    const dynamicMenuOptions = {
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
                data: 'ediiit something'
            },
            {
                content: '<i class="fa fa-times"></i>',
                styles:{
                    defaults: {
                        fill: '#F44336'
                    }
                },
                data: { action: 'remove-something' }
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

    c.open(ev, dynamicMenuOptions)
});
