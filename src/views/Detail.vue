<template>
  <header class="navbar navbar-expand-lg navbar-light shadow-sm">
    <div class="container">
      <a
        href="/"
        class="navbar-brand"
        style="color: #485577 !important; font-weight: 600; font-size: 23px"
        >Quran</a
      >
    </div>
  </header>
  <div
    class="pt-4 pb-5"
    style="background: #3d4a6e; color: #e0e2e8; clear: both"
  >
    <div class="container">
      <div class="row align-items-center justify-content-between">
        <div class="col-10 pt-3">
          <div class="" style="font-size: 22px; font-weight: 600">
            {{ dataSurah.name_simple }}
          </div>
          <div class="" style="font-size: 17px">
            {{ dataSurah.translated_name.name }}
          </div>
        </div>
        <div class="col-2 text-end">
          <div class="" style="font-size: 28px; font-weight: 600">
            {{ dataSurah.name_arabic }}
          </div>
          <div class="">{{ dataSurah.verses_count }} Ayat</div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12" style="font-size: 15px">
          {{ dataSurah.info.short_text }}
        </div>
      </div>
    </div>
  </div>

  <div class="container my-5">
    <div class="col-lg-12">
      <div class="card mb-4" v-for="(ayat, index) in data.verses" :key="index">
        <div class="card-body">
          <div class="">
            <div
              class="d-lg-flex justify-content-between mb-3 align-items-center"
            >
              <audio controls>
                <source
                  :src="`https://verses.quran.com/${ayat.audio.url}`"
                  type="audio/ogg"
                />
                <source
                  :src="`https://verses.quran.com/${ayat.audio.url}`"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
              <div class="mt-lg-0 mt-3">
                <div class="text-end" style="font-size: 30px">
                  {{ ayat.text_uthmani }}
                </div>
              </div>
            </div>
            <span
              class="me-1"
              v-for="(kata, index) in ayat.words"
              :key="index"
              style="font-size: 14px"
            >
              {{ kata.translation.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="pt-2 pb-4"
    style="background: #3d4a6e; color: #e0e2e8; clear: both"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-12 pt-3 text-center" style="font-size: medium">
            <span>Created By Muhammad Rifki | &#169; 2022 </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      // Inisiasi variabel penampung data
      link: "",
      data: [],
      loading: true,
      dataSurah: [],
      Surah: [],
    };
  },
  created() {
    // Menjalankan fungsi saat web pertama kali diload
    this.ambilDetail();
    this.infoSurah();
    this.deskSurah();
  },
  methods: {
    // Membuat function method
    ambilDetail() {
      // Call API menggunakan lib Axios
      axios
        .get(
          "https://api.quran.com/api/v4/verses/by_chapter/" +
            this.$route.params.id +
            "?translations=true&translation_fields=text,resourse_id&language=id&fields=text_uthmani&translations=true&audio=1&word_fields=text&words=true&per_page=300&page=1"
        )
        .then((response) => {
          this.data = response.data;
          console.log(response.data.verses);
          this.loading = false;
        });
    },
    infoSurah() {
      axios
        .get(
          "https://api.quran.com/api/v4/chapters/" +
            this.$route.params.id +
            "?language=id"
        )
        .then((response) => {
          this.dataSurah = response.data.chapter;
          this.loading = false;
        });
    },
    deskSurah() {
      axios
        .get(
          "https://api.quran.com/api/v4/chapters/" +
            this.$route.params.id +
            "/info?language=id"
        )
        .then((response) => {
          this.dataSurah.info = response.data.chapter_info;
          this.loading = false;
          console.log(this.dataSurah);
        });
    },
  },
};
</script>
