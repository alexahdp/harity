<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-4">
        <h3>Sign In</h3>
        <form
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
  </div>
</template>

<script>
export default {
  name: 'SignInForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('auth/signIn', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>

</style>
