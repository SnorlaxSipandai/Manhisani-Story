<script setup>
import { ref } from 'vue';
import database from '../database/database.json'
import { useRouter } from 'vue-router';

const router = useRouter()

const status = ref('idle')

const usernameInput = ref('')
const userPassword = ref('')

const login = () => {
    if (usernameInput.value == database.user.ussername && userPassword.value == database.user.password) {
        status.value = 'loading'
        setTimeout(() => {
            status.value = 'login'
            setTimeout(() => {
                localStorage.setItem("user_token", "Manhisani1234");
                router.replace({ name: "Homepage" });
            }, 2500)
        }, 2000)
    } else {
        status.value = 'loading'
        setTimeout(() => {
            status.value = 'error'
            setTimeout(() => {
                status.value = 'idle'
            }, 2500);
        }, 2000);
    }

}

</script>


<template>

    <section>
        <div class="w-full h-screen bg-amber-500 bg-[url(../assets/images/4267109.jpg)] bg-center bg-cover">
            <div class="flex justify-center items-center h-screen">
                <div
                    class="gap- bg-[#E36A6A] w-120 h-135 rounded-[50px] shadow-2xl shadow-black flex items-center flex-col gap-8 pt-10 max-[530px]:rounded-[20px] max-[530px]:w-80 max-[530px]:h-100">
                    <div class="flex flex-col gap-5 max-[530px]:w-full max-[530px]:justify-start max-[530px]:pl-5">
                        <h1 class="text-white font-semibold text-[50px] font-montserrat max-[530px]:text-[20px]">Selamat Datang</h1>
                        <p class="text-white font-montserrat max-[530px]:text-[12px]">Silahkan login dulu yaww &#128522</p>
                    </div>
                    <div class="flex flex-col gap-5">
                        <input v-model="usernameInput" maxlength="15" type="text" placeholder="&#128100 Ussername"
                            class="px-5 w-100 h-20 rounded-[50px] bg-white max-[530px]:w-70 max-[530px]:h-15">
                        <input v-model="userPassword" maxlength="15" type="password" placeholder="&#128274 Password"
                            class="px-5 w-100 h-20 rounded-[50px] bg-white max-[530px]:w-70 max-[530px]:h-15">
                    </div>
                    <div>
                        <button @click="login"
                            class="text-[20px] font-montserrat bg-blue-500 text-white h-20 w-100 rounded-[20px] transition-all duration-400 hover:rounded-[50px] hover:bg-black hover:cursor-pointer max-[530px]:w-70 max-[530px]:h-15">LOGIN</button>
                    </div>
                </div>
            </div>

            <!-- loading -->
            <Transition enter-active-class="transition duration-500 ease-out"
                enter-from-class="-translate-y-full opacity-0" enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-300 ease-in" leave-from-class="translate-y-0 opacity-100"
                leave-to-class="-translate-y-full opacity-0">

                <div v-if="status == 'loading'" class="fixed top-5 left-0 right-0 flex justify-center z-50">
                    <div
                        class="bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 flex items-center space-x-3 w-80">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent">
                        </div>
                        <div>
                            <p class="font-bold text-gray-800">Tunggu sebentar yaww....</p>

                        </div>
                    </div>
                </div>
            </Transition>
            <!-- closing loading -->


            <!-- loading masuk -->
            <Transition enter-active-class="transition duration-500 ease-out"
                enter-from-class="-translate-y-full opacity-0" enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-300 ease-in" leave-from-class="translate-y-0 opacity-100"
                leave-to-class="-translate-y-full opacity-0">

                <div v-if="status == 'login'" class="fixed top-5 left-0 right-0 flex justify-center z-50">
                    <div
                        class="bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 flex items-center space-x-3 w-80">
                        <span class="text-2xl">✅</span>
                        <div>
                            <p class="font-bold text-gray-800">Berhasil!</p>
                            <p class="text-sm text-gray-600">Data Kamu Benar Yeayyy!!.</p>
                        </div>
                    </div>
                </div>
            </Transition>
            <!-- closing loading tutup -->

            <!-- loading error -->
            <Transition enter-active-class="transition duration-500 ease-out"
                enter-from-class="-translate-y-full opacity-0" enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-300 ease-in" leave-from-class="translate-y-0 opacity-100"
                leave-to-class="-translate-y-full opacity-0">

                <div v-if="status == 'error'" class="fixed top-5 left-0 right-0 flex justify-center z-50">
                    <div
                        class="bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 flex items-center space-x-3 w-80">
                        <span class="text-2xl">❌</span>
                        <div>
                            <p class="font-bold text-gray-800">Gagal!</p>
                            <p class="text-sm text-gray-600">Yaah Ussername dan Password kamu salah ☹️.</p>
                        </div>
                    </div>
                </div>
            </Transition>
            <!-- closing loading error -->
        </div>
    </section>

</template>
