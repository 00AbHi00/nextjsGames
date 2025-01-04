type ballParams={
    x:number,
    y:number,
    speed:number
}

export class Ball{
    x:number
    y:number
    speed:number
    
    constructor({x,y,speed}:ballParams)
    {
        this.x=x
        this.y=y
        this.speed=speed
    }
}