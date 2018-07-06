const req=require("../utils/request.js");
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//价格抹零
const priceMultiply=(a,b)=>(a*b*100+.5|0)/100;
//去掉多余空白
const deleteSpace=d=>{
  if(!d){return "";}
  d=d.replace(/^\s+/,"");
  d = d.replace(/\s+$/, "");
  d=d.replace(/\n\n+/gi,"\n");
  return d;
}
//限制一个空格
const deleteSpaceI = d => {
  if (!d) { return ""; }
  d = d.replace(/^\s+/, "");
  d = d.replace(/\s+$/, "");
  d = d.replace(/\s+/gi, " ");
  return d;
}
//去掉全部空格
const deleteSpaceA = d => {
  if (!d) { return ""; }
  d = d.replace(/^\s+/, "");
  d = d.replace(/\s+$/, "");
  d = d.replace(/\s+/gi, "");
  return d;
}
const testTelephone=d=>{
  let reg = /^1\d{10}$/;
  return reg.test(d);
}
const textFormat = d => d.replace(/ /g, "\r\t\r\t");
//图片地址
const imgUrlAddr= obj=> {
  let p = ["photos", "image", "images"];
  // console.log(obj);
  for (let k in obj) {
    p.forEach(v => {
      if (k == v && Array.isArray(obj[k])) {
        obj[k] = obj[k].map(v1 => {
          if (v1.substr(1, 6) == "Public") {
            v1 = req.FMNET + v1;
          }
          return v1;
        })
      } else if (k == v && typeof obj[k] == "string" && obj[k].substr(1, 6) == "Public") {
        obj[k] = req.FMNET + obj[k];
      } else if (typeof obj[k] == "object") {
        // console.log(k,obj[k]);
        imgUrlAddr(obj[k]);
      }
    });
  }
  return obj;
}
//时间
const cAgo = t=> {
  t = new Date(t).getTime();
  let n = new Date().getTime(), d = n - t, a, years, days, hours, minutes, seconds;
  if (!isNaN(d) && d > 0) {
    //判断时间
    years = parseInt(parseInt(d / 1000 / 60) / 60 / 24 / 365);
    days = parseInt((parseInt(d / 1000 / 60) / 60 / 24) % 365);
    hours = parseInt((parseInt(d / 1000 / 60) / 60) % 24);
    minutes = parseInt((d / 1000 / 60) % 60);
    seconds = parseInt((d / 1000) % 60);
    // console.log(n, t, d, years, minutes, seconds);
    if (years != undefined && years != null && years) {
      a = years + "年前";
    } else if (days) {
      a = days + "天前";
    } else if (hours) {
      a = hours + "小时前";
    } else if (minutes) {
      a = minutes + "分钟前";
    } else if (seconds) {
      // a = seconds + "秒前";
      a ="刚刚";
    }
    return a;
  } else {
    return "刚刚";
  }
};
//时间戳转时间
const pointTime=(t,str,s)=>{
  str=str||"-";
  let  date = new Date(t),
       year = date.getFullYear(),
       month = date.getMonth() + 1,
       day = date.getDate(),
       hour = date.getHours(),
       minute = date.getMinutes(),
       second = date.getSeconds();
  month = formatNumber(month);
  day = formatNumber(day);
  if(s=="date"){
    return year + str + month + str + day ;
  }else{
    return year + str + month + str + day + " " + hour + ":" + minute;
  }
}
//时间戳转中文时间
const chineseDate=t=>{
  let date = new Date(t),
    now_year = new Date().getFullYear(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    show="";
  if (now_year != year){
    show = year +"年"
  }
  return show + month + "月" + day+"日";
}
//验证JSON
const isJSON=str=> {
  if (typeof str == 'string') {
    try {
      let obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
  return false;
}
//列表预处理
const listDecode=function(obj){
  let arr = ["photos", "location"];
  for (let v of arr) {
    if (obj.hasOwnProperty(v) && isJSON(obj[v])) {
      obj[v] = JSON.parse(obj[v]);
    }
  }
  obj = this.imgUrlAddr(obj);
  return obj;
}
//delay
const requestDelay=()=>{
  let timer = null;
  return function(d){
    d = parseInt(d) ? parseInt(d):1500;
    if(timer){return timer}
    timer=setTimeout(()=>{
      timer=null;
    },d);
  }
}
//number
const browseNum=n=>{
  if (n < 10000) {
    return n;
  } else if (n > 10000 && n < 100000) {
    return (n / 10000).toFixed(2) + "万";
  } else if (n > 100000 && n < 1000000) {
    return (n / 10000).toFixed(1) + "万";
  } else if (n > 1000000 && n < 100000000) {
    return (n / 10000 | 0) + "万";
  } else if (n > 100000000) {
    return (n / 100000000).toFixed(1) + "亿";
  }
}
const matchAddr=d=>{
  regp =/^[\u4e00-\u9fa5]+?(省|市|自治区|特别行政区)/
}
module.exports = {
  priceMultiply,
  deleteSpace,
  deleteSpaceI,
  deleteSpaceA,
  testTelephone,
  imgUrlAddr,
  cAgo,
  pointTime,
  chineseDate,
  isJSON,
  listDecode,
  textFormat,
  browseNum,
  requestDelay: requestDelay()
}
