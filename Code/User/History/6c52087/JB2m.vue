<script setup lang="ts">
import Highcharts, {Options, XrangePointOptionsObject, StockChart} from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import { ref } from 'vue';
const chartRef = ref(null!)
stockInit(Highcharts)
const chartOptions:Options = {
    series: [
        {
            name: 'Sales',
            type: 'line',
            data: [1, 2, 3 ]
        }
    ]
}
const chart = Highcharts.chart('SalesChart', chartOptions)
const stocktype:any = 'stockChart'
</script>

<template>
<div id='SalesChart' :options="chartOptions" ></div>

</template>