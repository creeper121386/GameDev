window.__require=function t(e,i,n){function c(o,a){if(!i[o]){if(!e[o]){var h=o.split("/");if(h=h[h.length-1],!e[h]){var r="function"==typeof __require&&__require;if(!a&&r)return r(h,!0);if(s)return s(h,!0);throw new Error("Cannot find module '"+o+"'")}}var p=i[o]={exports:{}};e[o][0].call(p.exports,function(t){return c(e[o][1][t]||t)},p,p.exports,t,e,i,n)}return i[o].exports}for(var s="function"==typeof __require&&__require,o=0;o<n.length;o++)c(n[o]);return c}({caption:[function(t,e,i){"use strict";cc._RF.push(e,"786acDWrTJGz6t+KctWSbaP","caption"),cc.Class({extends:cc.Component,properties:{file:cc.TextAsset,interval:.03,delay:0,wait4click:!0},captionOnKeyUp:function(t){this.now_ix==this.data.length-1?cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.captionOnKeyUp,this):(this.now_ix++,this.oneline(this.data[this.now_ix]))},oneline:function(t,e){void 0===e&&(e="<color=#ffff00>");var i=this.getComponent(cc.RichText),n=t.length-1,c="",s=0;this.schedule(function(){c+=t[s],i.string=e+c+"</c>",s++},this.interval,n,0)},allTextOut:function(t){var e=this.getComponent(cc.Label),i=0;this.schedule(function(){e.string+=t[i],"\n"===t[i]&&(this.y+=300),++i==t.length&&cc.director.loadScene("Level1")},this.interval,t.length-1,this.delay)},talk:function(){this.now_ix=0,this.wait4click?(this.data=this.file.text.split("\n"),this.oneline(this.data[this.now_ix]),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.captionOnKeyUp,this)):this.allTextOut(this.file.text)},start:function(){}}),cc._RF.pop()},{}],finish_video:[function(t,e,i){"use strict";cc._RF.push(e,"6bbc9Uv1otE/YF5GgByMxng","finish_video"),cc.Class({extends:cc.Component,properties:{videoplayer:cc.VideoPlayer},onLoad:function(){this.videoplayer.node.on("completed",this.callback,this)},callback:function(t){cc.director.loadScene("Level1")}}),cc._RF.pop()},{}],homeUI:[function(t,e,i){"use strict";cc._RF.push(e,"0e7f3hDowtP2rqcE6mpFsgH","homeUI"),cc.Class({extends:cc.Component,properties:{fade_bwb_node:cc.Node},onLoad:function(){},enterGame:function(){Global.FirstLoadScene=!0,this.fade_bwb_node.active=!0,this.fade_bwb_node.getComponent(cc.Animation).playAdditive("fade-anim-bwb")},continueGame:function(){cc.director.loadScene("Level1")},exit:function(){cc.game.end()}}),cc._RF.pop()},{}],level1:[function(t,e,i){"use strict";cc._RF.push(e,"dbd1aMVmLpIe51GfnEhMwWy","level1"),cc.Class({extends:cc.Component,properties:{player:cc.Node,player_mask:cc.Node,captionNode:cc.Node,fade_bwb_node:cc.Node,fade_bw_node:cc.Node,pause_node:cc.Node},onLoad:function(){Global.FirstLoadScene&&(this.player_mask.active=!0,this.fade_bw_node.active=!0,this.pause_node.active=!1)},remove_player_mask:function(t,e){this.player_mask.active=!1,this.pause_node.active=!1},start:function(){Global.FirstLoadScene&&(this.captionNode.getComponent("caption").talk(),this.playerjs=this.player.getComponent("player"),this.playerMaskjs=this.player_mask.getComponent("player"),this.playerjs.onControl(),this.playerMaskjs.onControl())},update:function(t){this.player.x=Math.min(Math.max(this.player.x,-660),250),this.player_mask.x=Math.min(Math.max(this.player_mask.x,-430),480)},pause:function(){this.fade_bwb_node.active=!0,this.fade_bwb_node.getComponent(cc.Animation).play("fade-anim-bwb"),this.fade_bwb_node.active=!1}}),cc._RF.pop()},{}],player:[function(t,e,i){"use strict";cc._RF.push(e,"eaae2PfIrtEUp2lg0ldid3Z","player"),cc.Class({extends:cc.Component,properties:{maxSpeed:150,accel:500,is_mask:!1},onKeyDown:function(t){if(this.underUsrControl)switch(t.keyCode){case cc.macro.KEY.a:this.accLeft=!0,this.is_mask||(this.left_player.active=!0,this.right_player.active=!1);break;case cc.macro.KEY.d:this.accRight=!0,this.is_mask||(this.left_player.active=!1,this.right_player.active=!0)}},onKeyUp:function(t){if(this.underUsrControl)switch(t.keyCode){case cc.macro.KEY.a:this.accLeft=!1,this.xSpeed=0;break;case cc.macro.KEY.d:this.accRight=!1,this.xSpeed=0}},action:function(t){this.anim.currentClip&&this.anim.currentClip.name==t||this.anim.play(t)},onLoad:function(){this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.underUsrControl=!1,this.is_mask||(this.anim=this.getComponent(cc.Animation),this.right_player=this.node.getChildByName("right"),this.left_player=this.node.getChildByName("left"))},onControl:function(){this.underUsrControl=!0,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},offControl:function(){this.underUsrControl=!1,cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},start:function(){},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxSpeed&&(this.xSpeed=this.maxSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t}}),cc._RF.pop()},{}],start_fade_anim_callback:[function(t,e,i){"use strict";cc._RF.push(e,"69d1dsqrwZFeYSalxeziF8d","start_fade_anim_callback"),cc.Class({extends:cc.Component,properties:{menuAnim:cc.Node,caption_bg:cc.Node,caption:cc.Node},fadeAnimCallback:function(){this.menuAnim.getChildByName("btns").active=!1,this.caption_bg.active=!0,this.caption.active=!0;this.caption.getComponent("caption").talk()},start:function(){}}),cc._RF.pop()},{}]},{},["caption","finish_video","homeUI","level1","player","start_fade_anim_callback"]);