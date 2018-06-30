// components/ipt_model/ipt_model.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:"String",
      value:"提示"
    },
    discription:{
      type:"String",
      value:"请输入内容"
    },
    placeholder:{
      type:"String",
      value:"请输入内容"
    },
    btn_type:{
      type:"String",
      value:""
    },
    is_hide:{
      type:"Boolean",
      value:!1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   s_word:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    rf:()=>{},
    hideModel:function(){

      this.setData({
        is_hide:!0,
        s_word:""
      })
    },
    formSubmit:function(e){
      // console.log(e.detail.value);
      this.triggerEvent("seachipt",e.detail.value);
    }
  }
})
