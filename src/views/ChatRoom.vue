<template>
  <div class="container">
      <Navbar />
      <ChatWindow />
      <NewChatForm />
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import Navbar from "../components/Navbar.vue";
import { watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import NewChatForm from "../components/NewChatForm.vue";
import ChatWindow from "../components/ChatWindow.vue";
export default {
  components: { Navbar, NewChatForm, ChatWindow },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  // @include frame4(90%);
  height: 100vh;
  padding-top: 8rem;
  margin: 0 auto;
  width: 80%;
  @include phone() {
   width: 95%; 
   padding-top: 3rem;  
  }
  
}
</style>
