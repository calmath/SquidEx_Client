<template>
  <div>
    <div class="headline">
      <h1>Your profile</h1>
    </div>
    <div v-if="!editting">
      <p>
        <strong>Name:</strong> {{profile.name}}<br/>
        <strong>Username:</strong> {{profile.username}}
      </p>
      <button type="edit" v-on:click="edit">Edit</button>
    </div>  
    <div v-if="editting">
      <form class="register" @submit.prevent="update">
        <label>Name</label>
        <input required v-model="name" type="text"/>
        <label>Username</label>
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
  import {UPDATE_REQUEST} from 'actions/auth'
  import { mapState } from 'vuex'

export default {
    name: 'account',
    data () {
      return {
        editting: false
      }
    },
    computed: mapState({
      token: state => state.init.squidexToken,
      profile: state => state.auth.profile
    }),
    methods: {
      edit: function () {
        this.editting = true
        this.id = this.profile.id
        this.username = this.profile.username
        this.name = this.profile.name
        this.password = 'Test3333'
      },
      update: function () {
        const { id, username, password, name, token } = this
        this.$store.dispatch(UPDATE_REQUEST, { id, username, password, name, token }).then(() => {
          this.editting = false
        })
      }
    }
  }
</script>
