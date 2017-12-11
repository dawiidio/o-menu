import './style.scss';
// import './index';
// import './refactored';

import {
    generateColor
} from './utils/utils';
import ContextMenuBehavior from './parts/ContextMenuBehavior';
import {MenuAnimation as CircleMenu} from './parts/Animation';

const menu = new CircleMenu('drawing', [
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
        sliceClass : 'circle-slice'
    }
], {
    innerCircleRadius: 60,
});

const b = new ContextMenuBehavior(menu);
