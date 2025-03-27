<script setup lang="ts">
import { ref } from 'vue';

const username = ref('用户1');
const matchedNumber = ref(0);
const rewardsNumber = ref(0);
const totalNumber = ref(0);

const increaseMatchedNumber = () => {
  matchedNumber.value++;
  totalNumber.value++;
  if (matchedNumber.value >= 5) {
    const exchangedCount = Math.floor(matchedNumber.value / 5);
    rewardsNumber.value += exchangedCount;
    matchedNumber.value = matchedNumber.value % 5;
  }
};
</script>
<template>
  <div class="about-container">
    <el-card class="main-card">
      <template #header>
        <h1>馒头数量管理后台 - 关于页</h1>
      </template>
      <div class="info-section">
        <el-row>
          <el-col :span="12">
            <el-form label-width="100px">
              <el-form-item label="用户名">
                <span>{{ username }}</span>
              </el-form-item>
              <el-form-item label="匹配数量">
                <span>{{ matchedNumber }}</span>
              </el-form-item>
              <el-form-item label="奖励数量">
                <span>{{ rewardsNumber }}</span>
              </el-form-item>
              <el-form-item label="购买总数">
                <span>{{ totalNumber }}</span>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="increaseMatchedNumber">增加匹配数量</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="description-card">
      <template #header>
        <h2>规则说明</h2>
      </template>
      <p>当匹配数量达到 5 个时，系统会自动将其兑换为 1 个奖励数量。奖励数量会计入总数，同时匹配数量会减去已兑换的 5 个。购买总数表示用户总共购买的馒头数量。</p>
    </el-card>
  </div>
</template>



<style scoped>
.about-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.main-card {
  margin-bottom: 20px;
}

.info-section {
  padding: 20px;
}

.description-card {
  line-height: 1.6;
}
</style>