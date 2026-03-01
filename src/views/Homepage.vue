<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AOS from "aos";
import "aos/dist/aos.css";
import dataGambar from "../database/gambar.json";

const router = useRouter();
const audio = ref(null);
const playing = ref(false);
const openLove = ref(false);
const videoPlayer = ref(null);
const tVideo = ref(false);
const gambarPilihan = ref("lamaran");
const hamburger = ref(false);
const touch = ref(false);
const audioMobile = ref(null)
const videoMobile = ref(null)

const logout = () => {
  localStorage.removeItem("user_token");
  localStorage.clear();
  router.replace({ name: "Login" });
};

const toggle = () => {
  playing.value ? audio.value.pause() : audio.value.play();
  playing.value = !playing.value;
};

onMounted(() => {
  AOS.init({
    duration: 900, // Kecepatan animasi dalam milidetik (1000 = 1 detik)
    easing: "ease-in-out", // Jenis irama animasi
    once: true, // Animasi hanya berjalan sekali saat di-scroll
  });
});

const onopenLove = () => {
  openLove.value = !openLove.value;
  openLove.value ? audio.value.play() : audio.value.pause();
  tVideo.value = false;
  setTimeout(() => {
    tVideo.value = true;
    videoPlayer.value = videoPlayer.value.play();
  }, 21000);
};

const selectedImage = ref(null);

const openLightbox = (url) => {
  selectedImage.value = url;
};

const closeLightbox = () => {
  selectedImage.value = null;
};

const onHamburger = () => {
  hamburger.value = !hamburger.value;
};

const onTouch = () => {
  touch.value = !touch.value;
};

const startAudio = async () => {
  if (!audioMobile.value) return
  if (!videoMobile.value) return

  try {
    await audioMobile.value.play()
    setTimeout(()=>{
    videoMobile.value.play()
    },20000)
  } catch (err) {
    console.log('Autoplay diblokir:', err)
  }
}
</script>

