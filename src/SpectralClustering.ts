import { Utils } from "./Utils";
import { Graph } from "./Graph";
import { Matrix, EigenvalueDecomposition } from 'ml-matrix';
import { Kmeans1D } from "./Kmeans1D";

/**
 * Class dedicated to spectral clustering : 
 * * compute the eigen values
 * * sort the eigen vectors accorting to the eigen values
 * * focus on the 2nd eiven vector (Fiedler's)
 * * run a k-means to cluster the components of the Fiedler's vector
 */
export class SpectralClustering {	
    private graph: Graph;

    constructor(graph : Graph){
        this.graph = graph;
    }

    public compute(options = new Map<string, string|number>()):void{
        const defaultOptions = new Map<string, string|number>([
            ["laplacianMatrix" , "connected"],
            ["maxClusters" , 8]
        ]);
        const runningOptions = Utils.resolveRunningParameters(defaultOptions, options);

        let laplacianMatrix = null; 
        if (runningOptions.get("laplacianMatrix") == "connected"){
            laplacianMatrix = this.extractStrictLaplacianMatrix();
        }else{
            laplacianMatrix = this.extractDistanceLaplacianMatrix();
        }

        const eigen = new EigenvalueDecomposition(laplacianMatrix, {assumeSymmetric: true});
        const nodes = this.graph.getNodes();

        // the eigen vectors & values are already sorted
        // there is not need to do it again

        const fiedlerVector = eigen.eigenvectorMatrix.getColumn(1);

        // k-means to divide the FiedlerVector

        const kmeanCluster = new Kmeans1D(fiedlerVector);
        const clusterResult = kmeanCluster.findBestClustering( <number>(runningOptions.get("maxClusters")) );

        for (let i = 0; i<fiedlerVector.length; i++){
            const nodeI = nodes[i];
            nodeI.setCluster(clusterResult[i]);
        }
    }

    private extractStrictLaplacianMatrix(): Matrix{
        const result = new Matrix(this.graph.getNodes().length, this.graph.getNodes().length);

        const nodes = this.graph.getNodes();

        for (let i = 0; i<nodes.length; i++){
            const nodeI = nodes[i];
            const connected = nodeI.getConnectedNodes();

            for (let j = 0; j<nodes.length; j++){
                const nodeJ = nodes[j];
                if (nodeI.isConnectedTo(nodeJ)){
                    result.set(i,j,-1);
                }
            }    
            
            result.set(i,i, connected.size );
        }

        return result;
    }

    /**
     * Build a matrix showing the distance of nodes
     */
    private extractDistanceLaplacianMatrix(): Matrix{
        const result = new Matrix(this.graph.getNodes().length, this.graph.getNodes().length);

        const nodes = this.graph.getNodes();

        for (let i = 0; i<nodes.length; i++){
            const nodeI = nodes[i];
            let sumDistances = 0;

            for (let j = 0; j<nodes.length; j++){
                if (i != j){
                    const nodeJ = nodes[j];

                    if (nodeI.isConnectedTo(nodeJ)){
                        const distance = nodeI.getPoint().euclieanDistanceTo(nodeJ.getPoint());

                        //let distanceInLaplacian = 1/distance;
                        const distanceInLaplacian = 1/Math.log10(distance);

                        result.set(i,j, -distanceInLaplacian);
                        
                        sumDistances += distanceInLaplacian;
                    }
                }
            }            

            result.set(i,i, sumDistances);
        }

        return result;
    }
}