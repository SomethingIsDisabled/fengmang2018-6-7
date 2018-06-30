页面：
<to_top id="to_top" />

js:

onReady: function () {
    this.setData({
      to_top: this.selectComponent("#to_top")
    });
  },
  

onPageScroll: function (e) {
    //传递高度
    if (this.data.to_top && this.data.to_top.getScrollTop) {
      this.data.to_top.getScrollTop(e.scrollTop);
    } else { console.log("no element") }
  },