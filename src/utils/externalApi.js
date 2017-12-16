import CircleMenu from '../parts/CircleMenu';

const OPTIONS_DEFAULTS = {
    menu: {},
    slice: {},
    slices: [],
    innerCircle: {},
    onOpen: {},
    onClose: {},
};

export default (selector, options = OPTIONS_DEFAULTS) => {
    let open = false;

    const {
        menu,
        slice,
        slices,
        innerCircle,
        onOpen,
        onClose,
    } = options;
    
    let menuInstance = new CircleMenu(selector, slices || [], menu);

    const onClick = () => {
        menuInstance.hide();
        open = false;
        document.removeEventListener('click', onClick);
    };

    const openCb = ev => {
        ev.preventDefault();

        if(open){
            menuInstance.hide();
            open = false;
        }
        else {
            const dynamicOptions = onOpen();
            let dSlices = [];
            
            if(dynamicOptions.slices)
                dSlices = dynamicOptions.slices.map( item => ({...slice, ...item}) );
            
            if(dynamicOptions.menu)
                menuInstance = new CircleMenu(selector, dSlices, menu);
            else
                menuInstance
                    .createSlices( dSlices )
                    .createInnerCircle();


            let positionX = ev.x-menuInstance.radiusWithPadding;
            let positionY = ev.y-menuInstance.radiusWithPadding;

            const size = menuInstance.options.size;

            if(positionX < 0)
                positionX = 0;
            else if(positionX + size > window.innerWidth)
                positionX = window.innerWidth - size - 15;

            if(positionY < 0)
                positionY = 0;
            else if(positionY + size > window.innerHeight)
                positionY = window.innerHeight - size;
            
            menuInstance.svg.style({ transform: `translate3d(${positionX}px, ${positionY}px, 0)` });
            menuInstance.show();
            open = true;
            document.addEventListener('click', onClick);
        }
    };

    menuInstance.svg.style({
        position: 'fixed'
    });
    
    document.body.addEventListener('contextmenu', openCb);
}