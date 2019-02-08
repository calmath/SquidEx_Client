<template>
  <!-- New Nav -->
  <header>
    <nav id="page-nav">
      <!-- [THE HAMBURGER] -->
      <label for="hamburger">&#9776;</label>
      <input type="checkbox" id="hamburger"/>

      <!-- [MENU ITEMS] -->
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/map/">Map</router-link></li>
        <li><router-link to="/feed/">Feed</router-link></li>
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
    </nav>
  </header>
</template>

<style lang="scss" scoped>
/* [MENU] */
#page-nav {
  background: #000;
}
#page-nav label, #page-nav ul, #page-nav li {
  display: inline-block;
}

/* [HAMBURGER - HIDDEN ON BIG SCREENS] */
#page-nav label, #hamburger {
  display: none;
}
#page-nav label {
  color: #fff;
  background: #a02620;
  font-style: normal;
  font-size: 1.2em;
  padding: 10px;
}

/* [MENU ITEMS] */
#page-nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0; 
}
#page-nav ul li {
  padding: 10px;
  box-sizing: border-box;
}
#page-nav ul li a {
  color: #fff;
  text-decoration: none;
}

/* [ON SMALL SCREENS] */
@media screen and (max-width: 768px){
  /* [SHOW HAMBURGER] */
  #page-nav label {
    display: inline-block;
  }

  /* [BREAK DOWN MENU INTO VERTICAL] */
  #page-nav ul li {
    display: block;
  }
  #page-nav ul li {
    border-top: 1px solid #333;
  }

  /* [SHOW/HIDE MENU ON CHECKBOX CLICK] */
  #page-nav ul {
    display: none;
  }
  #page-nav input:checked ~ ul {
    display: block;
  }
}
/*
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
      align-items: center;
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
*/
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
        name: state => `${state.auth.profile.name}`,
      })
    },
  }
</script>
