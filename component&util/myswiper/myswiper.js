// components/myswiper/myswiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgs:{
      type: "Array",
      value: ["defaultImg.png"]
    },
    indicator:{
      type:"String",
      value:"#fff"
    },
    height:{
      type:"String",
      value:"300rpx"
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    img_loaded:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bannerError:function(e){
      let i=e.currentTarget.dataset.index,param={};
      // console.log(i, !!this.properties.imgs[i])
      param["imgs[" + i + "]"] = "defaultImg.png"
      this.setData(param)
    },
    imgLoaded:function(e){
      let i = e.currentTarget.dataset.index, param = {};
      param["img_loaded[" + i + "]"] = !0;
      this.setData(param);
    }
  },
  /**
   * 进入
   */
  attached(){
    // console.log(this.properties.imgs)

  }
})
