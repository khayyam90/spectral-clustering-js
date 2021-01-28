![NPM](https://img.shields.io/npm/l/spectral-clustering-js)
![CodeClimate](https://img.shields.io/codeclimate/maintainability/khayyam90/spectral-clustering-js)
![Github Language](https://img.shields.io/github/languages/top/khayyam90/spectral-clustering-js)

# Spectral clustering JS (TypeScript)

This package aims to provide the spectral clustering feature. 
It is lightweight, fast and has few dependancies on purpose (only one). When transpiled it can run as well on browser-side and on server-side. 

## How does it works ?

* First you have to create a graph to represent your dataset ;
* The package computes the clustering and gives you a cluster id for each node of your graph. The computation uses the eigen vectors & eigen values and a 1D k-means clustering to separate the clusters ;
* That's all, you can focus on the next step (display the graph ? next pipeline step ? ...)

## Installation
```
npm install spectral-clustering-js
```

## Features
* lightweight ;
* can manage n dimensions points ;
* finds a given number of clusters or finds the best number of clusters ;
* abstract oriented, you can easily use the clustering for anything else ;
* allows to visualize the main sub-graphs.

## Usage

```javascript
import { Graph,SpectralClustering } from "spectral-clustering-js";

let graph = new Graph();
// create nodes, link your nodes ...

let s = new SpectralClustering(graph);
const options = new Map<string, string|number>([
    ["requestedNbClusters", 4],  // to find exactly 4 clusters. Do not set to let the package find how many clusters
    ["maxClusters", 6], // do not find more than 6 clusters (only if requestedNbClusters is not set)
    ["laplacianMatrix", "connected"]    // consider the connections between nodes without considering the distance between them. Set "distance" to considers the distance between the nodes.
]);
s.compute(options);

// at this point, each node in the graph has an integer cluster property

// display
```

## Example
[A web based graph generator & cluster viewer](https://github.com/khayyam90/spectral-clustering-js-example)




![Output](https://github.com/khayyam90/spectral-clustering-js/blob/master/examples/output.png)
