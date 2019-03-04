<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Login</button>
    </form>
    <div>
      If you are not a member please <a href="/register">register</a>
    </div>
  </div>
</template>

<style>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>

<script>
  import {AUTH_REQUEST} from 'actions/auth'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'login',
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
      login: function () {
        const { username, password, token } = this
        this.$store.dispatch(AUTH_REQUEST, { username, password, token }).then(() => {
          this.$router.push({path: '/'})
        })
      }
    },
  }
</script>
