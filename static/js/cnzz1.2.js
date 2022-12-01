/* global _czc,_hmt, $, gtag ,_taq*/

function chatClick(num) {
    if (typeof _czc !== 'undefined') {
      _czc.push(['_trackEvent', '点击复制' + num, '关注微信']);
    }
    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackEvent', '点击复制' + num, '关注微信']);
    }
    if (typeof gtag !== 'undefined') {
      gtag('event', '点击' + num, { 'event_category': '按钮' + num, 'event_label': 'click', 'value': 1 });
    }
    return
  }
  
  // QQ统计
  function qqClick(num) {
    if (typeof _czc !== 'undefined') {
      _czc.push(['_trackEvent', '点击加群' + num, '加Q群']);
    }
    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackEvent', '点击加群' + num, '加Q群']);
    }
    if (typeof gtag !== 'undefined') {
      gtag('event', '点击加群' + num, { event_category: '按钮' + num });
    }
    return;
  }
  
  // 今日头条
  function Toutiao(convert_id) {
    _taq.push({ convert_id: convert_id, event_type: 'wechat' });
  }
  
  // 腾讯
  //   eid 是行为源ID 目前是运营部提供
  //  action 目前默认用 'click'
  function TClick(eid, action) {
    $.ajax({
      url: 'https://tg01.lanyife.com.cn/index.php',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        r: 'api/te-report/report',
        eid: eid,
        action: action,
      },
    });
  }
  
  
  /*
  * @url: 获取当前url传入就行了
  * @dec: 奇虎360 OCPC监测
  * */
  function QClick(url) {
    const imId = getQueryString('impression_id');
    const exId = getQueryString('exchange_id');
    $.ajax({
      url: 'https://tg01.lanyife.com.cn/index.php',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        r: 'api/qihu/active',
        impression_id: imId,
        exchange_id: exId
      },
    });
  }
  
  function polling (id) {
    $.ajax({
      url: 'https://tg01.lanyife.com.cn/index.php',
      type: 'get',
      ContentType:"application/json",
      data: {
        r: 'api/qihuad/setsource',
        sourceid: id
      },
    }).done(function (res) {
      console.log(res)
    }).fail(function (res) {})
  }
  
  
  function setUid() {
    var storage = window.localStorage
    var s = [];
    var hexDigits = "0123456abcdef";
    for (var i = 0; i < 16; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[6] = "4";
    s[15] = hexDigits.substr((s[12] & 0x3) | 0x8, 1);
    s[8] = s[12] = s[10] = s[14] = "-";
    var uuid = s.join("");
    storage.setItem("uuid", uuid);
  }
  
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return '';
    }
  }
  //蜜罐计划
  function Honeypot(channel, str) {
    const sourceid = getQueryString(channel)
    $("[data-qrcode]").each(
      function (item) {
        var image = 'https://qrcode.pangong88.com/hpqrcode/' + str + '?sourceid=' + sourceid;
        image && $(this).attr('src', image);
      }
    );
  }
  $(() => {
    const date = new Date();
    date.setTime(date.getTime() + 2 * 24 * 60 * 60 * 1000);
    const month = date.getMonth() + 1;
    //本月
    $('.month').text(month);
    // 上个月
    month == 1 ? $('.lastMonth').text('12') : $('.lastMonth').text(month - 1)
    //下个月
    $('.nextMonth').text(month + 1)
  })
  
  function qhApi(id, account_id, type) {
    $.ajax({
      url: 'https://tg01.lanyife.com.cn/index.php?r=api/dotting-convert-pc/convert',
      type: 'POST',
      ContentType: "application/x-www-form-urlencoded",
      data: {
        trans_id: id,
        account_id: account_id,
        qhclickid: id,
        data_industry: type
      },
    }).done(function (res) {
      
      console.log(res)
    }).fail(function (res) { })
  }
  function getAjax(type, url, data) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            sussess: function(res) {
              console.log(res)
                resolve(res)
            },
            error: function(error) {
                reject(error)
            }
        })
    })
  }
  /**
   * 360API上报
   * ocpc_ps_convert     PC搜索
   * ocpc_web_convert   移动推广
   * ocpc_ms _convert    移动搜索
   * ocpc_zs_convert    PC展示
   * obj = { type:"PC搜索", qhclickid:qhclickid,accountid:accountid}
   */
  function qihuoApiReport(obj){
    var data = {}
    data['account_id'] = obj.accountid
    switch(obj.type){
      case "PC搜索":
        data['qhclickid'] = obj.qhclickid
        data['trans_id'] = obj.qhclickid
        data['data_industry'] = "ocpc_ps_convert"
      case "移动推广":
        data['impression_id'] = obj.qhclickid
        data['trans_id'] = obj.qhclickid
        data['data_industry'] = "ocpc_web_convert"
      case "移动搜索":
        data['qhclickid'] = obj.qhclickid
        data['trans_id'] = obj.qhclickid
        data['data_industry'] = "ocpc_ms _convert"
      case "PC展示":
        data['qhclickid'] = obj.qhclickid
        data['trans_id'] = obj.qhclickid
        data['data_industry'] = "ocpc_zs_convert"
        data['jzqs'] = obj.jzqs
    }
    var qihuoApiReport = getAjax('POST','https://tg01.lanyife.com.cn/index.php?r=api/dotting-convert-pc/convert',data);
    qihuoApiReport.then(function(data){
      console.log(data)
    },function(error){
      console.log(error)
    })
  }
  
  
  
  
  
  
  