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
      <form class="register" @submit.prevent="update">
        <label>User name</label>
        <input required v-model="username" type="text"/>
        <label>Password</label>
        <input required v-model="password" type="password"/>
        <hr/>
        <button type="submit">Update</button>
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
        this.username = this.profile.username
        this.password = this.profile.password
      },
      update: function () {
        const { username } = this
        alert(username)
        // this.$store.dispatch(REGISTER_REQUEST, { username, password }).then(() => {
        //  this.$router.push({path: ''})
        // })
      }
    }
  }
</script>
