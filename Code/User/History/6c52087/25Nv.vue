<script setup lang="ts">
import Highcharts, {Options, XrangePointOptionsObject, StockChart} from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import { onMounted, ref } from 'vue';
const chartRef = ref(null!)
stockInit(Highcharts)
const chartOptions:Options = {
    title: {
        text: 'Sales'
    },
    series: [
        {
            name: 'Sales',
            type: 'area',
            data: [
      null, null, null, null, null, 2, 9, 13, 50, 170, 299, 438, 841,
      1169, 1703, 2422, 3692, 5543, 7345, 12298, 18638, 22229, 25540,
      28133, 29463, 31139, 31175, 31255, 29561, 27552, 26008, 25830,
      26516, 27835, 28537, 27519, 25914, 25542, 24418, 24138, 24104,
      23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205, 22217,
      21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
      10685, 10577, 10526, 10457, 10027, 8570, 8360, 7853, 5709, 5273,
      5113, 5066, 4897, 4881, 4804, 4717, 4571, 4018, 3822, 3785, 3805,
      3750, 3708, 3708
    ]
        }
    ],
    chart: {
       margin: 0,
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