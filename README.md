![NPM](https://img.shields.io/npm/l/spectral-clustering-js)

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
* abstract oriented, you can easily use the clustering for anything else ;
* allows to visualize the main sub-graphs.

## Usage

```javascript
import { Graph,SpectralClustering } from "spectral-clustering-js";

let graph = new Graph();
// create nodes, link your nodes ...

let s = new SpectralClustering(graph);
s.compute();

// display
```

## Example
[A web based graph generator & cluster viewer](https://github.com/khayyam90/spectral-clustering-js-example)




![Output](https://github.com/khayyam90/spectral-clustering-js/blob/master/examples/output.png)
