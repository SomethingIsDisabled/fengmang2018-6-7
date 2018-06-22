// components/add_img/add_img.js
const app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: "149rpx"
    },
    plus_color: {
      type: String,
      value: "#716F6F"
    },
    total: {
      type: Number,
      value: 8
    },
    photos: {
      type: Object,
      value: null
    },
    scroll: {
      type: Boolean,
      value: false
    },
    box_height: {
      type: String,
      value: "300rpx"
    },
    //每行预览数量
    pre_num: {
      type: Number,
      value: 4
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    img_temp_list: [],
    img_width: "23.5%"
    // img_width:"32%"
  },
  /**
   * 组件高度获取
   */
  attached:function(){
    // this._getHeight("3%");
    this._getWidth();
    // console.log("att")
  },
  //组件被移除
  detached: function () {
    this.clearImg();
    // console.log("det")
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //自定义事件
    onChange: function () {
      // console.log("!!!");
      let myListDetail = {
        img_temp_list: this.data.img_temp_list
      },//detail对象，提供给事件监听函数
        myListOption = {};//事件触发选项
      this.triggerEvent("mylist", myListDetail, myListOption);
    },
    _chooseImg: function () {
      let count=this.properties.total-this.data.img_temp_list.length;
      // console.log(this.data.img_temp_list.length,count);
      wx.chooseImage({
        count: count,
        sizetype: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res=> {
          // console.log(res);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let r = res.tempFiles, list = this.data.img_temp_list;
          for (let v of r){
            //限制图片大小
            // console.log(v);
            if(v.size/1024<500){
              list.push(v.path)
            }else{
              if (app.globalData.imgN){
                wx.showToast({
                  title: '请小于500K',
                  image: app.globalData.imgN
                })
              }
            }    
          }
          this.setData({
            img_temp_list: list
          });
          // console.log(this.data.img_temp_list)
          this.onChange();
        }
      });
      // console.log(this.data.img_width);
    },
    //计算图片百分比宽度
    _getWidth:function(){
      this.setData({
        img_width: ((100 - 2 * (this.data.pre_num - 1)) / this.data.pre_num).toFixed(2) + "%"
      });
    },
    // 计算添加框高度
    _getHeight:function(pd){
      if(!this.properties.height){
        wx.getSystemInfo({
          success: res => {
            // console.log(res);
            let w = res.screenWidth, n = this.properties.pre_num, h = 0;
            if (pd) { w = w-w*parseFloat(pd) * 0.01 * 2}
            h = (w - w * (n - 1) * 0.02) / n;
            if(!isNaN(h)){
              h = h.toFixed(1) + 'px';
            }else{
              h="240rpx"
            }
            this.setData({
              height: h
            })
            // console.log(this.properties.height)
          },
        })
      }
    },
    
    // 删除
    delIamge: function (e) {
      var index = e.currentTarget.dataset.img_index, list = this.data.img_temp_list;
      // console.log(list);
      if (index != "undefined" && index != "null") {
        list.splice(index, 1);
      }
      this.setData({
        img_temp_list: list
      });
      this.onChange();
      // console.log(this.data.img_temp_list);
    },
    //全部清除
    clearImg: function () {
      this.setData({
        img_temp_list: []
      });
    },
  }
})
