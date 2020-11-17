<template>
  <div>


    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>

import Example from './example.vue'
export default {
  name: 'home',
  components: {
    Example
  },
  data () {
    return {
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
