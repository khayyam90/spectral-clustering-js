import { Node, Graph } from "spectral-clustering-js";

export class GraphRenderer {
    private ctx: any;
    private graph: Graph;
    private canvas: any;
    
	constructor(graph : Graph, canvas: HTMLCanvasElement){
        this.ctx = canvas.getContext("2d");
        this.graph = graph;
        this.canvas = canvas;
    }

    public draw(colors: Array<string>){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.graph.getNodes().forEach( node => {
            node.getConnectedNodes().forEach(function(value: Node, key: string){
                this.drawLink(node, value);
            }.bind(this));
        });

        this.graph.getNodes().forEach( node => {
            this.drawNode(node, colors);
        });
    }    

    public drawNode(node: Node, colors: Array<string>){
        let circle = new Path2D();
        circle.arc(node.getPoint().getX(), node.getPoint().getY(), 5, 0, 2 * Math.PI, false);
        
        let color = colors[node.getCluster()];

        this.ctx.fillStyle = color;
        this.ctx.fill(circle);
    }

    public drawLink(node1: Node, node2: Node){
        this.ctx.beginPath();
        this.ctx.moveTo(node1.getPoint().getX(), node1.getPoint().getY());
        this.ctx.lineTo(node2.getPoint().getX(), node2.getPoint().getY());
        this.ctx.fillStyle = "blue";
        this.ctx.stroke();
    }
}