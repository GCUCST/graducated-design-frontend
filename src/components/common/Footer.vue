<template>
  <div class="footer">{{msg}}</div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      msg: "Footer" //没用
    };
  },
  methods: {}
};
</script>
<style scoped>
.footer {
  height: 200px;

  margin: 20px auto;
  padding: 30px;
  background: white;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.1);
  background-color: grey;
}
</style>
