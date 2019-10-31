export default {
  name: 'hello',
  props: {
    value: {
      type: String,
      default: 'mixin'
    }
  },
  data () {
    return {
      localValue: 'data-mixin'
    }
  },
  computed: {
    computedValue () {
      return 'computedValue-mixin'
    },
    testC: {
      set (value) {
        this.localValue = value
        console.log('mixin-computed-testC-set', value)
      },
      get () {
        console.log('mixin-computed-testC-get', this.localValue)
        return this.localValue
      }
    }
  },
  watch: {
    localValue (value) {
      console.log('mixin-watch-localValue', value)
    }
  },
  created () {
    console.log('mixin ceated')
  },
  mounted () {
    console.log('mixin mouted')
  },
  destroyed () {
    console.log('mixin destroyed')
  },
  methods: {
    fn () {
      console.log('mixin method fn')
    }
  }
}
