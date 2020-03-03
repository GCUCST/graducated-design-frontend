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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: grey;
}
</style>
