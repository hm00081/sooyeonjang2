export type Syj = {
    nodes: { name: number; group: number; index: number; count: number }[];
    links: { source: number; target: number; value: number }[];
};

export type NodeCycle = {
    x: number;
    y: number;
    z: number;
    nodeIndex: number;
};

export type DoubleArray = number[][];