<template>
  <!-- dekstop view -->
  <div class="max-md:hidden">
    <audio
      ref="audio"
      src="/music/Indila - Love Story Slowed  Short & Lyric & Instrumental & Music.mp3"
      loop
    ></audio>
    <!-- navbar -->
    <nav>
      <div
        id="#"
        class="px-20 border-t-0 h-15 fixed top-0 left-0 w-full z-50 px-8 py-4 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg flex justify-between items-center"
      >
        <div>
          <h1 class="text-[30px] font-ballet font-semibold">
            <a href="#">Manhisani</a>
          </h1>
        </div>

        <img
          @click="toggle"
          :src="playing ? '/pause-button.png' : '/speaker-active.png'"
          class="w-5 cursor-pointer"
        />
        <!-- <img v-show="true" src="/public/pause-button.png" class="w-8"> -->

        <div class="flex justify-between w-200 font-lexend">
          <a class="group relative" href="#tentang-kami">
            <span>Tentang Kami</span>
            <span
              class="absolute left-1/2 bottom-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 -translate-x-1/2 group-hover:w-full"
            ></span>
          </a>
          <a class="group relative" href="#galeri">
            <span>Galeri</span>
            <span
              class="absolute left-1/2 bottom-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 -translate-x-1/2 group-hover:w-full"
            ></span>
          </a>
          <a class="group relative" href="#sosial-media">
            <span>Sosial Media</span>
            <span
              class="absolute left-1/2 bottom-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 -translate-x-1/2 group-hover:w-full"
            ></span>
          </a>
        </div>
        <img
          @click="logout"
          src="/log-out.png"
          class="w-5 hover:cursor-pointer"
        />
      </div>
    </nav>
    <!-- closing navbar -->

    <!-- main content -->
    <div
      data-aos="zoom-in"
      id="#"
      class="relative h-screen w-full bg-[url(../assets/images/bg-main.webp)] bg-cover bg-[center_top_40%]"
    ></div>
    <!-- closing main content-->

    <section>
      <!-- tentang kami -->
      <div id="tentang-kami" class="h-screen w-full relative overflow-x-hidden">
        <video
          :class="tVideo ? 'opacity-0' : 'opacity-100'"
          autoplay
          muted
          loop
          playsinline
          class="absolute top-0 left-0 w-full h-full object-cover z-50 mix-blend-screen pointer-events-none transition-all duration-500 ease-out"
        >
          <source
            src="../assets/videos/Falling cherry blossom petals..mp4"
            type="video/mp4"
          />
        </video>
        <video
          :class="tVideo ? 'opacity-100' : 'opacity-0'"
          ref="videoPlayer"
          muted
          loop
          playsinline
          class="absolute top-0 left-0 w-full h-full object-cover z-50 mix-blend-screen pointer-events-none transition-all duration-500 ease-out"
        >
          <source
            src="../assets/videos/Free Stock Footage   Flying Butterflies Background Black - name 0 (1080p, h264).mp4"
            type="video/mp4"
          />
        </video>
        <!-- <button v-show="!openTiara"
        class="absolute bg-black h-20 w-50 text-white top-50 left-220 font-lexend text-[30px] rounded-2xl cursor-pointer z-50 transition-all duration-500 hover:bg-white hover:text-black"
        @mouseenter="onopenIman" @mouseleave="onopenIman">Sulaiman</button>
      <button v-show="!openIman"
        class="absolute bg-black h-20 w-80 text-white top-150 left-205 font-lexend text-[30px] rounded-2xl cursor-pointer z-50 transition-all duration-500 hover:bg-white hover:text-black"
        @mouseenter="onopenTiara" @mouseleave="onopenTiara">Tiara Putri Mahisani</button> -->
        <img
          src="../assets/images/love-1.png"
          class="z-0 absolute w-100 left-189 top-60 500 transition-all duration-300 hover:scale-125 hover:cursor-pointer"
          @mouseenter="onopenLove"
          @mouseleave="onopenLove"
        />
        <h1
          class="pointer-events-none absolute text-white left-208 top-90 font-ballet z-60 transition-opacity duration-500 ease-out text-[50px]"
          :class="openLove ? 'opacity-100' : 'opacity-0'"
        >
          Sulaiman
        </h1>
        <h1
          class="pointer-events-none absolute text-white left-235 top-115 text-[50px] font-ballet z-60 transition-opacity duration-500 ease-out"
          :class="openLove ? 'opacity-100' : 'opacity-0'"
        >
          Tiara
        </h1>
        <div>
          <img
            src="/iman.webp"
            class="absolute h-screen transition-transform duration-500 ease-out shadow-2xl shadow-blue-500"
            :class="openLove ? 'translate-0' : '-translate-x-full'"
          />
          <img
            src="/tiara.webp"
            class="absolute h-screen right-0 transition-transform duration-500 ease-out shadow-2xl shadow-pink-500"
            :class="openLove ? 'translate-0' : 'translate-x-full'"
          />
        </div>
      </div>
    </section>
    <!-- closing tentang kami -->

    <!-- galeri -->
    <section>
      <div id="galeri" class="p-6 bg-gray-50 min-h-screen pt-30">
        <div class="flex justify-between items-center pl-230">
          <h2 class="text-6xl font-bold text-center mb-8 font-ballet">
            {{ gambarPilihan }}
          </h2>
          <select class="font-lexend scale-120" v-model="gambarPilihan">
            <option disabled value="">Pilih Gambar</option>
            <option value="lamaran">Lamaran</option>
            <option value="jalan-jalan">Jalan-jalan</option>
            <option value="sulaiman">Sulaiman</option>
            <option value="tiara">Tiara</option>
          </select>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            data-aos="fade-up"
            v-for="photo in dataGambar[gambarPilihan]"
            :key="photo.id"
            class="shadow-lg shadow-black group relative overflow-hidden rounded-xl cursor-pointer bg-gray-200"
            @click="openLightbox(photo.url)"
          >
            <img
              :src="photo.url"
              :alt="photo.title"
              class="w-full h-90 object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />

            <div
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <span class="text-white font-medium text-lg">{{
                photo.title
              }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="selectedImage"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-all"
          @click="closeLightbox"
        >
          <button class="absolute top-5 right-5 text-white text-4xl">
            &times;
          </button>
          <img
            :src="selectedImage"
            class="max-w-full max-h-full rounded shadow-2xl transition-transform duration-300"
          />
        </div>
      </div>
    </section>
    <!-- closing galeri -->

    <!-- sosial media -->
    <div id="sosial-media" class="h-screen w-full relative">
      <video
        data-aos="fade-up"
        autoplay
        muted
        loop
        playsinline
        class="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="../assets/videos/bg-end.mp4" type="video/mp4" />
      </video>
      <!-- footer -->
      <footer
        data-aos="fade-up"
        class="bg-gray-900 text-white py-12 absolute bottom-0 w-full"
      >
        <div
          class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div>
            <h2 class="text-2xl font-bold mb-4 text-blue-400">Quotes</h2>
            <p class="text-gray-400 leading-relaxed text-justify">
              "Mencintaimu adalah seni memahami hidup. Bukan sekadar perasaan
              romantis, tapi kekuatan yang menggerakkan kita untuk saling
              memberi, tumbuh, dan menikmati keindahan dunia bersama-sama. Kamu
              adalah puisi terindah yang tertulis dalam buku hatiku, mimpi yang
              tak pernah ingin kutinggalkan."
            </p>
          </div>

          <div class="md:ml-auto">
            <h3
              class="text-lg font-semibold mb-4 border-b-2 border-blue-500 w-fit"
            >
              Navigasi
            </h3>
            <ul class="space-y-2 text-gray-400">
              <li>
                <a href="#" class="hover:text-white transition-colors"
                  >Beranda</a
                >
              </li>
              <li>
                <a
                  href="#tentang-kami"
                  class="hover:text-white transition-colors"
                  >Tentang Kami</a
                >
              </li>
              <li>
                <a href="#galeri" class="hover:text-white transition-colors"
                  >Galeri</a
                >
              </li>
              <li>
                <a
                  href="#sosial-media"
                  class="hover:text-white transition-colors"
                  >Sosial Media</a
                >
              </li>
            </ul>
          </div>

          <div class="md:ml-auto flex justify-center flex-col items-center">
            <h3 class="text-lg font-semibold mb-4">Ikuti Kami</h3>
            <div class="flex space-x-4">
              <a
                href="#"
                class="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition"
              >
                <img src="/ig.png" class="object-cover w-5" />
              </a>
            </div>
          </div>
        </div>

        <div
          class="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm"
        >
          &copy; Manhisani Story, Sulaiman dan Tiara Putri Mahisani.
        </div>
      </footer>
      <!-- closing footer -->
    </div>
    <!-- Closing sosial media -->
  </div>
  <!--  closing dekstop view -->

  <!-- mobile view -->

  <!-- navbar -->
  <audio
    ref="audioMobile"
    src="/music/Indila - Love Story Slowed  Short & Lyric & Instrumental & Music.mp3"
    preload="auto"
    loop
  ></audio>
  <div class="min-md:hidden" @click.once="startAudio">
    <div
      class="w-full min-h-screen bg-[url(../assets/images/bg-main.webp)] bg-cover bg-center z-0"
    >
      <nav class="relative">
        <div
          id="#"
          class="border-t-0 h-15 fixed w-full z-100 px-8 py-4 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg flex justify-between items-center"
        >
          <img
            @click="logout"
            src="/log-out.png"
            class="hover:cursor-pointer"
          />

          <div>
            <h1 class="text-[30px] font-ballet font-semibold">
              <a href="#" @click="hamburger = false">Manhisani</a>
            </h1>
          </div>

          <img
            src="/hamburger.png"
            class="w-8 transition-transform duration-500 ease-in-out"
            @click="onHamburger"
            :class="hamburger ? 'rotate-90' : 'rotate-0'"
          />
        </div>
      </nav>
      <div
        class="fixed bg-gray-400 absolute z-60 top-14 w-full overflow-hidden transition-scale duration-500 ease-in-out flex flex-col items-center justify-center gap-8 text-3xl"
        :class="hamburger ? 'h-60' : 'h-0'"
      >
        <a href="#kami" @click="hamburger = false">Tentang Kami</a>
        <a href="#foto" @click="hamburger = false">Galeri</a>
        <a href="#sosial" @click="hamburger = false">Sosial Media</a>
      </div>
    </div>
    <!-- closing navbar -->

    <!-- tentang kami -->
    <div id="kami" class="relative overflow-hidden" @click="hamburger = false">
      <div>
      <img
        src="../assets/images/love-1.png"
        class="absolute w-40 top-68 left-30 z-10 transition-transform duration-500 ease-in-out"
        @click="onTouch"
        :class="touch ? 'scale-140' : 'scale-80'"
      />
      <h1 class="pointer-events-none absolute top-78 left-30 font-ballet transition-all duration-500 ease-in-out z-15" :class="touch?'opacity-100':'opacity-0',touch?'text-[35px]':'text-[10px]'">Sulaiman</h1>
      <h1 class="pointer-events-none absolute top-88 left-45 font-ballet transition-all duration-500 ease-in-out z-15" :class="touch?'opacity-100':'opacity-0',touch?'text-[35px]':'text-[10px]'">Tiara</h1>
      </div>
      
      <video
        ref="videoMobile"
        muted
        loop
        playsinline
        class="w-full h-screen object-cover z-50 mix-blend-screen pointer-events-none"
      >
        <source
          src="/mobile/video/Rose petals overlay for free🤍.mp4"
          type="video/mp4"
        />
        
      </video>
      <img src="/iman.webp" class="absolute z-0 top-0 mix-blend-screen pointer-events-none w-full h-91 transition-all duration-500 ease-out" :class="touch?'translate-y-0':'-translate-y-100',touch?'opacity-100':'opacity-0'">
      <img src="/tiara.webp" class="absolute z-0 bottom-0 mix-blend-screen pointer-events-none w-full h-91 transition-all duration-500 ease-out" :class="touch?'translate-y-0':'translate-y-100',touch?'opacity-100':'opacity-0'">
    </div>
    <!-- closing tentang kami -->

    <!-- galeri -->
    <div id="foto" class="h-full w-full" @click="hamburger = false">
      <section>
      <div id="galeri" class="p-6 bg-gray-50 min-h-screen pt-20">
        <div class="relative pb-10">
          <h2 class="text-6xl font-bold text-center mb-8 font-ballet">
            {{ gambarPilihan }}
          </h2>
          <select class="font-lexend scale-120 absolute right-0" v-model="gambarPilihan">
            <option disabled value="">Pilih Gambar</option>
            <option value="lamaran">Lamaran</option>
            <option value="jalan-jalan">Jalan-jalan</option>
            <option value="sulaiman">Sulaiman</option>
            <option value="tiara">Tiara</option>
          </select>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            data-aos="fade-up"
            v-for="photo in dataGambar[gambarPilihan]"
            :key="photo.id"
            class="shadow-lg shadow-black group relative overflow-hidden rounded-xl cursor-pointer bg-gray-200"
            @click="openLightbox(photo.url)"
          >
            <img
              :src="photo.url"
              :alt="photo.title"
              class="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />

            <div
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <span class="text-white font-medium text-lg">{{
                photo.title
              }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="selectedImage"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-all"
          @click="closeLightbox"
        >
          <button class="absolute top-5 right-5 text-white text-4xl">
            &times;
          </button>
          <img
            :src="selectedImage"
            class="max-w-full max-h-full rounded shadow-2xl transition-transform duration-300"
          />
        </div>
      </div>
    </section>
    </div>

    <!-- closing galeri -->

    <!-- sosial media -->
    <div id="sosial" class="h-screen w-full relative">
      <video
        data-aos="fade-up"
        autoplay
        muted
        loop
        playsinline
        class="w-full h-full object-cover absolute mix-blend-screen z-50"
      >
        <source src="../assets/videos/bg-end.mp4" type="video/mp4" />
      </video>
      <footer
        data-aos="fade-up"
        class="bg-gray-900 text-white py-12 w-full absolute "
      >
        <div
          class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div>
            <h2 class="text-2xl font-bold mb-4 text-blue-400">Quotes</h2>
            <p class="text-gray-400 leading-relaxed text-justify">
              "Mencintaimu adalah seni memahami hidup. Bukan sekadar perasaan
              romantis, tapi kekuatan yang menggerakkan kita untuk saling
              memberi, tumbuh, dan menikmati keindahan dunia bersama-sama. Kamu
              adalah puisi terindah yang tertulis dalam buku hatiku, mimpi yang
              tak pernah ingin kutinggalkan."
            </p>
          </div>

          <div class="md:ml-auto">
            <h3
              class="text-lg font-semibold mb-4 border-b-2 border-blue-500 w-fit"
            >
              Navigasi
            </h3>
            <ul class="space-y-2 text-gray-400">
              <li>
                <a href="#" class="hover:text-white transition-colors"
                  >Beranda</a
                >
              </li>
              <li>
                <a
                  href="#tentang-kami"
                  class="hover:text-white transition-colors"
                  >Tentang Kami</a
                >
              </li>
              <li>
                <a href="#galeri" class="hover:text-white transition-colors"
                  >Galeri</a
                >
              </li>
              <li>
                <a
                  href="#sosial-media"
                  class="hover:text-white transition-colors"
                  >Sosial Media</a
                >
              </li>
            </ul>
          </div>

          <div class="md:ml-auto flex justify-center flex-col items-center">
            <h3 class="text-lg font-semibold mb-4">Ikuti Kami</h3>
            <div class="flex space-x-4">
              <a
                href="#"
                class="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition"
              >
                <img src="/ig.png" class="object-cover w-5" />
              </a>
            </div>
          </div>
        </div>

        <div
          class="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm"
        >
          &copy; Manhisani Story, Sulaiman dan Tiara Putri Mahisani.
        </div>
      </footer>

    </div>
    <!-- closing sosial media -->


  </div>
  <!-- closing mobile view -->
</template>

<style scoped>
/* Animasi transisi saat gambar berubah */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
