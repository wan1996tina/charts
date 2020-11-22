<template>
  <div class="home">
    <!-- {{apiData}} -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      apiData: ''
    }
  },
  created () {
    const self = this
    this.axios.get('/api')
      .then((response) => {
        console.log(response)
        self.apiData = response.data
      })
  }
}
</script>
