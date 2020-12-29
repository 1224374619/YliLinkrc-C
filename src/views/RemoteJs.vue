<template>
  <remote-js :jssrc="src" :finish="loadfinish"/>
</template>
<script>
export default {
  components: {
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.jssrc }, on: {
          load: this.finish
        }
        })
      },
      props: {
        jssrc: { type: String, required: true },
        finish: { type: Function, required: true }
      }
    }
  },
  props: {
    src: { type: String, required: true },
    loadfinish: { type: Function, required: false, default: function() {
      // console.log('')
    } }
  }
}
</script>
