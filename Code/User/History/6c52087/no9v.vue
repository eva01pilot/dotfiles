<script setup lang="ts">
import Highcharts, {Options, XrangePointOptionsObject} from 'highcharts'
import stockInit from 'highcharts/modules/stock'

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
const stocktype:any = 'stockChart'
</script>

<template>
<highcharts :options="chartOptions" />

</template>