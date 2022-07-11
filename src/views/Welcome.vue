<template>
  <!-- WELCOME//In This WIEW the user has the option of either loging or register into the chat -->

  <div class="welcome">
    <!-- user submit iformation to create a new user -->
    <!-- both "if" and "else" depend on the ref property  "showLogin" that is tooggle in both instances spans  -->
    <div v-if="showLogin" class="wrapper">
      <h1>Welcome</h1>
      <h2>Login</h2>
      <!-- 'the 'login' event is emited from 'LoginForm' if login is successful. It fires a function that redirect user to 'ChatRoom' component -->
      <LoginForm @login="enterChat" />
      <p>
        No Account Yet? <span @click="showLogin = false">Signup</span> instead
      </p>
    </div>
    <div v-else class="wrapper">
      <h2>SignUp</h2>
      <!-- 'the 'signup' event is emited from 'SignUpForm' if signup is successfull. It fires a function that redirect user to 'ChatRoom' component'-->
      <SignUpForm @signup="enterChat" />
      <p>Aready registered? <span @click="showLogin = true">Login</span></p>
    </div>
  </div>
</template>

<script>
import SignUpForm from "../components/SignUpForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  components: { SignUpForm, LoginForm },
  //composition API
  setup() {
    const showLogin = ref(true);
    const router = useRouter();

    const enterChat = () => {
      console.log("chat entered");
      //user is redirected to ChatRoom
      router.push({ name: "ChatRoom" });
    };

    return { showLogin, enterChat };
  },
};
</script>

<style lang="scss">
.welcome {
  @include flex(flex, center, null, null);
  height: 100vh;
  text-align: center;
  color: $t-p;
  padding-top: 10rem;


  .wrapper {
    @include frame4(70%, 70%, null, 3rem);
    @include m-bg();
    border-radius: 15px;
  }

  label {
    margin: 20px 0 10px;
  }

  /* form styles */
  form {
    @include frame4($m: 2rem auto);
  }

  input {
    @include frame4(40%, null, 0.4em auto, 1rem);
    @include radius();
    @include m-bg();
    outline: none;
    color: $t-p;
    border: 2px solid $second;
    display: block;
    margin-bottom: 1rem;
    // media queries
  }

  span {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }

  button {
    margin: 20px auto;
  }
}
</style>