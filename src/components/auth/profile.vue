<template>
  <div>
    <div class="headline">
      <h1>Your profile</h1>
    </div>
    <div v-if="!editting">
      <p v-if="profile.username">
        <strong>Username:</strong> {{profile.username}}
      </p>
      <button type="edit" v-on:click="edit">Edit</button>
    </div>  
    <div v-if="editting">
      <form class="register" @submit.prevent="register">
        <label>User name</label>
        <input required v-model="username" type="text" placeholder="Snoopy"/>
        <label>Password</label>
        <input required v-model="password" type="password" placeholder="Password"/>
        <hr/>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .headline{
    margin-top: 1em;
    display: flex;
    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }
  }
  
  .register {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>

<script>
  import { mapState } from 'vuex'

export default {
    name: 'account',
    data () {
      return {
        editting: false
      }
    },
    computed: mapState({profile: state => state.auth.profile}),
    methods: {
      edit: function () {
        this.editting = true
      },
      update: function () {
        // const { username, password } = this
        // this.$store.dispatch(REGISTER_REQUEST, { username, password }).then(() => {
        //  this.$router.push({path: ''})
        // })
      }
    }
  }
</script>
