import { OMenuEventEmitter } from "../helpers/OMenuEventEmitter";

export class OMenuElement extends OMenuEventEmitter {
    constructor(){
        super();
        this.slices = [];
    }

    /**
     *
     * @param slice {Slice}
     * @returns {OMenuElement}
     */
    pushSlice(slice){
        if( !(slice instanceof OMenuElement) )
            throw new Error('Slice must be an instance of PartInterface class!');

        this.slices.push(slice);

        return this;
    }

    destroy(){}

    draw(){}

    hide(){}

    show(){}

}
