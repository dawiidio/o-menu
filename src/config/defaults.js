export const POSITION_MODES = {
    fixed: 'relativeToScreen',
    relative: 'relativeToParent',
};

export const MENU_DEFAULTS = {
    padding : 10,
    positioningMode: POSITION_MODES.relative,
    elClass : 'circle-menu',
    circleDegOrigin: -90,
    innerCircleWidth: 45,
    innerCircleContent: ``,
    firstLevelSliceWidth: 70,
    nthLevelSliceWidth: 50,
    menuShowTime: 100,
    menuHideTime: 100,
    closeMenuOn: 'click',
    styles : {
        innerCircle: {
            strokeColor: '',
            strokeWidth: '',
            fill: '#fff',
        },
        hidden : {
            zIndex: -1,
            visibility: 'hidden'
        },
        visible: {
            zIndex: 9999,
            visibility: 'visible'
        },
        defaults: {}
    }
};

export const SLICE_DEFAULTS = {
    contentSize : 38,
    contentMoveX: 0,
    contentMoveY: 0,
    parentFillMode : 0,
    iconDistanceFromInnerCircle: 0,
    content: null,
    sliceClass : 'circle-slice',
    sliceShowTime: 100,
    sliceHideTime: 100,
    slices: [],
    value: null,
    styles: {
        defaults: {
            cursor: 'pointer',
            fill: '#f1f1f1'
        },
        contentContainer: {
            color: 'red',
            fontSize: 38,
            cursor: 'pointer'
        },
        hover: {

        }
    }
};

export const OPTIONS_DEFAULTS = {
    menu                : MENU_DEFAULTS,
    slice               : SLICE_DEFAULTS,
    nthSlice            : SLICE_DEFAULTS,
    slices              : [],
};

export const SLICE_EVENTS = {
    mouseEnter: 'mouseEnter',
    mouseLeave: 'mouseLeave',
    click: 'click',
};

export const NATIVE_SLICE_EVENTS = {
    mouseover: SLICE_EVENTS.mouseEnter,
    mouseout: SLICE_EVENTS.mouseLeave,
    click: SLICE_EVENTS.click,
};

export const EXTERNAL_API_EVENTS = {
    sliceClick: 'sliceClick',
    sliceEnter: 'sliceEnter',
    sliceLeave: 'sliceLeave',
    openMenu: 'openMenu',
    closeMenu: 'closeMenu',
    hideAnimationEnd: 'hideAnimationEnd',
    showAnimationEnd: 'showAnimationEnd',
};

export const INTERNAL_EXTERNAL_EVENTS_MAPPING = {
    [SLICE_EVENTS.mouseEnter]: EXTERNAL_API_EVENTS.sliceEnter,
    [SLICE_EVENTS.mouseLeave]: EXTERNAL_API_EVENTS.sliceLeave,
    [SLICE_EVENTS.click]: EXTERNAL_API_EVENTS.sliceClick,
};
