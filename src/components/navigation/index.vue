<template>
  <div class="navigation">
    <ul>
      <li>
        <router-link class="brand" to="/">
          <img src="../../assets/logo.svg" width="40px"/><strong>Calmath</strong>
        </router-link>
      </li>
    </ul>
    <ul>
      <li v-if="isAuthenticated">
        <router-link to="/profile">{{name}}</router-link>
      </li>
      <li v-if="isAuthenticated" @click="logout">
        <span class="logout">Logout</span>
      </li>
      <li v-if="!isAuthenticated && !authLoading">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!isAuthenticated && !authLoading">
        <router-link to="/register">Register</router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  a {
    color: white;
    text-decoration: none;
  }
  .navigation {
    display: flex;
    color: white;
    align-items: center;
    background-color: #ffa035;
    padding: 5px;

    ul{
      display: flex;
      &:first-child{
        flex-grow: 1;
      }
      li {
        padding-right: 1em;
      }
    }
  }
  .brand {
    display: flex;
    align-items: center;

  }
  .logout {
    &:hover {
      cursor: pointer;
    }
  }

</style>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { AUTH_LOGOUT } from 'actions/auth'

  export default {
    name: 'navigation',
    methods: {
      logout: function () {
        this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/'))
      }
    },
    computed: {
      ...mapGetters(['getProfile', 'isAuthenticated']),
      ...mapState({
        authLoading: state => state.auth.status === 'loading',
        name: state => `${state.auth.profile.username}`,
      })
    },
  }
</script>
