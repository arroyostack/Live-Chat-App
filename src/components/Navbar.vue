<template>
  <!-- this component display a navbar at the top of chat room view. Email and user name are displayed and a logout button is available -->
  <nav v-if="user">
    <div>
      <p>
        Hey there <span>{{ user.displayName }}</span>
      </p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <button @click="handleClick">logout</button>
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import useSound from "vue-use-sound";
import outro from "../assets/sounds/outro.mp3";
export default {
  setup() {
    const [play] = useSound(outro);
    const { logout, error } = useLogout();
    const { user } = getUser();

    const handleClick = async () => {
      play()
      // this function fires the logout method defined in composable 'useLogout'. If successful it logs out the user from account
      await logout();
      if (!error.value) {
        console.log("user logged out");
        console.log("user state changed. Current user is", user);
        // console.log(user._delegate.email)
      }
    };

    return { handleClick, user };
  },
};
</script>

<style lang="scss">
nav {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include m-bg();
  // @include radius(0, 2rem,2rem,0,0);
  @include radius(null, 2rem, 2rem, null, null);

  span {
    color: $user-vivid;
  }
}

nav p {
  margin: 2px auto;
  font-size: 45px;
  color: $t-p;
  font-weight: bold;
}

nav p.email {
  font-size: 14px;
  color: $t-s;
}
</style>