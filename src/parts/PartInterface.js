class PartInterface {
    constructor(){
        this.slices = [];
        this.subscriptions = {};
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

    on(event, callback){
        if(!this.subscriptions[event])
            this.subscriptions[event] = [];

        if(typeof callback !== 'function')
            throw new Error('oMenu callback must be a function');

        this.subscriptions[event].push(callback);
    }

    trigger(event, eventData){
        if(this.subscriptions[event])
            this.subscriptions[event].forEach(callback => callback(eventData));
    }
}

export default PartInterface;
