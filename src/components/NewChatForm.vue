<template>
  <!-- this component allows user to type and send a message -->
  <div class="wrapper">
    <form>
      <textarea
        @keydown="keyboardSound"
        ref="userText"
        placeholder="Type a message and hit enter to send..."
        v-model="message"
        @keypress.enter.prevent="handleSubmit"
      ></textarea>
      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getUser from "../composables/getUser";
import { timestamp } from "@/firebase/config";
import useCollection from "../composables/useCollection";
import useSound from "vue-use-sound";
import soft from "../assets/sounds/soft.mp3";
import sent from "../assets/sounds/sent.mp3";
export default {
  setup() {
    //sound ref
    const [play] = useSound(soft);
    const [send] = useSound(sent);
    //refs
    const userText = ref(null);
    const message = ref("");
    //user from composable
    const { user } = getUser();
    //useCollection composable provides a method to add document to database and takes the name of collection as an argument
    const { error, addDoc } = useCollection("messages");

    //functions
    const keyboardSound = () => {
      play();
    };
    const handleSubmit = async () => {
      send()
      //here a new chat object is created and lately stored in Firebase database
      //the chat object contains three properties / Message / Author of message / Timestamp

      const chat = {
        //user display name from getUser composable
        name: user.value.displayName,
        //this property inherit value form 'message' ref variable
        message: message.value,
        //firebase timestamp method
        createdAt: timestamp(),
      };

      userText.value.classList.value = ["invisible"];

      //adds chat object to database
      await addDoc(chat);
      //once the form is submitted 'message' ref variable is cleared
      if (!error.value) {
        message.value = "";
        userText.value.classList.remove("invisible");
      }
    };

    return { message, handleSubmit, error, userText, play, keyboardSound };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  @include m-bg();
  @include radius(null, 0, 0, 1.5rem, 2rem);
}
form {
  @include frame4(null, 9rem, 1rem, null);
  @include radius();
}

textarea {
  @include frame4(100%, null, null, 1rem);
  @include radius();
  // reset textarea
  box-sizing: border-box;
  border: 0;
  font-size: 2.2rem;
  font-family: inherit;
  outline: none;
  background: rgba(255, 255, 255, 0);
  color: $t-p;
}

.invisible {
  opacity: 0;
}
</style>