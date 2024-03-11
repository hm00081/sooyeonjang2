export type Syj = {
    nodes: { name: number; group: number }[];
    links: { source: string; target: string; value: number }[];
};

export type NodeCycle = {
    x: number;
    y: number;
    z: number;
    nodeIndex: number;
};
