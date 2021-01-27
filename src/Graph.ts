import { Node } from "./Node";

export class Graph {	
    private nodes = new Map<String, Node>();
    
    constructor(){
    }

	public generateRandom(maxCoords: Array<number>, nbNodes: number, nbLinksForeachNode: number){
        this.nodes.clear();

        // generate two packets

        for (let i = 0; i<nbNodes; i++){
            let randomCoords = new Array<number>();
            maxCoords.forEach( (v,i) => {
                let c = Math.floor(Math.random() * v);
                randomCoords.push(c);
            });
            let n = new Node(randomCoords);
            this.addNode(n);
        }
        
        this.nodes.forEach( node1 => {
            let nearest = this.getNearestNodes(node1, nbLinksForeachNode);
            nearest.forEach( n => {
                node1.addConnectedNode(n);
                n.addConnectedNode(node1);
            });
        });
    }

    public addNode(node : Node){
        this.nodes.set(node.getId(), node);
    }

    public getNodes(): Array<Node>{
        return Array.from(this.nodes.values());
    }

    public getNearestNodes(node : Node, n: number): Array<Node>{
        let result = new Array<Node>();

        // let's calculate the distance for every node
        let distances = new Map<String, number>();
        this.nodes.forEach(function(value: Node, key: String){
            if (value.getId() != node.getId()){
                let distance = node.getPoint().euclieanDistanceTo(value.getPoint());
                distances.set(key, distance);
                result.push(value);
            }
        }.bind(this));

        result = result.sort(function(a: Node, b : Node){
            let less = distances.get(a.getId()) < distances.get(b.getId());
            if (less){
                return -1;
            }else{
                return 1;
            }
        }.bind(this));

        return result.slice(0, n);
    }    
}