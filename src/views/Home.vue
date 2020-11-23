<template>
  <div class="home">
    {{ apiData }}
    <div class="wrapChart">
      <mychart :chartdata="this.cData" :options='this.cOptions'></mychart>
    </div>
    <div class="wrapChart">
      <!-- <pieChart :chartdata="this.pieData" :options='this.cOptions'></pieChart> -->
    </div>
    <div class="wrapChart">
      <highChart></highChart>
    </div>
  </div>
</template>

<script>
import mychart from '../components/Chart'
// import pieChart from '../components/Pie'
import highChart from '../components/HighChart'

export default {
  data () {
    return {
      timer: {},
      apiData: '',
      cData: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f8f8f8',
            data: []
          }
        ]
      },
      cOptions: { // option 類似圖表的 config 檔，可以在此客製圖表樣式及其他細節
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 100 // 設定 y 軸的數字級距
              }
            }
          ]
        }
      },
      pieData: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [{
          data: [
            30, 20, 10, 20, 20
          ],
          backgroundColor: [
            '#E61149', '#E69600', '#E6DE07', '#3CBD6D', '#1AABDB'
          ],
          label: 'Data One'
        }]
      }
    }
  },
  components: {
    mychart,
    // pieChart,
    highChart
  },
  created () {
    // 資料
    const self = this
    this.axios.get('/api')
      .then((response) => {
        // 數據 y
        self.cData.datasets[0].data = response.data.LIVE.AWS02M102.AMP
        // 時間 x
        self.cData.labels = response.data.LIVE.AWS02M102.Datetime

        console.log(self.cData.labels)
        console.log(self.cData.datasets[0].data)
        self.apiData = response.data
        // this.renderLineChart()
      })

    this.timer = setInterval(async () => {
      // this.cData.datasets[0].data.splice(0, 1)
      // console.log(this.cData.datasets[0].data)
      const self = this
      await this.axios.get('/api')
        .then((response) => {
          // console.log(response)
          self.apiData = response.data

          // 數據 y
          self.cData.datasets[0].data = response.data.LIVE.AWS02M102.AMP
          // 時間 x
          self.cData.labels = response.data.LIVE.AWS02M102.Datetime
          console.log(self.cData.labels)
          console.log(self.cData.datasets[0].data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, 5000)
  },
  methods: {
    getData () {
      setInterval(() => {
        this.$axios({
          methods: 'get',
          url: 'https://data.wra.gov.tw/Service/OpenData.aspx?format=json&id=2D09DB8B-6A1B-485E-88B5-923A462F475C'
        })
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.log(error)
          })
      }, 5000)
    },
    renderLineChart () {
      this.renderChart(this.cData, this.cOptions) // 官方文件 api 提供的 renderChart() 方法，一定需要這兩個參數
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    cData () {
      this.$data._chart.update()
    },
    deep: true
  }
}
</script>

<style>
.wrapChart {
  width: 90%;
  height: 500px;
}
</style>
