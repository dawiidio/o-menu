const contextMenuBehavior = menu => {
    let open = false;

    menu.svg.style({
        position: 'fixed'
    });

    if(!open)
        menu.hide(1, 1);
    
    const onClick = () => {
        menu.hide();
        open = false;
        document.removeEventListener('click', onClick);
    };

    const onOpen = ev => {
        ev.preventDefault();

        //todo wykrywac scrollbary, jesli sa to dodatkowe 35px do odleglosci

        let positionX = ev.x-menu.radiusWithPadding;
        let positionY = ev.y-menu.radiusWithPadding;

        const size = menu.options.size;

        if(positionX < 0)
            positionX = 0;
        else if(positionX + size > window.innerWidth)
            positionX = window.innerWidth - size;

        if(positionY < 0)
            positionY = 0;
        else if(positionY + size > window.innerHeight)
            positionY = window.innerHeight - size;

        if(open){
            menu.hide();
            open = false;
        }
        else {
            menu.svg.style({ transform: `translate3d(${positionX}px, ${positionY}px, 0)` });
            menu.show();
            open = true;
            document.addEventListener('click', onClick);
        }
    }
    
    document.body.addEventListener('contextmenu', onOpen);
};

export default contextMenuBehavior;