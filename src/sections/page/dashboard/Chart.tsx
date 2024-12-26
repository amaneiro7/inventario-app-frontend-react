import { useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export function Chart() {
    useEffect(() => {
        const root = am5.Root.new("chartdiv");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.horizontalLayout
            })
        );

        // Define data
        const data = [{
            category: "Computadoras",
            quantity: 742
        }, {
            category: "Laptops",
            quantity: 57
        }, {
            category: "All in One",
            quantity: 110
        }, {
            category: "Servidores",
            quantity: 1

        }];

        // Create series
        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Equipos de computacion",
                categoryField: "category",
                valueField: "quantity",
            })
        );
        series.data.setAll(data);

        // const series2 = chart.series.push(
        //     am5xy.ColumnSeries.new(root, {
        //         name: "Series",
        //         xAxis: xAxis,
        //         yAxis: yAxis,
        //         valueYField: "value2",
        //         categoryXField: "category"
        //     })
        // );
        // series2.data.setAll(data);

        // Add legend
        const legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(75),
            centerY: am5.percent(35),
            y: am5.percent(35),
            layout: root.verticalLayout
        }));
        legend.data.setAll(series.dataItems);


        return () => {
            root.dispose();
        };
    }, []);

    return <div id='chartdiv' style={{ width: '65%', height: "400px" }} />
}