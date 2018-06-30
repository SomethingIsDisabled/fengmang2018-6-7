// components/to_top/to_top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scroll_top:{
      type:Number,
      value:0
    },
    img:{
      type:String,
      value:"top.png"
    },
    bottom:{
      type:Number,
      value: 20
    },
    long:{
      type:"Number",
      value:500
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_show:0,
    icon_error:!1
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _toTop:function(e){
      wx.pageScrollTo({
        scrollTop:0,
        duration:500
      });
      this.setData({
        is_show: 2
      })
    },
    getScrollTop:function(n){
      let is_show=0;
      if (n > this.properties.long){
        is_show=1;
      }else{
        is_show=0;
      }
      this.setData({
        is_show: is_show
      })
    },
    _iconError(){
      this.setData({
        icon_error:!0
      })
    }
  }
})
