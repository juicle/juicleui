(function($) {
	"use strict";
	$.fn.extend({
		"AutoComplete": function(q) {
			return this.each(function() {
				if (!(this && this.tagName === "INPUT" && this.type === "text")) {
					return
				}
				if (this.controller) {
					this.controller.setOption(q)
				} else {
					if ($.isPlainObject(q)) {
						this.controller = new f(this, q)
					}
				}
			})
		}
	});
	var f = function(q, r) {
		this.option = $.extend(false, {
			"width": 320,
			"maxHeight": null,
			"itemHeight": null,
			"listStyle": "normal",
			"listDirection": "down",
			"data": [],
			"ajaxDataType": "json",
			"ajaxParams": {},
			"ajaxTimeout": 3000,
			"ajaxType": "GET",
			"maxItems": 20,
			"matchHandler": n,
			"emphasisHandler": m,
			"createItemHandler": null,
			"beforeLoadDataHandler": null,
			"afterSelectedHandler": null,
			"async": false,
			"emphasis": true,
			"onerror": null
		}, r);
		b.apply(this, [q]);
		j.apply(this)
	};
	var b = function(q) {
		var r = this;
		this.inputView = $(q);
		this.inputView.attr("autocomplete", "off").keyup(this._keyup = function(s) {
			switch (s.keyCode) {
				case 13:
				case 16:
				case 17:
				case 37:
				case 38:
				case 39:
				case 40:
					break;
				case 27:
					e.apply(r);
					break;
				default:
					if (r.option.async) {
						setTimeout(function() {
							h.apply(r)
						}, 0)
					} else {
						h.apply(r)
					}
			}
		}).keydown(this._keydown = function(t) {
			switch (t.keyCode) {
				case 38:
					p.apply(r, ["up"]);
					break;
				case 40:
					p.apply(r, ["down"]);
					break;
				case 13:
					var s = r.searchView.is(":visible");
					c.apply(r);
					if (s) {
						return false
					}
					break
			}
		}).blur(this._blur = function() {
			$(document).one("click", function() {
				e.apply(r)
			})
		})
	};
	var j = function() {
		var q = this;
		this.searchView = $("<div class='autocomplete'><ul></ul></div>").appendTo(document.body).on("mouseenter", "li", function() {
			q.searchView.find("li.selected").removeClass("selected");
			$(this).addClass("selected")
		}).on("mouseleave", "li", function() {
			$(this).removeClass("selected")
		}).on("click", "li", function() {
			c.apply(q);
			e.apply(q)
		}).css("font-size", this.inputView.css("font-size"));
		$(window).resize(function() {
			k.apply(q)
		})
	};
	var i = function(q) {
		var s = this,
			r = this.searchView.find("ul").empty();
		if ($.inArray(this.option.listStyle, ["normal", "iconList", "custom"]) == -1) {
			throw ["遇到未知的listStyle参数！"]
		}
		$.each(q, function(u, w) {
			var v = $("<li><div></div></li>").appendTo(r).addClass(s.option.listStyle).data("data", w).find("div");
			switch (s.option.listStyle) {
				case "normal":
					v.append("<span>" + w.label + "</span>");
					break;
				case "iconList":
					var t = $("<img></img>").attr("src", w.image);
					v.append($("<div></div>").append(t)).append("<span>" + w.label + "</span>");
					break;
				case "custom":
					v.append(s.option.createItemHandler.apply(s, [u, w]));
				case "default":
					break
			}
			if (s.option.itemHeight > 0) {
				v.height(s.option.itemHeight).css("max-height", s.option.itemHeight)
			}
		})
	};
	var k = function() {
		if (this.option.listDirection === "down") {
			var r = this.inputView.offset().top + this.inputView.outerHeight()
		} else {
			if (this.option.listDirection === "up") {
				var r = this.inputView.offset().top - this.searchView.outerHeight()
			} else {
				throw "遇到未知的listDirection参数！"
			}
		}
		var q = this.inputView.offset().left;
		this.searchView.css("top", r + "px").css("left", q + "px")
	};
	var d = function() {
		if (typeof(this.option.width) === "string" && this.option.width.toLowerCase() === "auto") {
			return this.inputView.outerWidth() - 2
		} else {
			if (typeof(this.option.width) === "number") {
				return this.option.width
			} else {
				throw "遇到未知的width参数！"
			}
		}
	};
	var l = function(q) {
		var s = this;
		if (this.option.listDirection === "up") {
			q = q.reverse()
		}
		try {
			i.apply(s, [q]);
			if (this.option.maxHeight > 0) {
				this.searchView.css("max-height", this.option.maxHeight + "px");
				if ($.browser.msie) {
					this.searchView.css("height", this.searchView.height() > this.option.maxHeight ? this.option.maxHeight + "px" : "auto")
				}
			}
			k.apply(this);
			this.searchView.css("width", d.apply(this) + "px")
		} catch (r) {
			o.apply(this, [r + ""]);
			return
		}
		this.searchView.show();
		p.apply(this, [this.option.listDirection])
	};
	var e = function() {
		this.searchView.find("ul").empty();
		this.searchView.hide()
	};
	var p = function(s) {
		var t = this.searchView.find("li.selected");
		if (t.size()) {
			var q = s === "up" ? t.prev() : t.next()
		} else {
			var q = s === "up" ? this.searchView.find("li").last() : this.searchView.find("li").first()
		}
		if (q.size()) {
			this.searchView.find("li").removeClass("selected");
			q.addClass("selected");
			var u = q.outerHeight();
			var r = q.position().top;
			if (u + r > this.searchView.height()) {
				this.searchView.scrollTop(this.searchView.scrollTop() + r + u - this.searchView.height())
			} else {
				if (r < 0) {
					this.searchView.scrollTop(this.searchView.scrollTop() + r)
				}
			}
		}
	};
	var c = function() {
		var r = this,
			q = this.searchView.find("li.selected");
		if (q.size()) {
			var s = q.data("data");
			this.inputView.val(s.value);
			if ($.isFunction(this.option.afterSelectedHandler)) {
				try {
					this.option.afterSelectedHandler.apply(r, [s])
				} catch (t) {
					o.apply(this, ["调用afterSelectedHandler错误:" + t]);
					return
				}
			}
			e.apply(this)
		}
	};
	var a = function(q) {
		jQuery.support.cors = true;
		var s = this,
			t = [],
			r = {
				"async": false,
				"dataType": s.option.ajaxDataType,
				"type": s.option.ajaxType,
				"timeout": this.option.ajaxTimeout,
				"success": function(u, w, v) {
					if (s.option.ajaxDataType === "xml") {
						$(u).find("item").each(function() {
							var z = {
								"value": $(this).text(),
								"label": $(this).text()
							};
							for (var y = 0; y < this.attributes.length; y++) {
								var x = this.attributes[y].nodeName,
									A = this.attributes[y].nodeValue;
								z[x] = A
							}
							t.push(z)
						})
					} else {
						if (s.option.ajaxDataType === "json") {
							t = u
						} else {
							throw "遇到未知的ajaxDataType参数！"
						}
					}
				},
				"error": function(u, w, v) {
					throw v
				}
			};
		if ($.isPlainObject(this.option.ajaxParams)) {
			r["data"] = $.extend(false, {
				"keyword": q
			}, this.option.ajaxParams)
		} else {
			if ($.isFunction(this.option.ajaxParams)) {
				r["data"] = $.extend(false, {
					"keyword": q
				}, this.option.ajaxParams.apply(this, [q]))
			} else {
				if (typeof(this.option.ajaxParams) === "string") {
					r["data"] = "keyword=" + q + "&" + this.option.ajaxParams
				} else {
					throw "遇到未知的ajaxParams参数！"
				}
			}
		}
		$.ajax(this.option.data, r);
		return t
	};
	var h = function() {
		var t = this,
			s = this.inputView.val(),
			u = [],
			r = true,
			q = [];
		if ($.trim(s).length == 0) {
			e.apply(t);
			return
		}
		if ($.isFunction(this.option.beforeLoadDataHandler)) {
			try {
				r = this.option.beforeLoadDataHandler.apply(this, [s])
			} catch (v) {
				o.apply(this, ["调用beforeLoadDataHandler错误:" + v]);
				return
			}
		}
		if (r) {
			if ($.isArray(this.option.data)) {
				u = this.option.data
			} else {
				if ($.isFunction(this.option.data)) {
					try {
						u = this.option.data.apply(this, [s])
					} catch (v) {
						o.apply(this, ["调用data错误:" + v]);
						return
					}
				} else {
					if (typeof(this.option.data) === "string") {
						try {
							u = a.apply(this, [s])
						} catch (v) {
							o.apply(this, ["Ajax错误:" + v]);
							return
						}
					} else {
						o.apply(this, ["遇到未知的data参数！"]);
						return
					}
				}
			}
		}
		$.each(u, function(w, y) {
			if (t.option.maxItems > 0 && q.length >= t.option.maxItems) {
				return false
			}
			if ($.isPlainObject(y)) {
				var x = $.extend(false, {}, y)
			} else {
				if (typeof(y) === "string") {
					var x = {
						"label": y,
						"value": y,
						"image": y
					}
				} else {
					o.apply(t, ["数据源Item类型错误！"]);
					return false
				}
			}
			if (t.option.matchHandler.apply(t, [s, x])) {
				q.push(x)
			}
		});
		if (s == this.inputView.val()) {
			if (q.length > 0) {
				l.apply(this, [q])
			} else {
				e.apply(this)
			}
		}
	};
	var o = function(q) {
		if ($.isFunction(this.option.onerror)) {
			this.option.onerror.apply(this, [q])
		}
	};
	f.prototype.setOption = function(q) {
		if ($.isPlainObject(q)) {
			this.option = $.extend(false, this.option, q)
		} else {
			if (typeof(q) === "string") {
				switch (q) {
					case "destroy":
						this.destroy();
						break;
					case "show":
						this.show();
						break;
					default:
						o.apply(this, ["未知的AutoComplete参数！"]);
						return
				}
			} else {
				o.apply(this, ["未知的AutoComplete参数类型！"]);
				return
			}
		}
	};
	f.prototype.destroy = function() {
		this.searchView.remove();
		this.inputView.unbind("keyup", this._keyup).unbind("keydown", this._keydown).unbind("blur", this._blur);
		delete this.inputView.get(0).controller
	};
	f.prototype.show = function() {
		if (this.option.async) {
			setTimeout(function() {
				h.apply(this)
			}, 0)
		} else {
			h.apply(this)
		}
	};
	var n = function(q, s) {
		var r = RegExp(q.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i");
		if (this.option.emphasis && $.isFunction(this.option.emphasisHandler)) {
			this.option.emphasisHandler.apply(this, [q, s])
		}
		return r.test(s.value)
	};
	var m = function(q, s) {
		var r = RegExp("(" + q.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") + ")", "ig");
		s.label = s.label.replace(r, "<em>$1</em>")
	}
})(jQuery);