import { Point } from "./Point";

export class Node {	
    private id: String;
    private connectedNodes: Map<String, Node> = new Map<String, Node>();
    private coords: Point;
    private color: String = "blue";
    private cluster: number = 0;

    public getId(): String{
        return this.id;
    }

    public getPoint(): Point{
        return this.coords;
    }

    public setColor(color: String){
        this.color = color;
    }

    public getColor():String{
        return this.color;
    }

    public setCluster(cluster: number){
        this.cluster = cluster;
    }

    public getCluster():number{
        return this.cluster;
    }

    public addConnectedNode(node: Node){
        this.connectedNodes.set(node.getId(), node);        
    }

    public isConnectedTo(node: Node){
        return this.connectedNodes.has(node.getId());
    }

    public getConnectedNodes():Map<String, Node> {
        return this.connectedNodes;
    }

    constructor(x: number, y: number){
        this.coords = new Point(x,y);
        this.id = Math.floor(Math.random() * Date.now()).toString();
    }
}