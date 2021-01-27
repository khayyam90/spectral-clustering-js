import { Node } from "./Node";

export class Graph {	
    private nodes = new Map<string, Node>();

	public generateRandom(maxCoords: Array<number>, nbNodes: number, nbLinksForeachNode: number):void{
        this.nodes.clear();

        // generate two packets

        for (let i = 0; i<nbNodes; i++){
            const randomCoords = new Array<number>();
            maxCoords.forEach( v => {
                const c = Math.floor(Math.random() * v);
                randomCoords.push(c);
            });
            const n = new Node(randomCoords);
            this.addNode(n);
        }
        
        this.nodes.forEach( node1 => {
            const nearest = this.getNearestNodes(node1, nbLinksForeachNode);
            nearest.forEach( n => {
                node1.addConnectedNode(n);
                n.addConnectedNode(node1);
            });
        });
    }

    public addNode(node : Node):void{
        this.nodes.set(node.getId(), node);
    }

    public getNodes(): Array<Node>{
        return Array.from(this.nodes.values());
    }

    public getNearestNodes(node : Node, n: number): Array<Node>{
        let result = new Array<Node>();

        // let's calculate the distance for every node
        const distances = new Map<string, number>();
        this.nodes.forEach(function(value: Node, key: string){
            if (value.getId() != node.getId()){
                const distance = node.getPoint().euclieanDistanceTo(value.getPoint());
                distances.set(key, distance);
                result.push(value);
            }
        }.bind(this));

        result = result.sort(function(a: Node, b : Node){
            const less = distances.get(a.getId()) < distances.get(b.getId());
            if (less){
                return -1;
            }else{
                return 1;
            }
        }.bind(this));

        return result.slice(0, n);
    }    
}