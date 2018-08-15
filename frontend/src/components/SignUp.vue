<template>
  <div class="container">
    <div class="col-md-4">
      <h3>Sign Up</h3>
      <form
        :user="user"
        v-on:submit.prevent="onSubmit()"
      >
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="email"
            v-model="email"
          />
          <input
            type="password"
            class="form-control"
            placeholder="password"
            v-model="password"
          />
          <input
            type="submit"
            class="form-control"
            value="sign in"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('signUp', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
</style>
