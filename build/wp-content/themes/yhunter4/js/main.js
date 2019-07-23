!function(l){"use strict";if(void 0!==l){var r=[],o=function(t){return r=l.grep(r,function(e){return e!==t&&0<e.$instance.closest("body").length})},n={keyup:"onKeyUp",resize:"onResize"},i=function(e){l.each(s.opened().reverse(),function(){if(!e.isDefaultPrevented()&&!1===this[n[e.type]](e))return e.preventDefault(),e.stopPropagation(),!1})},a=function(e){if(e!==s._globalHandlerInstalled){s._globalHandlerInstalled=e;var t=l.map(n,function(e,t){return t+"."+s.prototype.namespace}).join(" ");l(window)[e?"on":"off"](t,i)}};s.prototype={constructor:s,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:l.noop,beforeContent:l.noop,beforeClose:l.noop,afterOpen:l.noop,afterContent:l.noop,afterClose:l.noop,onKeyUp:l.noop,onResize:l.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(e,t){"object"!=typeof e||e instanceof l!=!1||t||(t=e,e=void 0);var n=l.extend(this,t,{target:e}),r=n.resetCss?n.namespace+"-reset":n.namespace,o=l(n.background||['<div class="'+r+"-loading "+r+'">','<div class="'+r+'-content">','<span class="'+r+"-close-icon "+n.namespace+'-close">',n.closeIcon,"</span>",'<div class="'+n.namespace+'-inner">'+n.loading+"</div>","</div>","</div>"].join("")),i="."+n.namespace+"-close"+(n.otherClose?","+n.otherClose:"");return n.$instance=o.clone().addClass(n.variant),n.$instance.on(n.closeTrigger+"."+n.namespace,function(e){var t=l(e.target);("background"===n.closeOnClick&&t.is("."+n.namespace)||"anywhere"===n.closeOnClick||t.closest(i).length)&&(n.close(e),e.preventDefault())}),this},getContent:function(){if(!1!==this.persist&&this.$content)return this.$content;var t=this,e=this.constructor.contentFilters,n=function(e){return t.$currentTarget&&t.$currentTarget.attr(e)},r=n(t.targetAttr),o=t.target||r||"",i=e[t.type];if(!i&&o in e&&(i=e[o],o=t.target&&r),o=o||n("href")||"",!i)for(var a in e)t[a]&&(i=e[a],o=t[a]);if(!i){var s=o;if(o=null,l.each(t.contentFilters,function(){return(i=e[this]).test&&(o=i.test(s)),!o&&i.regex&&s.match&&s.match(i.regex)&&(o=s),!o}),!o)return"console"in window&&window.console.error("Featherlight: no content filter found "+(s?' for "'+s+'"':" (no target specified)")),!1}return i.process.call(t,o)},setContent:function(e){var t=this;return(e.is("iframe")||0<l("iframe",e).length)&&t.$instance.addClass(t.namespace+"-iframe"),t.$instance.removeClass(t.namespace+"-loading"),t.$instance.find("."+t.namespace+"-inner").not(e).slice(1).remove().end().replaceWith(l.contains(t.$instance[0],e[0])?"":e),t.$content=e.addClass(t.namespace+"-inner"),t},open:function(t){var n=this;if(n.$instance.hide().appendTo(n.root),!(t&&t.isDefaultPrevented()||!1===n.beforeOpen(t))){t&&t.preventDefault();var e=n.getContent();if(e)return r.push(n),a(!0),n.$instance.fadeIn(n.openSpeed),n.beforeContent(t),l.when(e).always(function(e){n.setContent(e),n.afterContent(t)}).then(n.$instance.promise()).done(function(){n.afterOpen(t)})}return n.$instance.detach(),l.Deferred().reject().promise()},close:function(e){var t=this,n=l.Deferred();return!1===t.beforeClose(e)?n.reject():(0===o(t).length&&a(!1),t.$instance.fadeOut(t.closeSpeed,function(){t.$instance.detach(),t.afterClose(e),n.resolve()})),n.promise()},chainCallbacks:function(e){for(var t in e)this[t]=l.proxy(e[t],this,l.proxy(this[t],this))}},l.extend(s,{id:0,autoBind:"[data-featherlight]",defaults:s.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(e){return e instanceof l&&e},process:function(e){return!1!==this.persist?l(e):l(e).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,process:function(e){var t=l.Deferred(),n=new Image,r=l('<img src="'+e+'" alt="" class="'+this.namespace+'-image" />');return n.onload=function(){r.naturalWidth=n.width,r.naturalHeight=n.height,t.resolve(r)},n.onerror=function(){t.reject(r)},n.src=e,t.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(e){return l(e)}},ajax:{regex:/./,process:function(e){var n=l.Deferred(),r=l("<div></div>").load(e,function(e,t){"error"!==t&&n.resolve(r.contents()),n.fail()});return n.promise()}},iframe:{process:function(e){var t=new l.Deferred,n=l("<iframe/>").hide().attr("src",e).css(function(e,t){var n={},r=new RegExp("^"+t+"([A-Z])(.*)");for(var o in e){var i=o.match(r);i&&(n[(i[1]+i[2].replace(/([A-Z])/g,"-$1")).toLowerCase()]=e[o])}return n}(this,"iframe")).on("load",function(){t.resolve(n.show())}).appendTo(this.$instance.find("."+this.namespace+"-content"));return t.promise()}},text:{process:function(e){return l("<div>",{text:e})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(e,t){var r=this,o=new RegExp("^data-"+t+"-(.*)"),i={};return e&&e.attributes&&l.each(e.attributes,function(){var e=this.name.match(o);if(e){var t=this.value,n=l.camelCase(e[1]);if(0<=l.inArray(n,r.functionAttributes))t=new Function(t);else try{t=l.parseJSON(t)}catch(e){}i[n]=t}}),i},extend:function(e,t){var n=function(){this.constructor=e};return n.prototype=this.prototype,e.prototype=new n,e.__super__=this.prototype,l.extend(e,this,t),e.defaults=e.prototype,e},attach:function(r,o,i){var a=this;"object"!=typeof o||o instanceof l!=!1||i||(i=o,o=void 0);var s,e=(i=l.extend({},i)).namespace||a.defaults.namespace,c=l.extend({},a.defaults,a.readElementConfig(r[0],e),i);return r.on(c.openTrigger+"."+c.namespace,c.filter,function(e){var t=l.extend({$source:r,$currentTarget:l(this)},a.readElementConfig(r[0],c.namespace),a.readElementConfig(this,c.namespace),i),n=s||l(this).data("featherlight-persisted")||new a(o,t);"shared"===n.persist?s=n:!1!==n.persist&&l(this).data("featherlight-persisted",n),t.$currentTarget.blur(),n.open(e)}),r},current:function(){var e=this.opened();return e[e.length-1]||null},opened:function(){var t=this;return o(),l.grep(r,function(e){return e instanceof t})},close:function(e){var t=this.current();if(t)return t.close(e)},_onReady:function(){var t=this;t.autoBind&&(l(t.autoBind).each(function(){t.attach(l(this))}),l(document).on("click",t.autoBind,function(e){e.isDefaultPrevented()||"featherlight"===e.namespace||(e.preventDefault(),t.attach(l(e.currentTarget)),l(e.target).trigger("click.featherlight"))}))},_callbackChain:{onKeyUp:function(e,t){return 27===t.keyCode?(this.closeOnEsc&&l.featherlight.close(t),!1):e(t)},onResize:function(e,t){if(this.$content.naturalWidth){var n=this.$content.naturalWidth,r=this.$content.naturalHeight;this.$content.css("width","").css("height","");var o=Math.max(n/parseInt(this.$content.parent().css("width"),10),r/parseInt(this.$content.parent().css("height"),10));1<o&&this.$content.css("width",n/o+"px").css("height",r/o+"px")}return e(t)},afterContent:function(e,t){var n=e(t);return this.onResize(t),n}}}),l.featherlight=s,l.fn.featherlight=function(e,t){return s.attach(this,e,t)},l(document).ready(function(){s._onReady()})}else"console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery.");function s(e,t){if(!(this instanceof s)){var n=new s(e,t);return n.open(),n}this.id=s.id++,this.setup(e,t),this.chainCallbacks(s._callbackChain)}}(jQuery);
!function(r){"use strict";var e=function(e){window.console&&window.console.warn&&window.console.warn("FeatherlightGallery: "+e)};if(void 0===r)return e("Too much lightness, Featherlight needs jQuery.");if(!r.featherlight)return e("Load the featherlight plugin before the gallery plugin");var n="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,t=r.event&&r.event.special.swipeleft&&r,i=window.Hammer&&function(e){var n=new window.Hammer.Manager(e[0]);return n.add(new window.Hammer.Swipe),n},a=n&&(t||i);n&&!a&&e("No compatible swipe library detected; one must be included before featherlightGallery for swipe motions to navigate the galleries.");var s={afterClose:function(e,n){var t=this;return t.$instance.off("next."+t.namespace+" previous."+t.namespace),t._swiper&&(t._swiper.off("swipeleft",t._swipeleft).off("swiperight",t._swiperight),t._swiper=null),e(n)},beforeOpen:function(e,n){var t=this;return t.$instance.on("next."+t.namespace+" previous."+t.namespace,function(e){var n="next"===e.type?1:-1;t.navigateTo(t.currentNavigation()+n)}),a?t._swiper=a(t.$instance).on("swipeleft",t._swipeleft=function(){t.$instance.trigger("next")}).on("swiperight",t._swiperight=function(){t.$instance.trigger("previous")}):t.$instance.find("."+t.namespace+"-content").append(t.createNavigation("previous")).append(t.createNavigation("next")),e(n)},onKeyUp:function(e,n){var t={37:"previous",39:"next"}[n.keyCode];return t?(this.$instance.trigger(t),!1):e(n)}};function o(e,n){if(!(this instanceof o)){var t=new o(r.extend({$source:e,$currentTarget:e.first()},n));return t.open(),t}r.featherlight.apply(this,arguments),this.chainCallbacks(s)}r.featherlight.extend(o,{autoBind:"[data-featherlight-gallery]"}),r.extend(o.prototype,{previousIcon:"&#9664;",nextIcon:"&#9654;",galleryFadeIn:100,galleryFadeOut:300,slides:function(){return this.filter?this.$source.find(this.filter):this.$source},images:function(){return e("images is deprecated, please use slides instead"),this.slides()},currentNavigation:function(){return this.slides().index(this.$currentTarget)},navigateTo:function(e){var n=this,t=n.slides(),i=t.length,a=n.$instance.find("."+n.namespace+"-inner");return e=(e%i+i)%i,n.$currentTarget=t.eq(e),n.beforeContent(),r.when(n.getContent(),a.fadeTo(n.galleryFadeOut,.2)).always(function(e){n.setContent(e),n.afterContent(),e.fadeTo(n.galleryFadeIn,1)})},createNavigation:function(e){var n=this;return r('<span title="'+e+'" class="'+this.namespace+"-"+e+'"><span>'+this[e+"Icon"]+"</span></span>").click(function(){r(this).trigger(e+"."+n.namespace)})}}),r.featherlightGallery=o,r.fn.featherlightGallery=function(e){return o.attach(this,e)},r(document).ready(function(){o._onReady()})}(jQuery);
$(document).ready(function(){var e=$("#touch-menu"),n=$(".menu");$(e).on("click",function(e){e.preventDefault(),n.slideToggle()}),$(window).resize(function(){767<$(window).width()&&n.is(":hidden")&&n.removeAttr("style")})});
!function(n,e,i,t){var s="keepTheRhythm",o={baseLine:24,verticalAlignment:"center",spacing:"padding"};function h(i,t){this.element=i,this.options=n.extend({},o,t),this._defaults=o,this._name=s,this.init()}h.prototype={init:function(){var i=n(this.element),t=this;n(e).resize(function(){t.fixRhythm(i)}).trigger("resize")},fixRhythm:function(i){var t=i.height(),n=this.options.baseLine-t%this.options.baseLine;n==this.options.baseLine&&(n=0);var e=0,s=n;"center"==this.options.verticalAlignment?s=n-(e=n/2):"bottom"==this.options.verticalAlignment&&(e=n,s=0),"margin"==this.options.spacing?i.css({marginTop:e+"px",marginBottom:s+"px"}):i.css({paddingTop:e+"px",paddingBottom:s+"px"})}},n.fn[s]=function(i){return this.each(function(){n.data(this,"plugin_"+s)||n.data(this,"plugin_"+s,new h(this,i))})}}(jQuery,window,document);
!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&module.exports?module.exports=t():e.Rellax=t()}("undefined"!=typeof window?window:global,function(){var h=function(e,t){"use strict";var b=Object.create(h.prototype),l=0,x=0,p=0,T=0,d=[],o=!0,n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},r=null,i=window.cancelAnimationFrame||window.mozCancelAnimationFrame||clearTimeout,c=window.transformProp||function(){var e=document.createElement("div");if(null===e.style.transform){var t=["Webkit","Moz","ms"];for(var o in t)if(void 0!==e.style[t[o]+"Transform"])return t[o]+"Transform"}return"transform"}();b.options={speed:-2,center:!1,wrapper:null,relativeToWrapper:!1,round:!0,vertical:!0,horizontal:!1,callback:function(){}},t&&Object.keys(t).forEach(function(e){b.options[e]=t[e]}),e||(e=".rellax");var s="string"==typeof e?document.querySelectorAll(e):[e];if(!(0<s.length))throw new Error("The elements you're trying to select don't exist.");if(b.elems=s,b.options.wrapper&&!b.options.wrapper.nodeType){var a=document.querySelector(b.options.wrapper);if(!a)throw new Error("The wrapper you're trying to use don't exist.");b.options.wrapper=a}var u=function(){for(var e=0;e<d.length;e++)b.elems[e].style.cssText=d[e].style;d=[],x=window.innerHeight,T=window.innerWidth,m(),function(){for(var e=0;e<b.elems.length;e++){var t=f(b.elems[e]);d.push(t)}}(),o&&(window.addEventListener("resize",u),o=!1),y()},f=function(e){var t=e.getAttribute("data-rellax-percentage"),o=e.getAttribute("data-rellax-speed"),n=e.getAttribute("data-rellax-zindex")||0,r=b.options.wrapper?b.options.wrapper.scrollTop:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;b.options.relativeToWrapper&&(r=(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)-b.options.wrapper.offsetTop);var i=b.options.vertical&&(t||b.options.center)?r:0,s=b.options.horizontal&&(t||b.options.center)?window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft:0,a=i+e.getBoundingClientRect().top,l=e.clientHeight||e.offsetHeight||e.scrollHeight,p=s+e.getBoundingClientRect().left,d=e.clientWidth||e.offsetWidth||e.scrollWidth,c=t||(i-a+x)/(l+x),u=t||(s-p+T)/(d+T);b.options.center&&(c=u=.5);var f=o||b.options.speed,m=z(u,c,f),w=e.style.cssText,y="";if(0<=w.indexOf("transform")){var h=w.indexOf("transform"),v=w.slice(h),g=v.indexOf(";");y=g?" "+v.slice(11,g).replace(/\s/g,""):" "+v.slice(11).replace(/\s/g,"")}return{baseX:m.x,baseY:m.y,top:a,left:p,height:l,width:d,speed:f,style:w,transform:y,zindex:n}},m=function(){var e=l,t=p;if(l=b.options.wrapper?b.options.wrapper.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset,p=b.options.wrapper?b.options.wrapper.scrollLeft:(document.documentElement||document.body.parentNode||document.body).scrollLeft||window.pageXOffset,b.options.relativeToWrapper){var o=(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset;l=o-b.options.wrapper.offsetTop}return!(e==l||!b.options.vertical)||!(t==p||!b.options.horizontal)},z=function(e,t,o){var n={},r=o*(100*(1-e)),i=o*(100*(1-t));return n.x=b.options.round?Math.round(r):Math.round(100*r)/100,n.y=b.options.round?Math.round(i):Math.round(100*i)/100,n},w=function(){m()&&!1===o&&y(),r=n(w)},y=function(){for(var e,t=0;t<b.elems.length;t++){var o=(l-d[t].top+x)/(d[t].height+x),n=(p-d[t].left+T)/(d[t].width+T),r=(e=z(n,o,d[t].speed)).y-d[t].baseY,i=e.x-d[t].baseX,s=d[t].zindex,a="translate3d("+(b.options.horizontal?i:"0")+"px,"+(b.options.vertical?r:"0")+"px,"+s+"px) "+d[t].transform;b.elems[t].style[c]=a}b.options.callback(e)};return b.destroy=function(){for(var e=0;e<b.elems.length;e++)b.elems[e].style.cssText=d[e].style;o||(window.removeEventListener("resize",u),o=!0),i(r),r=null},u(),w(),b.refresh=u,b};return h});
!function(e){jQuery.scrollSpeed=function(n,o,t){var h,l=e(document),r=e(window),u=e("html, body"),a=t||"default",c=0,d=!1,f=l.height()>r.height(),s=l.width()>r.width();if(window.navigator.msPointerEnabled)return!1;r.on("mousewheel DOMMouseScroll",function(t){var e=t.originalEvent.wheelDeltaY,i=t.originalEvent.detail;return f=l.height()>r.height(),s=l.width()>r.width(),d=!0,f&&(h=r.height(),(e<0||0<i)&&(c=c+h>=l.height()?c:c+=n),(0<e||i<0)&&(c=c<=0?0:c-=n),u.stop().animate({scrollTop:c},o,a,function(){d=!1})),s&&(h=r.width(),(e<0||0<i)&&(c=c+h>=l.width()?c:c+=n),(0<e||i<0)&&(c=c<=0?0:c-=n),u.stop().animate({scrollLeft:c},o,a,function(){d=!1})),!1}).on("scroll",function(){f&&!d&&(c=r.scrollTop()),s&&!d&&(c=r.scrollLeft())}).on("resize",function(){f&&!d&&(h=r.height()),s&&!d&&(h=r.width())})},jQuery.easing.default=function(t,e,i,n,o){return-n*((e=e/o-1)*e*e*e-1)+i}}(jQuery);
!function(f){f.fn.viewportChecker=function(o){var r={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(o,t){},scrollHorizontal:!1,scrollBox:window};f.extend(r,o);var t=this,c={height:f(r.scrollBox).height(),width:f(r.scrollBox).width()};return this.checkElements=function(){var n,d;d=r.scrollHorizontal?(n=Math.max(f("html").scrollLeft(),f("body").scrollLeft(),f(window).scrollLeft()))+c.width:(n=Math.max(f("html").scrollTop(),f("body").scrollTop(),f(window).scrollTop()))+c.height,t.each(function(){var o=f(this),t={},e={};if(o.data("vp-add-class")&&(e.classToAdd=o.data("vp-add-class")),o.data("vp-remove-class")&&(e.classToRemove=o.data("vp-remove-class")),o.data("vp-add-class-full-view")&&(e.classToAddForFullView=o.data("vp-add-class-full-view")),o.data("vp-keep-add-class")&&(e.removeClassAfterAnimation=o.data("vp-remove-after-animation")),o.data("vp-offset")&&(e.offset=o.data("vp-offset")),o.data("vp-repeat")&&(e.repeat=o.data("vp-repeat")),o.data("vp-scrollHorizontal")&&(e.scrollHorizontal=o.data("vp-scrollHorizontal")),o.data("vp-invertBottomOffset")&&(e.scrollHorizontal=o.data("vp-invertBottomOffset")),f.extend(t,r),f.extend(t,e),!o.data("vp-animated")||t.repeat){0<String(t.offset).indexOf("%")&&(t.offset=parseInt(t.offset)/100*c.height);var a=t.scrollHorizontal?o.offset().left:o.offset().top,s=t.scrollHorizontal?a+o.width():a+o.height(),l=Math.round(a)+t.offset,i=t.scrollHorizontal?l+o.width():l+o.height();t.invertBottomOffset&&(i-=2*t.offset),l<d&&n<i?(o.removeClass(t.classToRemove),o.addClass(t.classToAdd),t.callbackFunction(o,"add"),s<=d&&n<=a?o.addClass(t.classToAddForFullView):o.removeClass(t.classToAddForFullView),o.data("vp-animated",!0),t.removeClassAfterAnimation&&o.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){o.removeClass(t.classToAdd)})):o.hasClass(t.classToAdd)&&t.repeat&&(o.removeClass(t.classToAdd+" "+t.classToAddForFullView),t.callbackFunction(o,"remove"),o.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&f(document).bind("touchmove MSPointerMove pointermove",this.checkElements),f(r.scrollBox).bind("load scroll",this.checkElements),f(window).resize(function(o){c={height:f(r.scrollBox).height(),width:f(r.scrollBox).width()},t.checkElements()}),this.checkElements(),this}}(jQuery);
$(function(){$(".ans").hide(),$(".ask").click(function(){$(this).parent().toggleClass("acc").siblings().removeClass("acc"),$(".ans").slideUp(),$(this).next().is(":visible")||$(this).next().slideDown()})});
$(document).ready(function(){$("a[href*=#]").bind("click",function(t){t.preventDefault();var e=$(this).attr("href");return"#"!==e&&$("html, body").stop().animate({scrollTop:$(e).offset().top-50},2e3,function(){}),!1})});

jQuery(document).ready(function(){jQuery(".left").addClass("jump-left").viewportChecker({classToAdd:"left-show",offset:100,repeat:!0}),jQuery(".right").addClass("jump-right").viewportChecker({classToAdd:"right-show",offset:100,repeat:!0}),$.featherlightGallery.prototype.afterContent=function(){var e=this.$currentTarget.find("img").attr("title");this.$instance.find(".caption").remove(),$('<div class="caption">').appendTo(this.$instance.find(".featherlight-content")),$("<div>").text(e).appendTo(this.$instance.find(".caption"))}});var $window=$(window),$header=$(".sticky-header"),scrolling=!1,previousTop=0,scrollDelta=10,scrollOffset=250;function autoHideHeader(){var e=$window.scrollTop();e<10?$header.removeClass("is-hidden"):scrollDelta<previousTop-e?$header.removeClass("is-hidden"):scrollDelta<e-previousTop&&scrollOffset<e&&$header.addClass("is-hidden"),previousTop=e,scrolling=!1}$window.on("scroll",function(){scrolling||(scrolling=!0,window.requestAnimationFrame?requestAnimationFrame(autoHideHeader):setTimeout(autoHideHeader,250))});