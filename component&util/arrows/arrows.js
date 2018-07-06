// components/arrows/arrows.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String,
      value:"hollow"
    },
    direction:{
      type:String,
      value:"right"
    },
    size:{
      type:String,
      value:"15rpx"
    },
    bg_color:{
      type:String,
      value:"#fff"
    },
    color:{
      type:String,
      value:"#999"
    },
    margin_top:{
      type:String,
      value:"0rpx;"
    },
    bold:{
      type:"String",
      value:"2rpx"
    },
    left:{
      type:"String",
      value:"0"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    b_h:"",
  },
  ready:function(){
    // this.getSize();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getSize:function(){
      let s = parseInt(parseInt(this.properties.size)*2)+"rpx";
    }
  }
})
