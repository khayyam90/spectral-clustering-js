import { Node } from "./Node";

export class Graph {	
    private nodes = new Map<String, Node>();
    
    constructor(){
    }

	public generateRandom(maxX: number, maxY: number, nbNodes: number, nbLinksForeachNode: number){
        this.nodes.clear();

        // generate two packets

        let center1 = [maxX/4, maxY/2];
        for (let i = 0; i<nbNodes /2; i++){
            let x = center1[0] + Math.floor(maxX /2 * Math.random()) - maxX/4;
            let y = center1[1] + Math.floor(maxY /2 * Math.random()) - maxY/4;

            let node = new Node(x,y);
            this.addNode(node);
        }

        let center2 = [3*maxX/4, maxY/2];
        for (let i = 0; i<nbNodes /2; i++){
            let x = center2[0] + Math.floor(maxX /2 * Math.random()) - maxX/4;
            let y = center2[1] + Math.floor(maxY /2 * Math.random()) - maxY/4;

            let node = new Node(x,y);
            this.addNode(node);
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