// components/check_in_time/check_in_time.js
const app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration:{
      type:Number,
      value:30
    },
    color1:{
      type:String,
      value:"#9F9F9F"
    },
    color2:{
      type: String,
      value: "#333"
    },
    f_size:{
      type:String,
      value:"30rpx"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    check_in_f:" 月 日",
    check_out_f:" 月 日",
    check_in_s:"",
    check_in_e:"",
    check_out_s:"",
    check_out_e:"",
    check_data:{
      check_in:"",
      check_out:"",
      check_all:1
    }
  },
  ready:function(){
    this.getNow();
    if(!this.properties.duration){
      setTimeout(()=>{
        this.getNow();
      },800);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindStartDate: function (e) {
      let ti = e.detail.value, t = this.dateFormat(e.detail.value), now = new Date();
      //验证
      if (new Date(ti) < now && new Date(ti).toLocaleDateString().split(" ")[0] != now.toLocaleDateString().split(" ")[0]) {
        wx.showToast({
          title: "请至少选今天",
          image: app.globalData.imgN,
          duration:1200
        });
        return;
      }
      // console.log(ti, t);
      let all = this.checkInAll(ti, this.data.check_data.check_out),param={};
      param.check_in_f=t;
      param["check_data.check_in"] = ti;
      param["check_data.check_all"]=all;
      this.setData(param);
      this.extData();
    },
    bindEndDate: function (e) {
      let ti = e.detail.value, t = this.dateFormat(e.detail.value), st = this.data.check_data.check_in;
      // console.log(new Date(ti),st)
      //验证
      if (new Date(ti) < new Date(st) && new Date(ti).toLocaleDateString().split(" ")[0] != new Date(st).toLocaleDateString().split(" ")[0]){
        wx.showToast({
          title: "需大于入住日期",
          image: app.globalData.imgN,
          duration: 1200
        });
        return;
      }
      // console.log(ti, t);
      let all = this.checkInAll(this.data.check_data.check_in, ti),param={};
      param.check_out_f=t;
      param["check_data.check_out"]=ti;
      param["check_data.check_all"]=all;
      this.setData(param);
      this.extData();
    },
    
    dateFormat: function (t) {
      t=t.toString();
      let i = t.indexOf("-");
      t = t.slice(i + 1);
      let ta = t.split("-");
      t = parseInt(ta[0]) + "月" + parseInt(ta[1]) + "日";
      return t;
    },
    _pdFormat:function(date){
      let t, y, M, d;
      if(!date){
        t=new Date();
      }else{
        t = new Date(date);
        if(isNaN(t-0)){
          return date;
        }
      }
      y = t.getFullYear();
      M = t.getMonth() + 1;
      d = t.getDate();
      if(M<10){M="0"+M}
      if(d<10){d="0"+d}
      return [y,M,d].join("-");
    },
    //初始时间
    getNow: function () {
      // console.log(this.properties.duration);
      let ti = this._pdFormat(new Date()),
          t = this.dateFormat(ti),
          to = new Date(),
          dur = this.properties.duration,
          toe, tie;
      to.setDate(to.getDate()+1);
      dur=parseInt(1000*60*60*24*parseInt(dur));
      tie = this._pdFormat(new Date(new Date().getTime()+dur));
      toe = this._pdFormat(new Date(to.getTime() + dur));
      // console.log(tie,toe);
      to = this._pdFormat(to);
      let tof = this.dateFormat(to),param={};
      // console.log(ti,t,to,tof);
      param["check_data.check_in"]=ti;
      param["check_data.check_out"]=to;
      param.check_in_f=t;
      param.check_out_f = tof;
      param.check_in_s = ti;
      param.check_out_s = to;
      param.check_in_e=tie;
      param.check_out_e=toe;
      // console.log(param);
      this.setData(param);
      this.extData();
    },
    //日期计算
    checkInAll: function (ti,to) {
      let d = new Date(to).getTime() - new Date(ti).getTime();
      // console.log(ti,to,new Date(to).getTime(), new Date(ti).getTime(),d);
      if (!isNaN(d) && d > 0) {
        //判断时间
        let days = parseInt((parseInt(d / 1000 / 60) / 60 / 24));
        if(days==0){
          days=new Date(to).getDate()-new Date(ti).getDate();
          if(days==1){return 1}else{return 0}
        }
        // console.log(days);
        return days;
      } else {
        return 0
      }
    },
    //数据传输
    extData: function () {
      let dateSelectDetail = this.data.check_data,
      dateSelectOptions = {};
      this.triggerEvent("dateselect", dateSelectDetail, dateSelectOptions);
    }
  },
})
