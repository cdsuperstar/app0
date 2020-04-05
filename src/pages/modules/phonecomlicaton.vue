<template>
  <q-page padding class="q-pa-lg row items-start q-gutter-md">
    <q-card class="col-12 chart-list" flat bordered>
      <q-toolbar style="border-bottom: 1px dashed #ebebeb;">
        <q-toolbar-title>
          <span class="text-subtitle1 text-weight-bold"> 移动设备状态</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <q-item style="padding: 4px 4px;">
          <q-item-section avatar style="padding-right: 4px;min-width:35px;">
            <q-icon color="primary" name="double_arrow" />
          </q-item-section>
          <q-item-section>
            纬度：{{ latitude }} 经度：{{ longitude }}
          </q-item-section>
        </q-item>
        <q-separator
          spaced
          inset="item"
          style="margin-left:30px;width:calc(100% - 30px);margin-top: 1px;margin-bottom: 1px;"
        />
        <q-item style="padding: 4px 4px;">
          <q-item-section avatar style="padding-right: 4px;min-width:35px;">
            <q-icon color="primary" name="double_arrow" />
          </q-item-section>
          <q-item-section> 网络状态：{{ netstate }} </q-item-section>
        </q-item>
        <q-separator
          spaced
          inset="item"
          style="margin-left:30px;width:calc(100% - 30px);margin-top: 1px;margin-bottom: 1px;"
        />
        <q-item style="padding: 4px 4px;">
          <q-item-section avatar style="padding-right: 4px;min-width:35px;">
            <q-icon color="primary" name="double_arrow" />
          </q-item-section>
          <q-item-section>
            <div class="row">
              电池状态：{{ batterystatus }} &nbsp;&nbsp;
              <div v-if="batterystatusisPlugged">-- 充电中...</div>
            </div>
          </q-item-section>
        </q-item>
        <q-separator
          spaced
          inset="item"
          style="margin-left:30px;width:calc(100% - 30px);margin-top: 1px;margin-bottom: 1px;"
        />
      </q-card-section>
    </q-card>
    <q-card class="col-12 chart-list" flat bordered>
      <q-toolbar style="border-bottom: 1px dashed #ebebeb;">
        <q-toolbar-title dense>
          <span class="text-subtitle1 text-weight-bold"> 基础功能</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="row items-start q-gutter-md scroll">
        <q-btn
          flat
          color="primary"
          icon="add_a_photo"
          label=" - 拍照 - "
          @click="getpicture()"
        />
        <q-btn
          flat
          color="primary"
          icon="videocam"
          label=" - 录像 - "
          @click="getcapture()"
        />
        <q-btn
          flat
          color="primary"
          icon="crop_free"
          label=" - 二维码/条码扫描 - "
          @click="barcodescan()"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Phonecomlicaton',
  components: {},
  data() {
    return {
      positioneexpanded: true,
      netstate: null,
      batterystatus: null,
      batterystatusisPlugged: null,
      // 纬度
      latitude: null,
      // 经度
      longitude: null
    }
  },
  created() {
    this.getPosition()
    window.addEventListener('batterystatus', this.onBatteryStatus, false)
    window.addEventListener('deviceready', this.onDeviceReady, false)
  },
  beforeMount() {},
  mounted() {
    this.checkConnection()
  },
  methods: {
    onDeviceReady() {},
    // 查看电池状态
    onBatteryStatus(status) {
      this.batterystatus = status.level
      this.batterystatusisPlugged = status.isPlugged
    },
    // 1 查询当前位置信息
    getPosition() {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess,
        this.getPositionError,
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
      )
    },
    // 1-1 查询当前位置信息成功
    getPositionSuccess(position) {
      this.latitude = String(position.coords.latitude)
      this.longitude = String(position.coords.longitude)
      if (this.$auth.check()) {
        let tmpUsercfg = JSON.parse(this.$auth.user().usercfg)
        if (tmpUsercfg === null) tmpUsercfg = {}
        tmpUsercfg.postion = {
          latitude: this.latitude,
          longitude: this.longitude
        }
        if (tmpUsercfg.postion !== null) {
          this.$router.app.$http
            .post('/zero/setMyUsercfg/', {
              usercfg: JSON.stringify(tmpUsercfg)
            })
            .then(res => {
              if (res.data.success) {
                this.$auth.user().usercfg = res.data.data.usercfg
              }
            })
        }
      }
    },
    // 1-2 查询当前位置信息失败
    getPositionError(error) {
      if (error) {
        this.$zglobal.showMessage('red-7', 'center', this.$t('failed'))
      }
    },
    // 查询当前网络连接
    checkConnection() {
      var networkState = navigator.connection.type
      const states = {
        unknown: '未知网络连接',
        ethernet: '以太网连接',
        wifi: 'WIFI 网络连接',
        '2g': '2G 网络连接',
        '3g': '3G 网络连接',
        '4g': '4G 网络连接',
        cell: '蜂窝数据连接',
        none: '无网络连接'
      }
      this.netstate = states[networkState]
    },
    // 二维码扫描
    barcodescan() {
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          alert(
            '扫描结果\n' +
              '类型: ' +
              result.format +
              '\n' +
              '内容: ' +
              result.text +
              '\n' +
              '是否取消: ' +
              result.cancelled
          )
        },
        function(error) {
          alert('扫描失败: ' + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: '请把二维码置于摄像区域...', // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          // formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
          // direction:"landscape",//  仅Android（portrait | landscape），默认未设置，因此会随设备旋转
          disableAnimations: true, // iOS
          disableSuccessBeep: true // iOS and Android
        }
      )
      if (this.$auth.user().usercfg) {
        const tmpa = JSON.parse(this.$auth.user().usercfg)
        this.barcodetype = tmpa.barcode.format
        this.barcodetext = tmpa.barcode.text
      }
    },
    // 拍摄
    getcapture() {
      // duration参数为最长录制时间
      navigator.device.capture.captureVideo(onSuccess, onError, {
        duration: 20
      })
      function onSuccess(mediaFiles) {
        var i, path, len
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath
          alert(
            '拍摄成功！\n' +
              '名称：' +
              mediaFiles[i].name +
              '\n' +
              '大小：' +
              mediaFiles[i].size +
              '\n' +
              '本地URL：' +
              mediaFiles[i].localURL +
              '\n' +
              '路径：' +
              path
          )
        }
      }
      function onError(error) {
        alert('拍摄失败：' + error)
      }
    },
    // 拍照
    getpicture() {
      navigator.camera.getPicture(onLoadImageSuccess, onLoadImageFail, {
        destinationType: navigator.camera.DestinationType.FILE_URI,
        // 返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI （在andorid中 FILE_URI和NATIVE_URI返回的结果是一样的）
        quality: 80, // 图片质量  0-100
        targetWidth: 800, // 照片宽度
        targetHeight: 600, // 照片高度
        saveToPhotoAlbum: true, // 保存到手机相册
        encodingType: navigator.camera.EncodingType.JPEG, // 保存的图片格式： JPEG = 0, PNG = 1
        allowEdit: false, // 选择之前允许修改截图
        cameraDirection: 0 // 前后摄像头类型：Back= 0,Front-facing = 1
        // sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        // // 从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        // mediaType: 0
        // // 可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      })
      // 成功的回调
      function onLoadImageSuccess(imageData) {
        // imageURI imageData
        alert('调用相册返回的数据:' + imageData)
        // //使用FileTransfer上传到服务器
        // var options = new FileUploadOptions() // 文件参数选项
        // options.fileKey = 'file' // 向服务端传递的file参数的parameter name
        // options.fileName = imageData.substr(
        //   imageData.lastIndexOf('/'),
        //   imageData.lastIndexOf('?') - imageData.lastIndexOf('/')
        // ) // 文件名一般返回的是app在手机的对应包下的缓存目录+?时间戳
        // options.mimeType = 'image/jpeg' // 文件格式，默认为image/jpeg
        // var ft = new FileTransfer() // 文件上传类
        // ft.upload(
        //   imageData,
        //   encodeURI(
        //     'http://192.168.0.4:8080/baas/mychat/messageTransform/uploadPicForUri'
        //   ),
        //   // 服务器处理该请求的地址，此处为本人的wex5baas的action地址
        //   function(success) {}, // 成功回调
        //   function(error) {}, // 失败回调
        //   options
        // )
      }
      // 失败的回调
      function onLoadImageFail(error) {
        // console.log('调用相册失败的消息：' + error)
        alert('拍摄失败：' + error)
      }
    }
  }
}
</script>

<style scoped>
.chart-list {
  margin: 20px auto;
  width: 350px;
  height: 400px;
}
</style>
