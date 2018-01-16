export const MENU_DEFAULTS = {
    padding : 10,
    elClass : 'circle-menu',
    circleDegOrigin: -90,
    innerCircleWidth: 45,
    innerCircleContent: ``,
    firstLevelSliceWidth: 70,
    nthLevelSliceWidth: 50,
    menuShowTime: 100,
    menuHideTime: 100,
    openMenuOn: 'contextmenu',
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
        defaults: {
            position: 'fixed',
            top: 0,
            left: 0
        }
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