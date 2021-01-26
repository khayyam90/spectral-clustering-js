export class Point {	    
    private x: number;
    private y: number;

    public getX(): number{
        return this.x;
    }

    public getY(): number{
        return this.y;
    }

    public euclieanDistanceTo(p : Point): number{
        return Math.sqrt( (this.x - p.getX())*(this.x - p.getX()) + (this.y - p.getY())*(this.y - p.getY()));
    }

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}