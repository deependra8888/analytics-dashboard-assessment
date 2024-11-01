/* eslint-disable react/prop-types */
import { Pie } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

const PlotMaps = {};

export default function VehicleModelDistribution({ data }) {
    const [config, setConfig] = useState();

    useEffect(() => {
        if (data) {
            let makeCount = {};
            for (let item of data) {
                const make = item.Make;
                if (makeCount[make]) {
                    makeCount[make]++;
                } else {
                    makeCount[make] = 1;
                }
            }
            const result = Object.keys(makeCount).map((make, index) => ({
                index,
                type: make,
                count: makeCount[make],
            }));

            // console.log(result);

            setConfig({
                data: result,
                angleField: 'count',
                colorField: 'type',
                label: {
                    text: (data) => {
                        if (data.count > 1200) {
                            return `${data.type}`;
                        } else {
                            return ' ';
                        }
                    },
                    // position: '',
                    style: {
                        fontWeight: 'bold',
                        fontSize: 14,
                    },
                },
                legend: {
                    color: {
                        title: false,
                        position: 'bottom',
                        rowPadding: 5,
                    },
                },
                tooltip: {
                    title: 'type',
                },
                interaction: {
                    elementHighlight: true,
                },
                state: {
                    inactive: { opacity: 0.5 },
                },
            });
        }
    }, [data]);

    return (
        <>
            {config && (
                <Pie
                    {...config}
                    onReady={(plot) => {
                        PlotMaps.leftPie = plot;
                        plot.chart.on('interval:pointerover', (evt) => {
                            showTooltip(evt, 'leftPie');
                        });
                        plot.chart.on('interval:pointerout', (evt) => {
                            hideTooltip(evt, 'leftPie');
                        });
                        plot.chart.on('legend:filter', (e) => {
                            const { nativeEvent, data } = e;
                            if (!nativeEvent) return;
                            // console.log(data);
                        });
                    }}
                />
            )}
        </>
    );
}

const showTooltip = (evt, pie) => {
    Object.keys(PlotMaps).forEach((plot) => {
        if (plot !== pie) {
            PlotMaps[plot].chart.emit('tooltip:show', {
                data: { data: { area: evt.data.data.area } },
            });
            PlotMaps[plot].chart.emit('element:highlight', {
                data: { data: { area: evt.data.data.area } },
            });
        }
    });
};

const hideTooltip = (evt, pie) => {
    Object.keys(PlotMaps).forEach((plot) => {
        if (plot !== pie) {
            PlotMaps[plot].chart.emit('tooltip:hide', {
                data: { data: { area: evt.data.data.area } },
            });
            PlotMaps[plot].chart.emit('element:unhighlight', {
                data: { data: { area: evt.data.data.area } },
            });
        }
    });
};
