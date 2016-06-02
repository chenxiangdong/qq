var date=[
  {
    "filename": "./musics/1.mp3",
    "duration": "04:30",
    "title": "喜欢你",
    "album": "a",
    "artist": "Beyond"
  },
  {
    "filename": "./musics/2.mp3",
    "duration": "03:35",
    "title": "可惜没如果",
    "album": "a",
    "artist": "林俊杰"
  },
  {
    "filename": "./musics/3.mp3",
    "duration": "04:13",
    "title": "下雨天",
    "album": "s",
    "artist": "南拳妈妈"
  },
  {
    "filename": "./musics/4.mp3",
    "duration": "04:32",
    "title": "明天,你好",
    "album": "a",
    "artist": "牛奶咖啡"
  },
  {
    "filename": "./musics/5.mp3",
    "duration": "03:48",
    "title": "唐人",
    "album": "最近还好么",
    "artist": "孙子涵"
  },
  {
    "filename": "./musics/6.mp3",
    "duration": "03:43",
    "title": "眼泪的错觉",
    "album": "2010年四月热搜歌",
    "artist": "王露凝"
  },
  {
    "filename": "./musics/7.mp3",
    "duration": "03:14",
    "title": "将心比心",
    "album": "将心比心",
    "artist": "夏天"
  }
]
/////////////绘制页面
var huizhi=function(){
  $.each(date,function(i,v){
    $("<li>")
    .html("<span>"+v.title+"</span><span>"+v.artist+"</span><span>"+v.duration+"</span><div class='list_cp'><strong class='btn_like' title='喜欢' name='' mid=''></strong><strong class='btn_share' title='分享'></strong><strong class='btn_fav' title='收藏到歌单'></strong><strong class='btn_del' title='从列表中删除'></strong></div>")
    .appendTo(".list_t")
  })
  //////////////显示界面上歌曲数目
  $(".list_t li:eq(0) span").addClass("bianse")
  $(".m_particular p:eq(0) span:eq(0)").html(date[0].title)
  $(".m_particular p:eq(1)").html(date[0].artist)
  $(".m_particular p:eq(2)").html(date[0].duration)
  $(".list_show span").html(date.length)
  audio.src=date[0].filename
}
////////////获取数据
$.getJSON('/date.json')
.done(function(d){
  date=d
  huizhi()
})
var audio=$("audio").get(0);
///////////////收起列表
$(".list_h span").on("click",function(){
  $(".m_list").addClass("touming")
})
$(".list_show").on("click",function(){
  $(".m_list").toggleClass("touming")
})
/////////////数据点击播放
$(".play").on("click",function(){
  if(audio.paused){
    audio.play();
  }else{
    audio.pause();
  }
})
///////////界面点击播放
$(audio).on("play",function(){
    $(".play").addClass("zanting")
})
$(audio).on('pause',function(){
  $(".play").removeClass("zanting")
})
/////////////数据上调节音量
var s=1
$(".tidai").on("click",function(e){
  audio.volume=e.offsetX/this.offsetWidth
  if(audio.volume===0){
    $(".mute").addClass("jingyin")
  }else{
    $(".mute").removeClass("jingyin")
  }
  s=audio.volume
})
$(".tidai").on("mousedown",function(){
  $(".tidai").on("mousemove",function(e){
    audio.volume=e.offsetX/this.offsetWidth
  })
  s=audio.volume
})
$(".tidai").on("mouseup",function(){
  $(".tidai").off("mousemove")
})
/////////////界面上调节音量
$(audio).on("volumechange",function(){
  p=audio.volume.toFixed(2)*100+"%"
  $(".circle").css("left",p)
  $(".sound").css("width",p)
})
/////////////数据静音
$(".mute").on("click",function(){
  if(audio.volume!==0){
    audio.volume=0
    $(".mute").addClass("jingyin")
  }else{
    audio.volume=s;
    $(".mute").removeClass("jingyin")
  }
})
//////////////进度条数据
$(".fugai").on("click",function(e){
  var b=e.offsetX/this.offsetWidth*audio.duration
  audio.currentTime=b
  audio.play()
})
$(".fugai").on("mousedown",function(){
  $(".fugai").on("mousemove",function(e){
    var b=e.offsetX/this.offsetWidth*audio.duration
    audio.currentTime=b
    audio.play()
  })
})
$(".fugai").on("mouseup",function(){
  $(".fugai").off("mousemove")
})
//////////////进度条界面
$(audio).on("timeupdate",function(){
  var t=audio.currentTime/audio.duration.toFixed(2)*100+"%"
  $(".right").css("width",t)
})
///////////换歌函数
var huange=function(shu){
  $(".list_t li span").removeClass("bianse")
  $(".m_particular p:eq(0) span:eq(0)").html(date[shu].title)
  $(".m_particular p:eq(1)").html(date[shu].artist)
  $(".m_particular p:eq(2)").html(date[shu].duration)
  audio.play()
  $(".list_t li:eq("+shu+")").find("span").addClass("bianse")
}
////////////////点击歌曲换歌
$(".list_t").on("click","li",function(){
  audio.src=date[$(this).index()].filename
  var shu=$(this).index()
  huange(shu)
})
////////////////下一首函数
var xiayishou=function(){
  var shu=$(".bianse").parent().index()+1
  if(shu>=date.length){
    shu=0
  }
  audio.src=date[shu].filename
  huange(shu)
}
////////////////随机播放函数
var suijibofang=function(){
  var suiji=Math.floor(Math.random()*date.length)
  audio.src=date[suiji].fillename
  huange(suiji)
}
///////////////////下一首
$(".next").on("click",function(){
  if($("#xunhuan").hasClass("sj")){
    suijibofang()
  }else{
    xiayishou()
  }
})
////////////////上一首函数
var shangyishou=function(){
  var shu=$(".bianse").parent().index()-1
  if(shu<0){
    shu=date.length-1
  }
  audio.src=date[shu].filename
  huange(shu)
}
///////////////////上一首
$(".before").on("click",function(){
  if($("#xunhuan").hasClass("sj")){
    suijibofang()
  }else{
    shangyishou()
  }
})
//////////////数据上循环方式
$(audio).on("ended",function(){
  if($("#xunhuan").hasClass("lb")){
    xiayishou()
  }
  else if($("#xunhuan").hasClass("dq")){
    audio.play()
  }
  else if($("#xunhuan").hasClass("sj")){
    suijibofang()
  }
  else if($("#xunhuan").hasClass("sx")){
    if($(".list_t li .bianse").parent().index()!==date.length-1){
      xiayishou()
    }
  }
})
///////////////循环界面
$("#xunhuan").on("click",function(){
  $(".yc").toggleClass("chuxian")
})
$(".yc").on("click","div",function(){
  $("#xunhuan").removeClass("lb sx sj dq")
  if($(this).hasClass("shunxu")){
    $("#xunhuan").addClass("sx")
  }
  else if($(this).hasClass("suiji")){
    $("#xunhuan").addClass("sj")
  }
  else if($(this).hasClass("danqu")){
    $("#xunhuan").addClass("dq")
  }
  else if($(this).hasClass("liebiao")){
    $("#xunhuan").addClass("lb")
  }
})
////////////鼠标移入移除
$(".list_t").on("mouseenter mouseleave","li",function(){
  $(this).toggleClass("hover")
})
///////////点击删除
$(".list_t").on("click",".btn_del",function(){
  var ss=$(this).closest("li").index()
  date=$.grep(date,function(v,i){
    return i!==ss
  })
  $(this).closest("li").remove()
  $(".list_show span").html(date.length)
  return false
})
////////////////点击右侧收起
$(".m_right").on("click",function(){
  $(".m_right").toggleClass("m_r")
  $(".m_play").toggleClass("m_shouqi")
  if($(".m_play").hasClass("m_shouqi")){
    $(".m_list").addClass("touming")
  }else{
    $(".m_list").removeClass("touming")
  }
})
