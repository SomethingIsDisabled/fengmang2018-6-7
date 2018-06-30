// components/seach_bar/search_bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hide_btn:{
      type:"Boolean",
      value:false
    },
    icon_size:{
      type:"Number",
      value:20
    },
    icon:{
      type:"String",
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    s_word: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search:function(e){
      // console.log("tap");
      let mySearchData = {
        s_word: this.data.s_word
      },//detail对象，提供给事件监听函数
      myListOption = {};//事件触发选项
      this.triggerEvent("mysearch", mySearchData, myListOption);
    },
    matchWord:function(e){
      // console.log(e.detail.value);
      this.setData({
        s_word: e.detail.value
      })
    }
  }
})
