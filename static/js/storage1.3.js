var storage = window.localStorage
var sourceid = getQueryString('source_id') || getQueryString("bd_vid");
var test = "http://yunying-fuxj.dev.lanyicj.cn/"
var requestUrl = 'https://tg01.lanyife.com.cn/index.php';
window.onload = function(){
  
}
setData();
function setUid(){
  var channelNum = window.location.href.indexOf('com') > 0 ? window.location.href.substr((window.location.href.indexOf('com') + 4), 3) : 104
  var timestamp = +(new Date()) + ''
  var num = Math.floor(Math.random() * 100 + 9)
  var cookieStr = channelNum + timestamp + num
  return cookieStr
}
function setData(){
  var cookie = setUid()
  var data = {}
  console.log("cookie",cookie)
  if(storage.getItem('cookie')){
    data['sourceid'] = sourceid
    data['cookie'] = storage.getItem('cookie')
  }else{
    storage.setItem('cookie',cookie)
    data['sourceid'] = sourceid
    data['cookie'] = cookie
  }
  //console.log(data)
  postData(JSON.stringify(data))
}

function postData(data){
  $.ajax({
    url: requestUrl+'?r=api/source/cache-source',
    type: 'POST',
    data: {data:data},
    success: function(res){
      console.log(res)
    },
    error:function(){
    }

  })
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