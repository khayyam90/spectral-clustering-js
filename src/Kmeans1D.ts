import { Utils } from "./Utils";

export class Kmeans1D {	
    private items: number[];
    private min : number;
    private max : number;
    private amplitude : number;

    constructor(items : number[]){
        this.items = items;
        this.min = Utils.min(items);
        this.max = Utils.max(items);

        this.amplitude = this.max - this.min;
    }

    public findBestClustering(maxClusters = 10):Array<number>{
        const results : Array<Array<number>> = [];
        const distances : Array<number> = [];
        for (let c = 2; c < maxClusters; c++){
            const tmpResult = this.tryToCluster(c);
            const affectations = tmpResult[0];
            const centroids = tmpResult[1];

            // calculate the total distance from points to centroids
            let totalDistance = 0;
            for (let i = 0; i<affectations.length; i++){
                totalDistance += Math.abs(  this.items[i] - centroids[affectations[i]] );
            }

            results.push(affectations);
            distances.push(totalDistance);
        }

        // elbow method to find the best cluster size
        const curveDifference : Array<number> = [];
        for (let d = 1; d < distances.length-1; d++){
            const descending1 = distances[d] - distances[d-1];
            const descending2 = distances[d+1] - distances[d];
            curveDifference.push(  descending2 - descending1);
        }

        const bestCurveDifference = Utils.maxIndex(curveDifference);

        return results[bestCurveDifference+1];
    }

    /**
     * Finds the best clustering into $nbClusters clusters
     * @param nbClusters 
     * @returns [centroidsForPoints, centroids]
     */
    private tryToCluster(nbClusters: number ) {
        const centroids: Array<number> = [];
        const pointsForCentroid : Array<Array<number>> = [];

        // initialize the centroids randomly
        for (let i = 0; i<nbClusters; i++){
            centroids.push(  this.min + Math.random() * this.amplitude  );
            pointsForCentroid.push([]);
        }

        let centroidForPoints: Array<number> = [];
        let previousCentroidForPoints: Array<number> = [];

        // iterate until the cluster do not move anymore
        let stillMoving = true;
        let nbIterations = 0;
        while (nbIterations < 50 && stillMoving){
            stillMoving = false;
            centroidForPoints = [];

            // associate each point to the nearest centroid
            for (let itemIndex = 0; itemIndex < this.items.length; itemIndex++){
                const itemValue = this.items[itemIndex];
                let minDistance: number = Number.MAX_VALUE;
                let nearestCentroid = 0;

                for (let centroidIndex = 0; centroidIndex < centroids.length; centroidIndex++){
                    const d = Math.abs(  centroids[centroidIndex] - itemValue  );
                    if (d < minDistance || minDistance == null){
                        minDistance = d;
                        nearestCentroid = centroidIndex;
                    }
                }
                
                centroidForPoints.push(nearestCentroid);

                // if something has changed since the previous iteration, we need one more iteration
                if (previousCentroidForPoints.length < itemIndex 
                    || previousCentroidForPoints[itemIndex] != nearestCentroid){
                        stillMoving = true;
                    }

                pointsForCentroid[nearestCentroid].push(itemValue);
            } 

            previousCentroidForPoints = centroidForPoints;

            // move the centroids to the center of items
            for (let c = 0; c < centroids.length; c++){
                centroids[c] = Utils.mean(pointsForCentroid[c]);
                pointsForCentroid[c] = [];
            }

            nbIterations++;
        }

        return [centroidForPoints, centroids];
    }

}