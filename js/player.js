// mini player
$(document).ready(function (){

  $('#side_player_plugin').onselectstart = new Function("return false");

  var mp3 = $('#zm_side_player_audio')[0];


  // 侧边栏隐藏显示
  $('#sidebar_slide_hidden').click(function () {
    $('#player_container').animate({ width: 'toggle' }, 500);
    $('#zm_play_list').css('display', 'none');
    $('#zm_music_play_list').css('color', ' #7D7D7D');

    if ($(this).attr('data-dest') == 'true')
    {
      $(this).attr('data-dest', 'false');
      $(this).find('i').removeClass('fa-chevron-left');
      $(this).find('i').addClass('fa-chevron-right')
    } else {
      $(this).attr('data-dest', 'true');
      $(this).find('i').removeClass('fa-chevron-right');
      $(this).find('i').addClass('fa-chevron-left')
    }
  });


  // 播放暂停
  $('#s_play').click(function play() {
    var self = $(this);
    var cov = $('#player_music_cover_picture');

    if (mp3.paused) {

      // 播放
      mp3.play();

      // 转换暂停图标
      self.removeClass('fa-play');
      self.addClass('fa-pause');
      self.attr('title', '暂停');

      // 添加动画
      cov.addClass('play_cov_rotation');

      // 动画继续
      cov.css( {
        'animation-play-state': 'running',
        '-webkit-animation-play-state': 'running',
        '-moz-animation-play-state': 'running',
        '-o-animation-play-state': 'running'
      });
    } else {
      // 暂停
      mp3.pause();

      // 转换播放图标
      self.removeClass('fa-pause');
      self.addClass('fa-play');
      self.attr('title', '播放');

      // 动画暂停
      cov.css({
        'animation-play-state': 'paused',
        '-webkit-animation-play-state': 'paused',
        '-moz-animation-play-state': 'paused',
        '-o-animation-play-state': 'paused'
      });
    }
  });


  //静音
  $('#p_disabled').click(function (){
    var self = $(this);
    var audio = $('#zm_side_player_audio')[0];

    if (audio.muted) {
      audio.muted = false;

      self.removeClass('fa-volume-off');
      self.addClass('fa-volume-up');
      self.css('color', '#8B8682');
      self.attr('title', '设为静音');
    } else {
      audio.muted = true;

      self.removeClass('fa-volume-up');
      self.addClass('fa-volume-off');
      self.css('color', '#CD0000');
      self.attr('title', '恢复静音');
    }
  });


  // 歌词显示
  $('#zm_music_play_lyric').click(function (){
      var lyric = $('#side_lyric');
      var self = $(this);

    if (lyric.css('display') == 'block') {
      lyric.css('display', 'none');
      self.css('color', '#8B8682');
    } else {
      lyric.css('display', 'block');
      self.css('color', '#F07410');
    }
  });
  $('#close_lyric_icon').click(function (){
    $(this).parent().css('display', 'none');
    $('#zm_music_play_lyric').css('color', '#8B8682');
  });


  // 播放列表显示
  $('#zm_music_play_list').click(function (){
    var playList = $('#zm_play_list');
    var self = $(this);

    if (playList.css('display') == 'block') {
      playList.css('display', 'none');
      self.css('color', '#8B8682');
    } else {
      playList.css('display', 'block');
      self.css('color', '#F07410');
    }
  });
  // 播放列表close图标
  $('#close_playlist_icon').click(function (){
    $('#zm_play_list').css('display', 'none');
    $('#zm_music_play_list').css('color', '#8B8682');
  });




  // 上一次坐标
  var previouslyClientX;

  // mousemove 事件函数
  var volumeMousemoveEvent;

  // 音量滑动
  $('#zm_slide_change_volume').mousedown(function (event) {
    previouslyClientX =  event.clientX;

    $(document).mousemove(volumeMousemoveEvent = function (event2){
      // 当前坐标
      var clientX2  = event2.clientX;

      var point = $('#zm_slide_change_volume');
      var currentVolumeLine = $('#zm_current_volume_line');

      var currentLeft = point.position().left;

      if (currentLeft <= 100 && currentLeft >= 0) {
        if (clientX2 > previouslyClientX) {
          if (currentLeft == 100) {
            return;
          } else {
            point.css('left', (currentLeft + 1) + '%');
            currentVolumeLine.css('width', (currentLeft + 1) + '%');
            mp3.volume = (currentLeft + 1) / 100;

          }
        } else {
          if (currentLeft == 0) {
            return;
          } else {
            point.css('left', (currentLeft - 1) + '%');
            currentVolumeLine.css('width', (currentLeft - 1) + '%');
            mp3.volume = (currentLeft - 1) / 100;
          }
        }
      } else {
        return;
      }

      previouslyClientX = clientX2;
    });
  });
  // 松开鼠标移除事件
  $(document).mouseup( function () {
    $(document).unbind("mousemove", volumeMousemoveEvent);
    previouslyClientX = null;
    volumeMousemoveEvent = null;
  });



  // 播放列表改变背景
  $('.zm_list_ever li').mouseover(function () {
    $(this).addClass('zm_l_hover');
  }).mouseout(function () {
    $(this).removeClass('zm_l_hover');
  });

 // 点击更换歌曲
  $('#zm_current_play_list li').click(function (){
    var self = $(this);
    var musicSRC = self.attr('mid');
    mp3.src = '/music/' + musicSRC + '.mp3';

    $('#player_music_cover_picture')[0].src = '/music/' + musicSRC + '.jpg';
    $('#zm_cover_title').text(self.find('.zm_p_e')[0].innerHTML);
    $('#zm_artist').text(self.find('.zm_p_e')[1].innerHTML);


    $('#s_play').click();
    $('#zm_current_play_list li').removeClass('zm_play_current');
    $(this).addClass('zm_play_current');
  });


  // 播放列表栏目
  $('.zm_p_l_select').mouseover(function () {
    $(this).css('color', '#D17B35');
  }).mouseout(function () {
    $(this).css('color', '#fff');
  });


  // 播放列表
  $('#zm_current_click').click(function () {
    var self = $(this);

    if (self.attr('data-zcurrent') == 'false') {

      self.attr('data-zcurrent', 'true');
      $('#zm_hot_click').attr('data-zcurrent', 'false');

      $('.zm_p_l_select').removeClass('zm_p_current');
      self.addClass('zm_p_current');


      $('#zm_current_play_list').animate({ 'left': 0 }, 500);
      $('#zm_hot_play_list').animate({ 'right': -700 }, 500);
    }

    return;
  });
  // 热歌列表
  $('#zm_hot_click').click(function () {
    var self = $(this);

    if (self.attr('data-zcurrent') == 'false') {

      self.attr('data-zcurrent', 'true');
      $('#zm_current_click').attr('data-zcurrent', 'false');

      $('.zm_p_l_select').removeClass('zm_p_current');
      self.addClass('zm_p_current');


      $('#zm_current_play_list').animate({ 'left': -700 }, 500);
      $('#zm_hot_play_list').animate({ 'right': 0 }, 500);
    }

    return;
  });



  // 将秒解析成 mm:ss 格式
  function toTime(sec) {
    var min = parseInt(sec / 60);
    var sec = parseInt(sec % 60);
    if (min < 10) {
      min = '0' + min.toString();
    }
    if (sec < 10) {
      sec = '0' + sec.toString();
    }
    return min + ':' + sec;
  }

  var playList = $('#zm_current_play_list li');

  // 播放时间倒计时
  var zmTime = $('#zm_time');
  mp3.addEventListener('timeupdate', function (){
    if (mp3.ended) {
      if (!(mp3.loop))
      {
        for (var n = 0; n < playList.length; n++) {
          if ($((playList[n])).is('.zm_play_current')) {
            if (n == (playList.length - 1)) {
              playList[0].click();
            } else {
              playList[n + 1].click();
            }
            return true;
          }
        }
      }
      else
      {
        return true;
      }
    }
    var left = toTime(parseInt(mp3.duration - mp3.currentTime));
    zmTime.text(left);
  });


  // 上一首
  $("#zm_pre_play").click(function () {
    for (var n = 0; n < playList.length; n++) {
      if ($((playList[n])).is('.zm_play_current')) {
        if (n == 0) {
          playList[playList.length - 1].click();
        } else {
          playList[n - 1].click();
        }

        return true;
      }
    }
  });
  // 下一首
  $("#zm_next_play").click(function () {
    for (var nn = 0; nn < playList.length; nn++) {
      if ($((playList[nn])).hasClass('zm_play_current')) {
        if (nn == (playList.length - 1)) {
          playList[0].click();
        } else {
          playList[nn + 1].click();
        }

        return true;
      }
    }

  });


  // 循环设置
  $('#zm_play_model').click(function () {
    var self = $(this);
    if (mp3.loop) {
      self.removeClass('fa-recycle');
      self.addClass('fa-retweet');
      self.attr('title', '列表循环');

      mp3.loop = false;
    } else {
      self.removeClass('fa-retweet');
      self.addClass('fa-recycle');

      self.attr('title', '单曲循环');
      mp3.loop = true;
    }
  });


  // 默认音量
  mp3.volume = 0.4;

  // 默认歌曲
  playList[0].click();
  $('#s_play').click();


  // 默认歌曲时长
  mp3.oncanplay = function () {
    zmTime.text(toTime(parseInt(mp3.duration)));
  };


});