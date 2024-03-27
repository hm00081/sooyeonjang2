'use client';
import { useEffect } from 'react';
import styles from '../../styles/styles.module.css';
import { Syj } from '../types';
import { D3Drawer } from '../utils/D3Drawer';

//@ts-ignore
const Home = ({ syj, doubleArray }) => {
    useEffect(() => {
        if (syj && doubleArray) {
            D3Drawer(syj, doubleArray);
        }
    }, [syj, doubleArray]);

    if (!syj || !doubleArray) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.sooyeonjang}>
            <h1>Sooyeonjang Counting Cycle</h1>
            <aside style={{ marginTop: 0, marginRight: -200 }}>
                <div>
                    Order:{' '}
                    <select id="order">
                        <option value="name">by Time</option>
                        <option value="group">by Frequency</option>
                        <option value="0">by Cycle1</option>
                        <option value="1">by Cycle2</option>
                        <option value="2">by Cycle3</option>
                        <option value="3">by Cycle4</option>
                        <option value="4">by Cycle5</option>
                        <option value="5">by Cycle6</option>
                        <option value="6">by Cycle7</option>
                        <option value="7">by Cycle8</option>
                    </select>
                </div>
                <div>
                    Built with <a href="https://d3js.org/">d3.js</a>.
                </div>
                <p>
                    <b>Cycle Legend</b>
                </p>
                <div style={{ display: 'flex' }}>
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect width="13" height="13" style={{ fill: '#3288bd', paddingRight: '10em' }}></rect>
                    </svg>
                    <div>Cycle 1</div>

                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect width="13" height="13" style={{ fill: '#6fa6b6', paddingRight: '10em' }}></rect>
                    </svg>
                    <div>Cycle 2</div>

                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect width="13" height="13" style={{ fill: '#9cc5b3', paddingRight: '10em' }}></rect>
                    </svg>
                    <div>Cycle 3</div>

                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect width="13" height="13" style={{ fill: '#cae4b4', paddingRight: '10em' }}></rect>
                    </svg>
                    <div>Cycle 4</div>
                </div>

                <div>
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect width="13" height="13" style={{ fill: '#ffd593', paddingRight: '10em' }}></rect>
                    </svg>
                    Cycle 5
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect width="13" height="13" style={{ fill: '#faa974', paddingRight: '10em' }}></rect>
                    </svg>
                    Cycle 6
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect width="13" height="13" style={{ fill: '#ef7c61', paddingRight: '10em' }}></rect>
                    </svg>
                    Cycle 7
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect width="13" height="13" style={{ fill: '#e14958', paddingRight: '10em' }}></rect>
                    </svg>
                    Cycle 8
                </div>
                <div id="hi">
                    <b>Counting Cycle</b>
                </div>

                <div>
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <rect
                            width="13"
                            height="13"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></rect>
                    </svg>
                    1 Cycle
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <path
                            d="M13 0 L0 13 L13 13 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                        <path
                            d="M0 0 L0 13 L13 0 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                    </svg>
                    2 Cycles
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <path
                            d="M0 13 H 13 V 8.666 H 0 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                        <path
                            d="M0 8.66 H 13 V 4.333 H 0 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                        <path
                            d="M0 4.33 H 13 V 0 H 0 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                    </svg>
                    3 Cycles
                    <svg width="13" height="13" style={{ marginLeft: 7 }}>
                        <path
                            d="M0 0 L6.5 6.5 L13 0 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                        <path
                            d="M13 13 L6.5 6.5 L13 0 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                        <path
                            d="M6.5 6.5 L0 13 L13 13 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                        <path
                            d="M0 0 L0 13 L6.5 6.5 Z"
                            style={{
                                fill: 'none',
                                stroke: 'black',
                                strokeWidth: '1',
                                paddingRight: '10em',
                            }}
                        ></path>
                    </svg>
                    4 Cycles
                </div>
            </aside>
        </div>
    );
};

export async function getStaticProps() {
    const syjData = (await import('../data/data.json')).default;
    const doubleArrayData = (await import('../data/double_array.json')).default;

    return {
        props: {
            syj: syjData as Syj,
            doubleArray: doubleArrayData as number[][],
        },
    };
}

export default Home;
