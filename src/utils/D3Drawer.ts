import { Syj, NodeCycle } from '../types';
import * as d3 from 'd3';

export const D3Drawer = (syj: Syj, cc: number[][]) => {
    let selectVariable: string = '';
    var margin = { top: 250, right: 200, bottom: 10, left: 50 },
        width = 3000,
        height = 3000;

    const x = d3.scaleBand<number>().range([0, width]).domain(d3.range(syj.nodes.length));
    const svg = d3
        .select('body')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('margin-left', margin.left + 'px')
        .call(
            //@ts-ignore
            d3.zoom().on('zoom', (event) => {
                svg.attr('transform', () => event.transform);
            })
        ) //zoomevent
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const matrix: NodeCycle[][] = [];
    const nodes = syj.nodes;
    const n = nodes.length;

    nodes.forEach(function (node, i) {
        node.index = i;

        node.count = 0;
        matrix[i] = d3.range(n).map(function (j) {
            return { x: j, y: i, z: 0, nodeIndex: j };
        });
    });
    // Convert links to matrix; count character occurrences.
    syj.links.forEach(function (link) {
        matrix[link.source][link.target].z += link.value;

        matrix[link.target][link.source].z += link.value;

        matrix[link.source][link.source].z += link.value;

        matrix[link.target][link.target].z += link.value;

        nodes[link.source].count += link.value;

        nodes[link.target].count += link.value;
    });

    // Precompute the orders.
    const orders = {
        name: d3.range(n).sort(function (a, b) {
            return d3.ascending(nodes[a].name, nodes[b].name); //1~440까지 ascending
        }),

        group: d3.range(n).sort(function (a, b) {
            return nodes[b].group - nodes[a].group;
        }),
    };

    // The default sort order.
    x.domain(orders.name);
    //initiate()??
    svg.join(
        (enter: any) => enter.append('rect').attr('class', 'background').attr('width', width).attr('height', height),
        (update: any) => update,
        (exit: any) => exit.call((exit: any) => exit.remove())
    );

    const rowgSelection = svg.selectAll('.row').data(matrix).enter().append('g').attr('class', 'row');

    // .attr("transform", function (d, i) { return "translate(0," + x(i) + ")"; })

    rowgSelection.each(rowFunction); // d3.each = (js,ts).forEach 같은 반복문

    // original 가로줄
    // rowgSelection.append("line").attr("x2", width);

    rowgSelection.each(function (d, i) {
        // d3.select(this)
        svg.append('line').attr('x1', 0).attr('y1', x(d[0].y)!).attr('x2', width).attr('y2', x(d[0].y)!);
    });

    const rowTextSelection = rowgSelection
        .append('text')
        .attr('x', -2)
        .attr('y', (d, i) => x(d[0].y)! + x.bandwidth() * 0.75)
        // .attr("dx", ".02em")
        .attr('font-size', '20%')
        .attr('text-anchor', 'end')
        .text(function (d, i) {
            return nodes[i].name;
        });

    const column = svg
        .selectAll('.column')
        .data(matrix)
        .enter()
        .append('g')
        .attr('class', 'column')
        .attr('transform', function (d, i) {
            return 'translate(' + x(i) + ') rotate(-90)';
        });
    // 세로줄
    column.append('line').attr('x1', -width);
    // row: d3.Selection<SVGGElement, Matrix, SVGGElement, unknown>
    //@ts-ignore

    function rowFunction(row: NodeCycle[], rowIndex: number) {
        const Selection = d3
            // @ts-ignore
            .select(this)
            .selectAll('.cell')
            .data(
                row.filter((d) => {
                    return d.z;
                })
            )
            .join('g')
            .attr('class', 'cell')
            .on('mouseover', mouseover)
            .on('mouseout', mouseout);

        Selection.each(function (nodeCycle) {
            const cycles: number[] = [];
            for (let cycle = 0; cycle < cc[0].length; cycle++) {
                if (cc[rowIndex][cycle] === 0 && cc[nodeCycle.nodeIndex][cycle] === 0) {
                } else if (cc[rowIndex][cycle] === 0 && cc[nodeCycle.nodeIndex][cycle] === 1) {
                } else if (cc[rowIndex][cycle] === 1 && cc[nodeCycle.nodeIndex][cycle] === 0) {
                } else if (cc[rowIndex][cycle] === 1 && cc[nodeCycle.nodeIndex][cycle] === 1) {
                    if (
                        selectVariable === '0' ||
                        selectVariable === '1' ||
                        selectVariable === '2' ||
                        selectVariable === '3' ||
                        selectVariable === '4' ||
                        selectVariable === '5' ||
                        selectVariable === '6' ||
                        selectVariable === '7'
                    ) {
                        //각 사이클
                        if (cycle === Number(selectVariable)) {
                            // selectVariable: d3.range(n).sort(function (a,))

                            cycles.push(cycle);
                        }
                    } else {
                        //name, group
                        cycles.push(cycle);
                    }
                }
            }
            //initDraw()?
            d3.select(this)
                .selectAll('path')
                .data(cycles)
                .join('path')
                .transition()
                .duration(2500)
                .attr('d', (d, i) => {
                    let attribute: string = '';
                    if (cycles.length === 1) {
                        attribute = `M ${x(nodeCycle.x)} ${x(nodeCycle.y)} H ${x(nodeCycle.x)! + x.bandwidth()} V ${x(nodeCycle.y)! + x.bandwidth()} H${x(nodeCycle.x)} L${x(nodeCycle.x)} ${x(
                            nodeCycle.y
                        )}`;
                    }
                    if (cycles.length === 2) {
                        if (i === 0) {
                            // first path
                            attribute = `M${x(nodeCycle.x)} ${x(nodeCycle.y)} L ${x(nodeCycle.x)} ${x(nodeCycle.y)! + x.bandwidth()} L${x(nodeCycle.x)! + x.bandwidth()} ${x(nodeCycle.y)} Z`;
                        } else if (i === 1) {
                            // second path

                            attribute = `M ${x(nodeCycle.x)! + x.bandwidth()} ${x(nodeCycle.y)} L ${x(nodeCycle.x)} ${x(nodeCycle.y)! + x.bandwidth()} L${x(nodeCycle.x)! + x.bandwidth()} ${
                                x(nodeCycle.y)! + x.bandwidth()
                            } Z`;
                        }
                    } else if (cycles.length === 3) {
                        if (i === 0) {
                            // first path
                            attribute = `M${x(nodeCycle.x)} ${x(nodeCycle.y)! + x.bandwidth()} H ${x(nodeCycle.x)! + x.bandwidth()} V ${x(nodeCycle.y)! + (x.bandwidth() * 2) / 3} H ${x(
                                nodeCycle.x
                            )}Z`;
                        } else if (i === 1) {
                            // second path
                            attribute = `M${x(nodeCycle.x)} ${x(nodeCycle.y)! + (x.bandwidth() * 2) / 3} H ${x(nodeCycle.x)! + x.bandwidth()} V ${x(nodeCycle.y)! + x.bandwidth() / 3} H ${x(
                                nodeCycle.x
                            )}Z`;
                        } else if (i === 2) {
                            // third path
                            attribute = `M${x(nodeCycle.x)} ${x(nodeCycle.y)! + x.bandwidth() / 3} H ${x(nodeCycle.x)! + x.bandwidth()} V ${x(nodeCycle.y)} H ${x(nodeCycle.x)} Z`;
                        }
                    } else if (cycles.length === 4) {
                        if (i === 0) {
                            // first path
                            attribute = `M${x(nodeCycle.x)} ${x(nodeCycle.y)} L${x(nodeCycle.x)! + x.bandwidth() / 2} ${x(nodeCycle.y)! + x.bandwidth()}L${x(nodeCycle.x)! + x.bandwidth()} ${x(
                                nodeCycle.y
                            )}Z`;
                        } else if (i === 1) {
                            // second path
                            attribute = `M${x(nodeCycle.x)! + x.bandwidth()} ${x(nodeCycle.y)! + x.bandwidth()}L${x(nodeCycle.x)! + x.bandwidth() / 2} ${x(nodeCycle.y)! + x.bandwidth() / 2} L${
                                x(nodeCycle.x)! + x.bandwidth()
                            } ${x(nodeCycle.y)}Z`;
                        } else if (i === 2) {
                            // third path
                            attribute = `M${x(nodeCycle.x)! + x.bandwidth() / 2} ${x(nodeCycle.y)! + x.bandwidth() / 2}L${x(nodeCycle.x)}  ${x(nodeCycle.y)! + x.bandwidth()}L${
                                x(nodeCycle.x)! + x.bandwidth()
                            } ${x(nodeCycle.y)! + x.bandwidth()} Z`;
                        } else if (i === 3) {
                            // fourth path
                            attribute = `M${x(nodeCycle.x)} ${x(nodeCycle.y)} L${x(nodeCycle.x)} ${x(nodeCycle.y)! + x.bandwidth()} L${x(nodeCycle.x)! + x.bandwidth() / 2} ${
                                x(nodeCycle.y)! + x.bandwidth() / 2
                            }Z`;
                        }
                    }

                    return attribute;
                })
                .attr('fill', (d, i) => {
                    const cycle1Color = '#3288bd';
                    const cycle2Color = '#6fa6b6';
                    const cycle3Color = '#9cc5b3';
                    const cycle4Color = '#cae4b4';
                    const cycle5Color = '#ffd593';
                    const cycle6Color = '#faa974';
                    const cycle7Color = '#ef7c61';
                    const cycle8Color = '#e14958';

                    let color = '#000000';
                    switch (d) {
                        case 0:
                            color = cycle1Color;
                            break;
                        case 1:
                            color = cycle2Color;
                            break;
                        case 2:
                            color = cycle3Color;
                            break;
                        case 3:
                            color = cycle4Color;
                            break;
                        case 4:
                            color = cycle5Color;
                            break;
                        case 5:
                            color = cycle6Color;
                            break;
                        case 6:
                            color = cycle7Color;
                            break;
                        case 7:
                            color = cycle8Color;
                            break;
                    }
                    return color;
                })
                .attr('stroke', '#ffffff')
                .attr('stroke-width', '0.2px');
        });
    }

    d3.select('#order').on('change', function () {
        //@ts-ignore
        if (this.value === 'name' || this.value === 'group') {
            selectVariable = '';
            //@ts-ignore
            order(this.value);
        } else {
            //@ts-ignore
            selectVariable = this.value;
            // selectvariable draw
            rowgSelection.each(rowFunction);
            console.log(d3.ascending(Number(selectVariable), 5));
        }
    });

    function order(value: string) {
        //@ts-ignore
        x.domain(orders[value]);
        rowgSelection.each(rowFunction);

        rowTextSelection
            .transition()
            .duration(2500)
            .attr('x', -2)
            .attr('y', (d, i) => x(d[0].y)! + x.bandwidth() * 0.75)
            .attr('font-size', '20%')
            .attr('text-anchor', 'end')
            .text(function (d, i) {
                return nodes[i].name;
            });

        svg.selectAll('.column')
            .transition()
            .duration(2500)
            .attr('transform', function (d, i) {
                return 'translate(' + x(i) + ')rotate(-90)';
            });
    }
};

export function mouseover(mouseEvent: MouseEvent, p: NodeCycle) {
    console.log('mouseover');
    d3.selectAll('.row text').classed('active', function (d, i) {
        return i === p.y;
    });
    d3.selectAll('.column text').classed('active', function (d, i) {
        return i === p.x;
    });
}

export function mouseout() {
    d3.selectAll('text').classed('active', false);
}
