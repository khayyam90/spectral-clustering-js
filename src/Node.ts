import { Point } from "./Point";

export class Node {	
    private id: string;
    private connectedNodes: Map<string, Node> = new Map<string, Node>();
    private coords: Point;
    private color = "blue";
    private cluster = 0;

    public getId(): string{
        return this.id;
    }

    public getPoint(): Point{
        return this.coords;
    }

    public setColor(color: string):void{
        this.color = color;
    }

    public getColor():string{
        return this.color;
    }

    public setCluster(cluster: number):void{
        this.cluster = cluster;
    }

    public getCluster():number{
        return this.cluster;
    }

    public addConnectedNode(node: Node):void{
        this.connectedNodes.set(node.getId(), node);        
    }

    public isConnectedTo(node: Node):boolean{
        return this.connectedNodes.has(node.getId());
    }

    public getConnectedNodes():Map<string, Node> {
        return this.connectedNodes;
    }

    constructor(coords: Array<number>){
        this.coords = new Point(coords);
        this.id = Math.floor(Math.random() * Date.now()).toString();
    }
}