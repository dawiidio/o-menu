export default class ContextMenuBehavior{
    constructor(menu){
        this.open = false;
        this.menu = menu;

        this.menu.svg.style({
            position: 'fixed'
        });
        
        if(!this.open)
            menu.hide();
        
        this.onClick = () => {
            this.menu.hide();
            this.open = false;
            document.removeEventListener('click', this.onClick);
        };
        
        document.body.addEventListener('contextmenu', (ev) => this.onOpen(ev));
    }

    onOpen(ev){
        ev.preventDefault();

        //todo wykrywac scrollbary, jesli sa to dodatkowe 35px do odleglosci

        let positionX = ev.x-this.menu.radiusWithPadding;
        let positionY = ev.y-this.menu.radiusWithPadding;
        
        const size = this.menu.options.size;

        if(positionX < 0)
            positionX = 0;
        else if(positionX + size > window.innerWidth)
            positionX = window.innerWidth - size;

        if(positionY < 0)
            positionY = 0;
        else if(positionY + size > window.innerHeight)
            positionY = window.innerHeight - size;

        if(this.open){
            this.menu.hide();
            open = false;
        }
        else {
            this.menu.svg.style({ transform: `translate3d(${positionX}px, ${positionY}px, 0)` });
            this.menu.show();
            this.open = true;
            document.addEventListener('click', this.onClick);
        }
    }
}