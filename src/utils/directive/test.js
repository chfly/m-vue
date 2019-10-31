export default {
  focus: {
    bind (el, binding, vnode, oldVnode) {
      el.value = 'a'
    //   console.log('bind', { el, binding, vnode, oldVnode })
    },
    inserted (el, binding, vnode, oldVnode) {
    //   console.log('inserted', { el, binding, vnode, oldVnode })
      el.focus()
    },
    update (el, binding, vnode, oldVnode) {
    //   console.log('update', { el, binding, vnode, oldVnode })
    },
    componentUpdated (el, binding, vnode, oldVnode) {
    //   console.log('componentUpdated', { el, binding, vnode, oldVnode })
    },
    unbind (el, binding, vnode, oldVnode) {
    //   console.log('unbind', { el, binding, vnode, oldVnode })
    }
  },
  demo: {
    bind: function (el, binding, vnode) {
    //   var s = JSON.stringify
    //   el.innerHTML =
    //       'name: ' + s(binding.name) + '<br>' +
    //       'value: ' + s(binding.value) + '<br>' +
    //       'expression: ' + s(binding.expression) + '<br>' +
    //       'argument: ' + s(binding.arg) + '<br>' +
    //       'modifiers: ' + s(binding.modifiers) + '<br>' +
    //       'vnode keys: ' + Object.keys(vnode).join(', ')
    }
  },
  pin: {
    bind: function (el, binding, vnode) {
      el.style.position = 'fixed'
      el.style[binding.arg || 'top'] = binding.value + 'px'
      el.style.border = '1px red solid'
    }
  }
}
