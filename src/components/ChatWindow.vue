<template>
  <!-- this component shows updated messages in a chat window -->
  <div class="chat-window" ref="messages">
    <!-- an error will be displayed if there is one -->
    <div v-if="error">{{ error }}</div>
    <!-- if no errors the 'documents' array will be cycled through and each message will be outputed -->
    <div v-if="documents">
      <div
        v-for="doc in formattedDocuments"
        :key="doc.id"
        class="single"
      >
      
        <div class="box" >
          <div class="name" :class="[user.displayName == doc.name ? 'box-user' : 'box-peer']">
            {{ doc.name.slice(0, 2).toUpperCase() }}
          </div>
          <div class="body">
            <div>
              <p>{{ doc.message }}</p>
            </div>
            <div class="time">
              {{ doc.createdAt }}
            </div>
          </div>
          <div class="createdAt"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "@vue/runtime-core";
import getUser from "../composables/getUser";
import useSound from "vue-use-sound";
import newSound from "../assets/sounds/newSound.mp3";

export default {
  setup() {
    //sound ref
    const [play] = useSound(newSound);
    //refs
    const { user } = getUser();
    const { documents, error } = getCollection("messages");

    const formattedDocuments = computed(() => {
      //this function maps the documents array and changes the timestamp to a more suitable format (EX: created 3 days a go...)
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          //a new array is returned with a new 'createdAt' value
          return { ...doc, createdAt: time };
        });
      }
    });

    //auto-scroll to bottom

    const messages = ref(null);

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
      console.log(messages.value.scrollTop);
    });
    console.log(user);
    return { error, documents, formattedDocuments, user, messages };
  },
};
</script>

<style lang="scss">

.chat-window {

  //bg
  @include m-bg();
  height: 400px;
  overflow-y: scroll;
  padding: 30px 20px;

  .box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    justify-content: flex-start;

    @include phone {
      flex-direction: column;
    }
    margin: 1rem;
  }
   
  
  .name {
    @include frame4(50px, null, null, 1rem);
    @include radius();
    margin-top: 1.3rem;
    height: 5rem;
    max-width: 50px;
    font-weight: 600;
    color: $t-p;
  }

  

  .body {
    @include frame4(null, null, null, 1rem);
    @include m-bg();
    @include radius(null, 1rem, 1rem, 0, 1rem);
    margin-left: 1rem;
    color: $t-p;
    @include phone() {
      margin-top: 1rem;
      @include radius(null, 0, 1rem, 1rem, 1rem);
    }
  }

  .time {
    display: block;
    margin-top: .6rem;
    color: $t-s;
    font-size: 1.2rem;
  }

   .box-user {
      display: flex;

    background: $user;
  }
    .box-peer {
    background: $peer;
    
  }
}
</style>