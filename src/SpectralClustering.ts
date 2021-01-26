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

    public compute(options = new Map<String, any>()){
        let defaultOptions = new Map<String, any>([
            ["laplacianMatrix" , "connected"],
            ["maxClusters" , 8]
        ]);
        let runningOptions = Utils.resolveRunningParameters(defaultOptions, options);

        let laplacianMatrix = null; 
        if (runningOptions.get("laplacianMatrix") == "connected"){
            laplacianMatrix = this.extractStrictLaplacianMatrix();
        }else{
            laplacianMatrix = this.extractDistanceLaplacianMatrix();
        }

        var eigen = new EigenvalueDecomposition(laplacianMatrix, {assumeSymmetric: true});
        let nodes = this.graph.getNodes();

        // the eigen vectors & values are already sorted
        // there is not need to do it again

        let fiedlerVector = eigen.eigenvectorMatrix.getColumn(1);

        // k-means to divide the FiedlerVector

        let kmeanCluster = new Kmeans1D(fiedlerVector);
        let clusterResult = kmeanCluster.findBestClustering( runningOptions.get("maxClusters") );

        for (let i = 0; i<fiedlerVector.length; i++){
            let nodeI = nodes[i];
            nodeI.setCluster(clusterResult[i]);
        }
    }

    private extractStrictLaplacianMatrix(): Matrix{
        let result = new Matrix(this.graph.getNodes().length, this.graph.getNodes().length);

        let nodes = this.graph.getNodes();

        for (let i = 0; i<nodes.length; i++){
            let nodeI = nodes[i];
            let connected = nodeI.getConnectedNodes();

            for (let j = 0; j<nodes.length; j++){
                let nodeJ = nodes[j];
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
        let result = new Matrix(this.graph.getNodes().length, this.graph.getNodes().length);

        let nodes = this.graph.getNodes();

        for (let i = 0; i<nodes.length; i++){
            let nodeI = nodes[i];
            let sumDistances = 0;

            for (let j = 0; j<nodes.length; j++){
                if (i != j){
                    let nodeJ = nodes[j];

                    if (nodeI.isConnectedTo(nodeJ)){
                        let distance = nodeI.getPoint().euclieanDistanceTo(nodeJ.getPoint());

                        //let distanceInLaplacian = 1/distance;
                        let distanceInLaplacian = 1/Math.log10(distance);

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