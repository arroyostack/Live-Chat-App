<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="email" required v-model="email" />
      <input
        type="password"
        placeholder="password"
        required
        v-model="password"
      />
      <div class="error">{{ error }}</div>
      <button>Log In</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useLogin from "../composables/useLogin";

import useSound from "vue-use-sound";
import intro from "../assets/sounds/intro.mp3";


export default {
  //PROJECT BUILT IN COMPOSITION API
  //context provides an object with a number of methods. By declaring 'context' in the 'setup()' the 'emit method become available'
  setup(props, context) {
    //sounds
    const [play] = useSound(intro);
    
    //refs. users signup info
    const email = ref("");
    const password = ref("");

    //imports "error" ref and "login" function from "useLogin" composable
    const { error, login } = useLogin();

    //functions

    const handleSubmit = async () => {
      //"login" function is invoked at click event, passing 'email' and 'password' ref variables as arguments
      //if success the user will be logged in and user data will be available
      await login(email.value, password.value);
      if (!error.value) {
        console.log("User Logged in");
        //after login is successful this component emit an event that eventualy will be use in the "wellcome" view to enter the chat
        play()
        context.emit("login");
      } else {
        console.log(error.value);
        console.log(email.value, password.value);
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style lang="scss">
</style>