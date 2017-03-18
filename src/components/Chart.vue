<template>
    <div id="app">
        <div class="title">
            快递寄件折线图
        </div>
        <div id="container" :style="{width:'100%',height:'600px'}"></div>
    </div>
</template>
<script>
import Highcharts from 'highcharts'

export default {
  name: 'app',
  beforeMount () {
  },
  mounted () {
    let dd = {}
    let da = {}
    let brandsel = 'asd'
    Highcharts.chart('container', {
      chart: {
        backgroundColor: '#0b557a'
      },
      credits: {
        enabled: false
      },
      title: {
        text: '11',
        style: {
          fontSize: '16px',
          color: '#0b557a'
        },
        align: 'left',
        x: 119
      },
      xAxis: {
        categories: dd,
        labels: {
          style: {
            fontSize: '13',
            color: '#fff'
          },
          step: 0.5,
          staggerLines: 1
        },
        tickLength: 0,
        lineWidth: 0,
        tickWidth: 0
      },
      yAxis: {
        title: {
          enabled: false
        },
        gridLineColor: '#1a78bd',
        gridLineWidth: 3,
        labels: {
          style: {
            fontSize: '13',
            color: '#fff'
          }
        },
        tickLength: 0,
        tickPixelInterval: 40
      },
      tooltip: {
        valueSuffix: '万'
      },
      legend: {
        enabled: false
      },
      series: [ {
        name: brandsel,
        data: da,
        color: '#fff'
      }]
    })
  }
}
</script>
<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
