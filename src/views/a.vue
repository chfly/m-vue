<script>
export default {
  name: 'about',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    console.log(this.$slots, '$slots')
    console.log(this.$scopedSlots, '$scopedSlots')
    // console.log(this.$scopedSlots.head(), '$scopedSlots-default')
  },
  render (h, vm) {
    console.log('h,vm', h, vm)
    return (
      <ul>
        {this.data.map(item => (
          <li>
            {this.$slots.default}
          </li>
        ))}
      </ul>
    )
    // this.$scopedSlots.default是一个函数，通过传入参数可以将参数传送给作用域对象
  },
  destroyed () {},
  methods () {}
}
</script>
