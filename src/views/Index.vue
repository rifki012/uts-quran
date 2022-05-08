<template>
  <header class="navbar navbar-expand-lg navbar-light shadow-sm">
    <div class="container">
      <a
        href=""
        class="navbar-brand"
        style="color: #485577 !important; font-weight: 600; font-size: 23px"
        >Quran</a
      >
    </div>
  </header>

  <div class="container my-5">
    <div class="row">
      <div
        class="col-xl-4 col-lg-6 col-md-6 mb-3"
        v-for="(surah, index) in surahs.chapters"
        :key="index"
      >
        <router-link
          href=""
          class="text-decoration-none"
          style="font-weight: 500; color: #485577"
          :to="{ name: 'surah', params: { id: surah.id } }"
        >
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="fw-bold me-3 ms-1">{{ index + 1 }}</div>
                <div class="w-75">
                  <span class="fw-bold">{{ surah.name_simple }}</span>
                  <div class="small">
                    <small>{{ surah.translated_name.name }}</small>
                  </div>
                </div>
                <div class="text-center">
                  {{ surah.name_arabic }}
                  <div class="small">
                    <small>{{ surah.verses_count }} Ayat</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <div class="pt-4 pb-3" style="background: #3d4a6e; color: #e0e2e8">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center" style="font-size: medium">
            <span>Created By Muhammad Rifki | &#169; 2022 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background: #fff !important;
  font-family: "Poppins", sans-serif !important;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // Inisiasi variabel penampung data
      surahs: [],
      loading: true,
      show: true,
    };
  },
  created() {
    // Menjalankan fungsi saat web pertama kali diload
    this.ambilSurah();
    document.title = "Quran";
  },
  methods: {
    // Membuat function method
    ambilSurah() {
      // Call API menggunakan lib Axios
      axios
        .get("https://api.quran.com/api/v4/chapters?language=id")
        .then((respon) => {
          this.surahs = respon.data;
          this.loading = false;
          this.page = 1;
          console.log(respon.data);
        })
        .catch((err) => {
          console.log("haha");
        });
    },
  },
};
</script>
