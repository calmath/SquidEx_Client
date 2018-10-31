<template>
  <div>
    <form class="register" @submit.prevent="register">
      <h1>Register</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style>
  .register {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>

<script>
  import {REGISTER_REQUEST} from 'actions/auth'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'register',
    data () {
      return {
        username: 'Test3',
        password: 'Test3333',
      }
    },
    computed: {
      ...mapGetters(['getSquidexToken', 'isTokenLoaded']),
      ...mapState({
        token: state => state.init.squidexToken,
      }),
    },
    methods: {
      register: function () {
        const { username, password, token } = this
        this.$store.dispatch(REGISTER_REQUEST, { username, password, token }).then(() => {
          this.$router.push({path: '/'})
        })
      }
    },
  }
</script>
