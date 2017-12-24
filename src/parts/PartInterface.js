class PartInterface {
    constructor(){
        this.slices = [];
    }

    pushSlice(slice){
        if( !(slice instanceof PartInterface) )
            throw new Error('Slice must be an instance of PartInterface class!');

        this.slices.push(slice);

        return this;
    }

    destroy(){}

    draw(){}

    hide(){}

    show(){}
}

export default PartInterface;