<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 14:50:50
 * @LastEditTime: 2019-08-29 10:58:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="base-audio">
    <div class="button-group">
      <span :class="buttonClass"
            class="btn"
            @click="toggle"></span>
    </div>
    <div class="slider">
      <el-slider v-model="percent"
                 @change="onChangeProgress"
                 :show-tooltip="false"
                 :disabled="progressDisabled"></el-slider>
    </div>
    <div class="timer">
      <span>{{currentTime | timeFormatter}}</span>/<span>{{duration | timeFormatter}}</span>
    </div>
    <audio ref="audio"
           style="display:none"
           :src="src"
           @play="onPlay"
           @pause="onPause"
           @ended="onEnded"
           @timeupdate="onTimeUpdate"
           @loadedmetadata="onLoaded"
           v-on="$listeners"
           controls=""></audio>
  </div>
</template>

<script>
import {setTimeout} from 'timers'
export default {
  name: 'BaseAudio',
  props: {
    /** 音频地址 */
    src: {
      type: String,
      required: true
    },
    /** 是否禁止更改进度 */
    progressDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      trueName: this.personName,
      currentTime: 0,
      duration: 0,
      status: 0 // 0暂停 1播放
    }
  },
  computed: {
    buttonClass() {
      let className = ''
      switch (this.status) {
        case 0:
          className = 'el-icon-video-play'
          break
        case 1:
          className = 'el-icon-video-pause'
        default:
          break
      }
      return className
    },
    percent: {
      // getter
      get: function() {
        return this.duration === 0 ? 0 : this.currentTime / this.duration * 100
      },
      // setter
      set: function(newValue) {
        this.currentTime = Math.ceil(this.duration * newValue / 100)
      }
    }
  },
  filters: {
    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * @returns {*} 格式化后的时分秒
     */
    timeFormatter(s) {
      var t
      if (s > -1) {
        var hour = Math.floor(s / 3600)
        var min = Math.floor(s / 60) % 60
        var sec = s % 60
        if (hour === 0) {
          t = ''
        } else if (hour < 10) {
          t = '0' + hour + ':'
        } else {
          t = hour + ':'
        }
        if (min < 10) {
          t += '0'
        }
        t += min + ':'
        if (sec < 10) {
          t += '0'
        }
        t += sec.toFixed(0)
      }
      return t
    }
  },
  methods: {
    toggle() {
      this.status === 0 ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    onChangeProgress(val) {
      this.$refs.audio.currentTime = this.currentTime
    },
    onLoaded(e) {
      this.duration = parseInt(e.target.duration)
    },
    onTimeUpdate(e) {
      this.currentTime = parseInt(e.target.currentTime)
    },
    onPlay() {
      this.status = 1
    },
    onPause() {
      this.status = 0
    },
    onEnded() {
      setTimeout(() => {
        this.status = 0
        this.currentTime = 0
        this.$refs.audio.currentTime = 0
      }, 500)
    }
  }
}
</script>

<style>
.base-audio .el-slider__button-wrapper {
  display: none;
}
.base-audio .el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
  opacity: 0.5;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
}

.base-audio {
  display: flex;
  min-width: 400px;
  border: 1px solid #409eff;
  background-color: #fff;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
}
.button-group {
  width: 80px;
}
.button-group .btn {
  display: block;
  padding: 0 10px;
  line-height: 40px;
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}

.slider {
  width: 100%;
  padding-left: 10px;
}
.timer {
  text-align: right;
  padding-right: 10px;
  width: 150px;
  font-size: 12px;
}
</style>
