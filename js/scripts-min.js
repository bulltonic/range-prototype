$(document).ready(function(){$("body").removeClass("loading");var a=$(document),e="[data-rangeslider]",t=$(e);document;a.on("input",'input[type="range"], '+e,function(a){}),t.rangeslider({polyfill:!1,rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",onInit:function(){$(".rangeslider__handle").attr("data-value","70").append('<span class="arrows"></span>'),$(".range-content").each(function(a){$this=$(this),70>$this.data("value-min")&&70<$this.data("value-max")&&($(".range-content").removeClass("active"),$this.addClass("active"))})},onSlide:function(a,e){if($(".rangeslider__handle").attr("data-value",e),$(".range-content .value").text(e),e<100){var t="$"+(t=2335-17.73247*e).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");$(".range-content .built-home .value-amount").text(t),$(".range-content .old-home .value-amount").text("$0")}else{var n="$"+(n=125-7.73247*e).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");$(".range-content .built-home .value-amount").text("$0"),$(".range-content .old-home .value-amount").text(n)}$(".range-content").each(function(a){$this=$(this),e>$this.data("value-min")&&e<$this.data("value-max")&&($(".range-content").removeClass("active"),$this.addClass("active")),e<$this.data("value-min")||e>$this.data("value-max")?$this.hasClass("active")&&$this.addClass("disabled"):$(".range-content").removeClass("disabled")})},onSlideEnd:function(a,e){$(".range-content").each(function(a){$this=$(this),e>$this.data("value-min")&&e<$this.data("value-max")&&($(".range-content").removeClass("active"),$this.addClass("active"))})}})});
//# sourceMappingURL=maps/scripts-min.js.map
