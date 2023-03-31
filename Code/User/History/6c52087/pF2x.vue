<script setup lang="ts">
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'

stockInit(Highcharts)
const chartOptions:any = {
        series: [
          {
            data: [1, 2, 3]
          }
        ]
}
</script>

<template>
<highcharts :constructor-type="'stockChart'" :options="chartOptions as any"></highcharts>

</template>