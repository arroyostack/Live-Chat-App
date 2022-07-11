  <template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="display name"
      required
      v-model="displayName"
    />
    <input type="email" placeholder="email" required v-model="email" />
    <input type="password" placeholder="password" required v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Sign Up</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useSignup from "../composables/useSignup";

import useSound from "vue-use-sound";
import intro from "../assets/sounds/intro.mp3";

export default {
  //PROJECT BUILT IN COMPOSITION API
  setup(props, context) {
    //sounds
    const [play] = useSound(intro);
    //context provides an object with a number of methods. By declaring 'context' in the 'setup()' the 'emit method become available'

    const { error, signup } = useSignup();
    //refs. users signup info
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    //functions

    const handleSubmit = async () => {
      //fires 'signup' function with details from "form" and wait for result
      await signup(email.value, password.value, displayName.value);
      //after login is successful this component emit an event that eventualy will be use in the "wellcome" view to enter the chat
      play();
      context.emit("signup");
    };

    return { displayName, email, password, handleSubmit, error };
  },
};
</script>

<style lang="scss">
</style>