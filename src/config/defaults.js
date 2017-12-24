export const MENU_DEFAULTS = {
    size    : 300,
    padding : 10,
    elClass : 'circle-menu',
    circleDegOrigin: -90,
    innerCircleRadius: 45,
    innerCircleBackgroundColor: '#fff',
    menuShowTime: 100,
    menuHideTime: 100,
    styles : {
        innerCircle: {
            strokeColor: '',
            strokeWidth: ''
        },
        hidden : {
            zIndex: -1,
            visibility: 'hidden'
        },
        visible: {
            zIndex: 9999,
            visibility: 'visible'
        },
        defaults: {
            position: 'fixed'
        }
    }
};

export const SLICE_DEFAULTS = {
    contentSize : 38,
    contentMoveX: 0,
    contentMoveY: 0,
    iconDistanceFromInnerCircle: 0,
    backgroundColor: null,
    contentColor: null,
    contentFontSize: null,
    contentHTML: null,
    sliceClass : 'circle-slice',
    sliceShowTime: 100,
    sliceHideTime: 100,
    slices: [],
    styles: {
        defaults: {
            cursor: 'pointer',
            strokeColor: '',
            strokeWidth: '' // todo strokes
        },
        hover: {
            
        }
    }
};