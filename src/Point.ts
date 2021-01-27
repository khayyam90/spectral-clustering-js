export class Point {	    
    private coords: Array<number>;

    public getX(): number{
        return this.coords[0];
    }

    public getY(): number{
        return this.coords[1];
    }

    public get(i: number):number{
        return this.coords[i];
    }

    public euclieanDistanceTo(p : Point): number{
        // let's assume both points have the same dimension
        let sum = 0;
        for (let i = 0; i<this.coords.length; i++){
            sum += (p.get(i) - this.get(i)) * (p.get(i) - this.get(i));
        }

        return Math.sqrt(sum);
    }

    constructor(coords: Array<number>){
        this.coords = coords;
    }
}