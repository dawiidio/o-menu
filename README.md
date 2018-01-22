# O! Menu (o-menu)
Simple circular menu based on SVG

[DEMO](https://dawiidio.github.io/o-menu-demo/)

![](https://user-images.githubusercontent.com/7998389/34531622-37467548-f0b3-11e7-8d98-55ab43982525.png)
![](https://user-images.githubusercontent.com/7998389/34630442-6c3b1ca8-f26c-11e7-959f-133a87716aa7.gif)

## Installation
```bash
npm i --save o-menu
```
## Usage
Options for menu:

* **menu**:
    * **padding**: *number* - padding for menu
    * **openMenuOn**: *string|boolean* - open menu on event, if false opens only manually by open method in object returns by oMenu function call
    * **closeMenuOn**: *string|boolean* - close menu on event, if false close only manually by close method in object returns by oMenu function call
    * **elClass**: *string* - css class which will be bounded to the menu main element
    * **circleDegOrigin**: *number* - default is -90
    * **innerCircleWidth**: *number* - radius width of inner circle
    * **innerCircleContent**: *string* - HTML string, defines what render in inner circle
    * **firstLevelSliceWidth**: *number* - width of first level slices radius
    * **nthLevelSliceWidth**: *number* - width of second level slices radius
    * **menuShowTime**: *number* - time in ms, defines speed of innerCircle show animation 
    * **menuHideTime**: *number* - time in ms, defines speed of innerCircle hide animation
    * **styles**: *object* - all styles needs to be written in camel case notation
        * **innerCircle**: *object* - any initial CSS styles for inner circle
        * **hidden**: *object* - styles appiled to element when it is hidden
        * **visible**: *object* - styles appiled to element when it is visible
        * **defaults**: *object* - initial styles for root menu element
* **slice**: *object* - Default options for first level slices
    * **contentSize**: *number* - size of slice content in pixels (it is usualy icon so content is always square thats width = height)
    * **contentMoveX**:*number* - slice content move in pixels at x axis
    * **contentMoveY**:*number* - slice content move in pixels at y axis
    * **parentFillMode**:*number* - Number in range -1 to 1. Negative - color darker, positive - color brighter, 0 - not set.
    Option for nested slices. When it is different from zero fill color will be based on parent's color, but will be darker or brighter depending on the parentFillMode value. 
    * **iconDistanceFromInnerCircle**:*number* content distance from inner circle, for nested slices inner circle is radius of parent's slices
    * **content**:*string* - HTML string with content for slice
    * **sliceClass**:*string* - class which will be appiled to slice element
    * **sliceShowTime**:*number* - slice show animation duration
    * **sliceHideTime**:*number* - slice hide animation duration
    * **slices**:*array[object]* - children slices
    * **value**:*any* - value will be passed as parameter for onEndCloseAnimation callback to identify which slice was clicked
    * **onClick**: *function* - callback fired when slice was clicked
    * **styles**:*object*
        * **defaults**:*object* - default styles for slice
        * **contentContainer**:*object* - slice content container default styles
        * **hover**:*object*: styles appiled to slice after hover on it 
* **nthSlice**: *object* - Default options for second level slices, same as slice
* **slices**: *array[object]* - Array of objects which can contains same options as described in slice, options set here are overwrite these set in slice or nthSlice as default.
* **onOpen**:*function* - callback which can return object with new options for menu, it can overwrite any options set for menu, slice, nthSlice and slices. It's mean, you can change all menu depending eg.: on element which was clicked and show user different options
* **onClose**:*function* - callback fired immediately after close event
* **onEndCloseAnimation**:*function* - callback fired after all close animations of menu and slices will ends, in parameter gets value which was set in slice options 

### Simple example
```javascript
import oMenu from 'o-menu';

// open menu callback which will deliver slices
const onOpenCb = () => {
    return {
        slices :[
            {
                content: 'A',
                styles:{
                    defaults: {
                        fill: '#8BC34A'
                    }
                },
                value: 'send email'
            },
            {
                content: 'B',
                styles:{
                    defaults: {
                        fill: '#F44336'
                    }
                },
                value: 'delete user'
            }
        ]
    }
};

// create menu instance, firstly you need to pass parent element id for menu, secondly default options for menu 
const c = oMenu('main', {
    menu: {
        innerCircleRadius: 55
    },
    nthSlice: {
        contentSize: 22,
        iconDistanceFromInnerCircle: 5,
        parentFillMode: -0.3,
        styles: {
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
            contentContainer:{
                fontSize: 30,
                color: '#efefef'
            },
        }
    },
    onOpen: onOpenCb,
    onEndCloseAnimation: val => {
        if(val)
            alert(`You want to: ${val}`)
    }
});

/**
 in const c we have object with three methods for manual open, close and trigger menu
 c = {
    open: function(ev, options){...} - function which opens menu, requires event in first param and dynamic menu options
                                       for second. WARNING! if you open menu manually, onOpen callback will never be called
                                       therfore you need to pass options directly to open method. 
    close: function(ev){...} - function which close menu, requires event in first param
    trigger: function(ev){...} - function which triggers menu
 }
*/
```

## Full default options
```javascript
{
    menu                : {
        padding : 10,
        elClass : 'circle-menu',
        circleDegOrigin: -90,
        innerCircleWidth: 45,
        innerCircleContent: ``,
        firstLevelSliceWidth: 70,
        nthLevelSliceWidth: 50,
        menuShowTime: 100,
        menuHideTime: 100,
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
                position: 'fixed'
            }
        }
    },
    slice               : {
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
    },
    nthSlice            : {
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
    },
    slices              : [],
    onOpen              : null,
    onClose             : null,
    onEndCloseAnimation : null
}
```
