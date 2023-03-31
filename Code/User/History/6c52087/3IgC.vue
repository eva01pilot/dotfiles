<script setup lang="ts">
import Highcharts, {Options, XrangePointOptionsObject, StockChart} from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import { onMounted, ref } from 'vue';
const chartRef = ref(null!)
stockInit(Highcharts)
const chartOptions:Options = {
    series: [
        {
            name: 'Sales',
            type: 'area',
            data: [120, 50, 160 ]
        }
    ],
    chart: {
       margin: 0,
    },
    plotOptions: {
    area: {
      pointStart: 1000,
      marker: {
        symbol: 'circle',
        radius: 2,
        states: {
          hover: {
            enabled: true
          }
        }
      }
    }
  },
}
onMounted(()=>{
    const chart = Highcharts.chart('SalesChart', chartOptions)
    window.dispatchEvent(new Event('resize'));

})
const stocktype:any = 'stockChart'
</script>

<template>
<div id='SalesChart' :options="chartOptions" ></div>

</template>