<template>
  <button @click="send('TOGGLE')">
    {{ current.matches('inactive') ? 'Off' : 'On' }}
  </button>
</template>

<script>
import { Machine, interpret } from 'xstate'

// Define machine externally
const toggleMachine = Machine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
})

export default {
  name: 'Toggle',
  data() {
    return {
      // Interpret machine and store it in data
      toggleService: interpret(toggleMachine),

      // Start with machine's initial state
      current: toggleMachine.initialState
    }
  },
  created() {
    // Start service on component creation
    this.toggleService
      .onTransition(state => {
        this.current = state
      })
      .start()
  },
  methods: {
    // Send events to the service
    send(event) {
      this.toggleService.send(event)
    }
  }
}
</script>
