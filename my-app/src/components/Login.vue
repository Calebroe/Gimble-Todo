<template>
  <div id="authContainer">
    <section>
      <div id="authPanel">
        <input type="text" v-model="userEmail" placeholder="Enter your email" />
        <input
          type="password"
          v-model="userPassword"
          placeholder="Enter your password"
        />
        <div id="emailAuthActions">
          <button :disabled="!isInputValid" @click="registerAccount">
            Signup
          </button>
          <button :disabled="userEmail.length === 0" @click="resetPassword">
            Reset Password
          </button>
          <button :disabled="!isInputValid" @click="loginWithEmail">Login</button>
        </div>
        <div>
          <input id="verificationCheckbox" type="checkbox" v-model="verifyEmail" />
          <label for="verificationCheckbox">Send verification email</label>
        </div>
        <div id="socialAuthActions">
          <button @click="loginWithGoogle">Google</button>
          <button @click="loginWithGitHub">GitHub</button>
        </div>
      </div>
    </section>
    <span id="messageBox" v-show="authMessage.length > 0">{{ authMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const userEmail = ref("");
const userPassword = ref("");
const authMessage = ref("");
const verifyEmail = ref(false);
const auth = getAuth();
const router = useRouter();

const isInputValid = computed(
  () => userEmail.value.length > 0 && userPassword.value.length > 0
);

const displayMessage = (text: string) => {
  authMessage.value = text;
  setTimeout(() => {
    authMessage.value = "";
  }, 5000);
};

const registerAccount = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail.value,
      userPassword.value
    );
    if (verifyEmail.value) {
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      displayMessage(`An email verification has been sent to ${userCredential.user.email}`);
    } else {
      displayMessage(`New account created with UID ${userCredential.user.uid}`);
    }
  } catch (err) {
    if (err instanceof Error) {
      displayMessage(`Unable to create account: ${err.message}`);
    } else {
      displayMessage(`Unable to create account due to an unknown error`);
    }
  }
};

const resetPassword = async () => {
  try {
    await sendPasswordResetEmail(auth, userEmail.value);
    displayMessage(`A password reset link has been sent to ${userEmail.value}`);
  } catch (err) {
    if (err instanceof Error) {
      displayMessage(`Unable to reset password: ${err.message}`);
    } else {
      displayMessage(`Unable to reset password due to an unknown error`);
    }
  }
};

const loginWithEmail = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail.value,
      userPassword.value
    );
    if (userCredential.user.emailVerified) {
      router.push({ name: "home", params: { byWayOf: "Email" } });
    } else {
      displayMessage("You must first verify your email");
      await signOut(auth);
    }
  } catch (err) {
    if (err instanceof Error) {
      displayMessage(`Unable to login: ${err.message}`);
    } else {
      displayMessage(`Unable to login due to an unknown error`);
    }
  }
};

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push({ name: "home", params: { byWayOf: "Google" } });
  } catch (err) {
    if (err instanceof Error) {
      displayMessage(`Unable to login with Google: ${err.message}`);
    } else {
      displayMessage(`Unable to login with Google due to an unknown error`);
    }
  }
};

const loginWithGitHub = async () => {
  try {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
    router.push({ name: "home", params: { byWayOf: "GitHub" } });
  } catch (err) {
    if (err instanceof Error) {
      displayMessage(`Unable to login with GitHub: ${err.message}`);
    } else {
      displayMessage(`Unable to login with GitHub due to an unknown error`);
    }
  }
};
</script>

<style scoped>
#authContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-image: url('/images/login_img.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

#authPanel {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid hsl(0, 0%, 39%);
  padding: 2em;
  border-radius: 8px;
  width: 400px;
  height: 400px;
  background-color: hsl(210, 63%, 14%);
  box-shadow: 0px 4px 6px hsl(0, 0%, 0%);
}

section {
  margin-bottom: 1.5em;
}

#messageBox {
  font-size: 100%;
  font-style: italic;
  border-radius: 8px;
  background-color: hsl(0, 80%, 90%);
  padding: 0.5em 1em;
  border: 1px solid hsl(0, 50%, 80%);
  color: hsl(42, 100%, 33%);
}

#emailAuthActions,
#socialAuthActions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3em;
}

input {
  padding: 0.6em;
  border: 1px solid hsl(210, 20%, 85%);
  border-radius: 4px;
  margin-bottom: 1em;
  font-size: 1.25em;
  background-color: rgb(0, 0, 0);
}

button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  background-color: hsl(251, 54%, 38%);
  color: white;
  cursor: pointer;
  font-size: 1.25em;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: hsl(210, 20%, 80%);
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: hsl(243, 44%, 50%);
}

label {
  font-size: 1.5em;
  color: hsl(210, 40%, 40%);
}

input[type="checkbox"] {
  margin-right: 0.5em;
}
</style>

