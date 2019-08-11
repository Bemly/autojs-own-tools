"ui";

var ctx;
(function(scope) {if ("libs_inthis" in scope) { //CreateJS
	ctx = libs_inthis;
} else if ("ModPE" in scope) { //以ModPE脚本加载(BlockLauncher及衍生App)//application
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
} else if ("activity" in scope) { //以AutoJS脚本加载（UI模式）
	ctx = activity;
} else if ("context" in scope) { //以AutoJS脚本加载（非UI模式）
	ctx = context;
} else if ("World" in scope) { //在Inner Core中加载
	ctx = Packages.zhekasmirnov.launcher.utils.UIUtils.getContext();
} else { //default
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
}}(this));


var times = -1
var tick = -1
var state = -1

function toast(a) {
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			android.widget.Toast.makeText(ctx, a, android.widget.Toast.LENGTH_SHORT).show();
		},
	}));
}
var err = function(e) {
			var throwable = new java.lang.Throwable(e);
			var msg = e + "\n";
			var stack = throwable.getStackTrace();
			for (var i in stack) {
				msg += ("at " + stack[i].getClassName() +
					"." + stack[i].getMethodName() +
					"(" + stack[i].getFileName() +
					":" + stack[i].getLineNumber() + ")\n");
			}
			print(msg)
		}


var PixelGenerator = {

	file: null,
	succeed: true,

	width: null,
	height: null,

	fix_height: null,
	fix_width: null,

	gx:0, 
	gz:0,

	multiple: 20,
	increment: 4,
	water: -1,
	optimization: 128,
	quality: 5,

	speed: 1,
	fixed_height: null,

	arr_x: new Array(),
	arr_y: new Array(),
	arr_map: new Array(),

	generating: false,
	g_progress: 0,
	g_ad: 0,

	loading: false,
	l_progress: 0,

	toRGB: function(color) {
		return [color >>> 24, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff];
	},

	toHSV: function(color) {
		var max = Math.max(Math.max(color[1], color[2]), color[3]);
		var min = Math.min(Math.min(color[1], color[2]), color[3]);
		if (color[1] == max) {
			var H = (color[2] - color[3]) / (max - min);
		}
		if (color[2] == max) {
			var H = 2 + (color[3] - color[1]) / (max - min);
		}
		if (color[3] == max) {
			var H = 4 + (color[1] - color[2]) / (max - min);
		}

		H = H * 60;
		if (H < 0) {
			H = H + 360;
		}

		var V = Math.max(color[1], color[2], color[3]);
		var S = (max - min) / max;
		return [color[0], H, S, V];
	},

	loadImage: function(file, onLoading, onComplete) {
		if (!(new java.io.File(file)).exists()) {
			toast("文件不存在！");
			return;
		}
		this.file = file;
		this.loading = true;
		this.l_progress = 0;
		var th = new java.lang.Thread(new java.lang.Runnable({
			run: function() { try{
				var bmp = android.graphics.BitmapFactory.decodeFile(file);
				PixelGenerator.width = bmp.getWidth();
				PixelGenerator.height = bmp.getHeight();
				
				
				
				var ad = 100 / (PixelGenerator.width / PixelGenerator.quality) / (PixelGenerator.height / PixelGenerator.quality);

				toast("正在读取图片：" + file + "\nWidth: " + PixelGenerator.width + ", Height: " + PixelGenerator.height);

				//PixelGenerator.arr_x = PixelGenerator.arr_y = [], 
				PixelGenerator.arr_x.length = 0;
				PixelGenerator.fix_height = Math.ceil(PixelGenerator.height / PixelGenerator.quality);
				PixelGenerator.fix_width = Math.ceil(PixelGenerator.width / PixelGenerator.quality);

				for (var x = 0; x < PixelGenerator.width; x += PixelGenerator.quality) {
					PixelGenerator.arr_y = []
					for (var y = 0; y < PixelGenerator.height; y += PixelGenerator.quality) {
						PixelGenerator.arr_y.push(Math.round(PixelGenerator.toHSV(PixelGenerator.toRGB(bmp.getPixel(x, y)))[3] * PixelGenerator.multiple / 256 + PixelGenerator.increment))
						PixelGenerator.l_progress += ad;
					}
					PixelGenerator.arr_x.push(PixelGenerator.arr_y);
				}
				PixelGenerator.loading = false;
				PixelGenerator.succeed = true;
				PixelGenerator.l_progress = 100;
				PixelGenerator.fixed_height = Math.ceil(PixelGenerator.fix_height / PixelGenerator.optimization)
				toast("读取完成");
				
			}catch(e) {
				err(new Error("读取失败"));
				PixelGenerator.loading = false;
				PixelGenerator.succeed = false;
				PixelGenerator.l_progress = 0;
				
			}}
		}));
		th.start();
	},

	//modpe functions
	modpe_setWater: function(x, y, z) {
		if (PixelGenerator.water != -1) {
			if (y < PixelGenerator.water) {
				for (var h = y + 1; h <= PixelGenerator.water; h++) {
					Level.setTile(x, h, z, 9, 0)
				}
			}
		}
	},
	modpe_setBlocks: function(x, y, z) {
		var layer = 0;
		for (var h = y; h > 0; h--) {
			if (layer == 0) {
				Level.setTile(x, h, z, 2, 0)
			} else if (layer < 4) {
				Level.setTile(x, h, z, 3, 0)
			} else {
				Level.setTile(x, h, z, 1, 0)
			}
			this.modpe_setWater(x, y, z);
			layer++
		}
	},
}




var SimpleListAdapter = (function() {
	var r = function(arr, maker, binder, params) {
		//arr是列表数组，maker(holder, params)生成基础view，binder(holder, element, index, array, params)修改view使其实现指定的界面
		var src = arr,
			holders = [],
			dso = [],
			controller;
		controller = new r.Controller(src, holders, dso, maker, binder, params);
		return new android.widget.ListAdapter({
			getCount: function() {
				return src.length;
			},
			getItem: function(pos) {
				if (pos == -1) return controller;
				return src[pos];
			},
			getItemId: function(pos) {
				return pos;
			},
			getItemViewType: function(pos) {
				return 0;
			},
			getView: function(pos, convert, parent) {
				var holder;
				try {
					if (!convert || !(convert.getTag() in holders)) {
						holder = {};
						convert = maker(holder, params);
						holder.self = convert;
						convert.setTag(holders.length.toString());
						holders.push(holder);
					}
					holder = holders[convert.getTag()];
					holder.pos = parseInt(pos);
					binder(holder, src[pos], parseInt(pos), src, params);
					return convert;
				} catch (e) {
					var a = new android.widget.TextView(ctx);
					a.setText(e + "\n" + e.stack);
					return a;
				}
			},
			getViewTypeCount: function() {
				return 1;
			},
			hasStableIds: function() {
				return true;
			},
			isEmpty: function() {
				return src.length === 0;
			},
			areAllItemsEnabled: function() {
				return true;
			},
			isEnabled: function(pos) {
				return pos >= 0 && pos < src.length;
			},
			registerDataSetObserver: function(p) {
				if (dso.indexOf(p) >= 0) return;
				dso.push(p);
			},
			unregisterDataSetObserver: function(p) {
				var i = dso.indexOf(p);
				if (p >= 0) dso.splice(i, 1);
			}
		});
	}
	r.Controller = function(array, holders, dso, maker, binder, params) {
		this.array = array;
		this.holders = holders;
		this.dso = dso;
		this.maker = maker;
		this.binder = binder;
		this.params = params;
	}
	r.Controller.prototype = {
		clearHolder: function() {
			var i;
			for (i in this.holders) {
				this.holders[i].self.setTag("");
			}
			this.holders.length = 0;
			this.notifyChange();
		},
		getHolder: function(view) {
			return this.holders[view.getTag()];
		},
		notifyChange: function() {
			var o = this;
			o.dso.forEach(function(e) {
				if (e) e.onChanged();
			});
		},
		notifyInvalidate: function() {
			this.dso.forEach(function(e) {
				if (e) e.onInvalidated();
			});
		},
		rebind: function(pos) {
			var i;
			for (i in this.holders) {
				if (this.holders[i].pos == pos) {
					this.binder(this.holders[i], this.array[pos], parseInt(pos), this.array, this.params);
				}
			}
		},
		setArray: function(a) {
			if (this.array != a) {
				this.array.length = 0;
				for (var i in a) this.array.push(a[i]);
			}
			this.notifyChange();
		},
		add: function(ele, isNotify) {
			this.array.push(ele);
			if (isNotify) this.notifyChange();
		},
		get: function(index) {
			return this.array[index];
		},
		getAll: function() {
			return this.array;
		},
	}
	r.getController = function(adapter) {
		var r = adapter.getItem(-1);
		r.self = adapter;
		return r;
	}
	return r;
})();

var ResourceDownloader = {
	saveByInputStream: function(path, inputStream, isCover, isInputStreamClose) {
		try {
			var file = new java.io.File(path);
			if (!file.exists()) {
				file.createNewFile();
				isCover = true;
			}
			if (isCover == false) {
				if (isInputStreamClose) inputStream.close();
				return;
			}
			var buffer = new java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
			var outputStream = new java.io.FileOutputStream(file);
			var len = -1;
			while ((len = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, len);
			}
			if (isInputStreamClose) inputStream.close();
			outputStream.flush();
			outputStream.close();
		} catch (error) {
			err(error)
		}
	},
	getInputStream: function(url, headers) {
		try {
			var urlConnect = new java.net.URL(url);
			var connection = urlConnect.openConnection();
			if (headers != null) {
				for (var i in headers) {
					connection.setRequestProperty(headers[i][0], headers[i][1]);
				}
			}
			connection.setDoInput(true);
			connection.connect();
			return [connection.getContentLength(), connection.getInputStream()];
		} catch (e) {
			return "";
		}
	},
}


var MinecraftWidget = {

	gs: null,
	
	showing: false,

	wx: 200,
	wy: 200,

	ui: function(func) {
		ctx.runOnUiThread(new java.lang.Runnable({
			run: func,
		}));

	},

	dm: ctx.getResources().getDisplayMetrics(),
	dip: function(size) {
		return this.dm.density * size;
	},
	typefont: android.graphics.Typeface.createFromFile("/storage/emulated/0/tencent/QQfile_recv/MinecraftFont.ttf"),

	generateNinePatchDrawable: function(src) {
		var source = android.graphics.BitmapFactory.decodeFile(src);
		var ninepatch = new android.graphics.NinePatch(source, source.getNinePatchChunk());
		if (source.getNinePatchChunk() != null) {
			return new android.graphics.drawable.NinePatchDrawable(ninepatch);
		} else {
			return new android.graphics.drawable.BitmapDrawable(source);
		}
	},
	npatchres: {},
	data: {},
	applyMinecraftStyleTextView: function(textView, textSize) {
		textView.setTypeface(this.typefont);
		textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, textSize || this.dip(14));
		textView.setTextColor(android.graphics.Color.argb(125, 0, 0, 0));
		textView.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
		textView.setPaintFlags(textView.getPaintFlags() | android.graphics.Paint.SUBPIXEL_TEXT_FLAG);
		textView.setAllCaps(false);
	},

	WindowLinearLayout: function s(width, height) {
		var llayout = new android.widget.LinearLayout(ctx);
		llayout.setLayoutParams(new android.widget.LinearLayout.LayoutParams(width, height));
		llayout.setPadding(20, 20, 20, 20);
		llayout.setGravity(android.view.Gravity.CENTER | android.view.Gravity.TOP);
		llayout.setOrientation(android.widget.LinearLayout.VERTICAL);
		llayout.setBackgroundDrawable(this.npatchres.background_window);
		return llayout;
	},
	LinearLayout: function s(width, height) {
		var llayout = new android.widget.LinearLayout(ctx);
		llayout.setLayoutParams(new android.widget.LinearLayout.LayoutParams(width, height));
		llayout.setPadding(4, 4, 4, 4);
		llayout.setGravity(android.view.Gravity.CENTER | android.view.Gravity.TOP);
		llayout.setOrientation(android.widget.LinearLayout.VERTICAL);
		llayout.setBackgroundDrawable(this.npatchres.background_list);
		return llayout;
	},
	EditText: function s(width, height) {
		s.o = this.npatchres;
		var edit = new android.widget.EditText(ctx);
		edit.setLayoutParams(new android.widget.LinearLayout.LayoutParams(width, height));
		edit.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER);
		edit.setPadding(8, 5, 5, 5);
		edit.setSingleLine(true);
		this.applyMinecraftStyleTextView(edit);
		edit.setTextColor(android.graphics.Color.WHITE);
		edit.setBackgroundDrawable(s.o.text_edit_base);
		edit.setOnTouchListener(new android.view.View.OnTouchListener({
			onTouch: function onTouchFunction(view, event) {
				switch (event.getAction()) {
					case event.ACTION_DOWN:
						edit.setBackgroundDrawable(s.o.text_edit_hover);
						break;
					case event.ACTION_OUTSIDE:
						edit.setBackgroundDrawable(s.o.text_edit_base);
						break;
				}
				return false;
			},
		}));
		/*var gradient = new android.graphics.drawable.GradientDrawable();
		gradient.setColor(android.graphics.Color.GREEN);
		gradient.setSize(4, 40);
		var field = java.lang.Class.forName("android.widget.EditText").getDeclaredField("textCursorDrawable");
		field.setAccessible(true);
		field.set(edit, gradient);*/
		return edit;
	},
	TextView: function s(width, height, text) {
		var tv = new android.widget.TextView(ctx);
		tv.setLayoutParams(new android.widget.LinearLayout.LayoutParams(width, height));
		//tv.getLayoutParams().setMargins(this.dip(2), this.dip(2), this.dip(2), this.dip(2));
		tv.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER);
		this.applyMinecraftStyleTextView(tv);
		tv.setLineSpacing(this.dip(4), 1);
		tv.setText(text);
		return tv;
	},
	Button: function s(width, height, text, onc) {
		s.press = "unpress";
		s.hover = "nohover";
		s.o = this.npatchres;
		var button = new android.widget.TextView(ctx);
		button.setLayoutParams(new android.widget.LinearLayout.LayoutParams(width, height));
		//button.getLayoutParams().setMargins(this.dip(2), this.dip(2), this.dip(2), this.dip(2));
		button.setGravity(android.view.Gravity.CENTER | android.view.Gravity.CENTER);
		this.applyMinecraftStyleTextView(button);
		if (text) button.setText(text);
		button.setSingleLine(true);
		button.setBackgroundDrawable(s.o.button_unpress_nohover);
		button.setOnTouchListener(new android.view.View.OnTouchListener({
			onTouch: function onTouchFunction(view, event) {
				switch (event.getAction()) {
					case event.ACTION_DOWN:
						s.press = "press";
						s.hover = "hover";
						break;
					case event.ACTION_UP:
						s.press = "unpress";
						s.hover = "nohover"
						break;
					case event.ACTION_CANCEL:
						s.press = "unpress";
						s.hover = "nohover"
						break;
				}
				view.setBackgroundDrawable(s.o["button_" + s.press + "_" + s.hover]);
				if (s.hover == "hover") {
					view.setTextColor(android.graphics.Color.parseColor("#E1E1E1"));
				} else {
					view.setTextColor(android.graphics.Color.argb(125, 0, 0, 0));
				}
				return false;
			},
		}));
		if (onc) button.setOnClickListener(new android.view.View.OnClickListener({
			onClick: function(v) {
				onc(v);
				return true;
			},
		}));
		return button;
	},
	ScrollLayout: function(width, height) {
		var sl = new android.widget.ScrollView(ctx);
		sl.setPadding(4, 4, 4, 4);
		sl.setBackgroundDrawable(this.npatchres.background_list);
		sl.setLayoutParams(new android.widget.LinearLayout.LayoutParams(width, height));
		return sl;
	},

	init: function() {
		toast("Loading...");

		var list = ["background_window.9.png", "button_unpress_nohover.9.png", "button_unpress_hover.9.png", "button_press_nohover.9.png", "button_press_hover.9.png", "text_edit_base.9.png", "text_edit_hover.9.png", "background_list.9.png", "close_button_default.png", "close_button_pressed.png"];
		var rp = android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/pixelgenerator/";

		(new java.io.File(rp)).mkdirs();

		for (var i in list) {
			var is = ResourceDownloader.getInputStream("https://gitee.com/eskarton/NeteaseCloudMusic.js/raw/master/miencraftui/9png/" + list[i])[1];
			ResourceDownloader.saveByInputStream(rp + list[i], is, true, true);
		}

		this.npatchres.background_window = this.generateNinePatchDrawable(rp + "background_window.9.png");
		this.npatchres.button_unpress_nohover = this.generateNinePatchDrawable(rp + "button_unpress_nohover.9.png");
		this.npatchres.button_unpress_hover = this.generateNinePatchDrawable(rp + "button_unpress_hover.9.png");
		this.npatchres.button_press_nohover = this.generateNinePatchDrawable(rp + "button_press_nohover.9.png");
		this.npatchres.button_press_hover = this.generateNinePatchDrawable(rp + "button_press_hover.9.png");
		this.npatchres.text_edit_base = this.generateNinePatchDrawable(rp + "text_edit_base.9.png");
		this.npatchres.text_edit_hover = this.generateNinePatchDrawable(rp + "text_edit_hover.9.png");
		this.npatchres.background_list = this.generateNinePatchDrawable(rp + "background_list.9.png");
		this.npatchres.close_unpress = android.graphics.BitmapFactory.decodeFile(rp + "close_button_default.png");
		this.npatchres.close_press = android.graphics.BitmapFactory.decodeFile(rp + "close_button_pressed.png");

		this.data.main = {
			title: "Pixel Generator",
			root: true,
			args: [{
				text: "图片质量\n设置图片的质量(1=原图，10=最佳优化)\n注意：图片质量越高，加载时间越长，反之越短。",
				value: PixelGenerator.quality,
				onclick: function(value) {
					PixelGenerator.quality = Math.min(Math.max(1, Number(value)), 10);
				},
			}, {
				text: "地形最大高度\n设置地形最大高度(5~255)\n高度越高，生成的图片越精细",
				value: PixelGenerator.multiple,
				onclick: function(value) {
					PixelGenerator.multiple = Math.min(Math.max(5, Number(value)), 255);
				},
			},  {
				text: "水的高度\n设置填充水最大高度(5~255)\n高度越高，生成的图片越精细",
				value: PixelGenerator.water,
				onclick: function(value) {
					PixelGenerator.water = ((Number(value) == -1) ? -1 : (Math.min(Math.max(5, Number(value)), 255)));
				},
			}, 
			{
				text: "Y轴偏移高度\n设置y轴(竖直)高度偏移量(0~20)",
				value: PixelGenerator.increment,
				onclick: function(value) {
					PixelGenerator.increment = Math.min(Math.max(0, Number(value)), 20);
				},
			}, 
			{
				text: "生成单位\n设置生成单位\n(32~256)\n注意：不建议修改！",
				value: PixelGenerator.optimization,
				onclick: function(value) {
					PixelGenerator.optimization = Math.min(Math.max(0, Number(value)), 20);
				},
			}, ],
			view: function(self) {
				
				self.llayout.setLayoutParams(new android.widget.LinearLayout.LayoutParams(MinecraftWidget.dm.widthPixels / 2 - 48, MinecraftWidget.dm.heightPixels - 78 - MinecraftWidget.dip(75)));
				self.$2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(MinecraftWidget.dm.widthPixels / 2 - 48, MinecraftWidget.dm.heightPixels - 78 - MinecraftWidget.dip(75)));
				self.$2.getLayoutParams().setMargins(0, 10, 0, 0);
				
				self._imginfo = new android.widget.LinearLayout(ctx);
				self._imginfo.setLayoutParams(new android.widget.LinearLayout.LayoutParams(self.w, MinecraftWidget.dip(100)));
				self._imginfo.setGravity(android.view.Gravity.CENTER | android.view.Gravity.LEFT);
				self._imginfo.setOrientation(android.widget.LinearLayout.HORIZONTAL);
				self._imginfo.getLayoutParams().setMargins(0, 0, 0, MinecraftWidget.dip(20));
				self._imgpre = new android.widget.ImageView(ctx);
				self._imgpre.setLayoutParams(new android.widget.LinearLayout.LayoutParams(MinecraftWidget.dip(100), MinecraftWidget.dip(100)));
				self._imgpre.setScaleType(android.widget.ImageView.ScaleType.CENTER_CROP);
				self._imginfo.addView(self._imgpre);
				self._if = MinecraftWidget.TextView(self.w - MinecraftWidget.dip(100), MinecraftWidget.dip(100), PixelGenerator.file + "\n源(宽度: " + (self._bmp ? self._bmp.getWidth() : "-") + ", 高度: " + (self._bmp ? self._bmp.getHeight() : "-") + ")\n压缩(宽度: " + (self._bmp ? self._bmp.getWidth() / PixelGenerator.quality : "-") + ", 高度: " + (self._bmp ? self._bmp.getHeight() / PixelGenerator.quality : "-") + ")");
				self._if.setPadding(MinecraftWidget.dip(5), 0, 0, 0);
				self._if.setTextColor(android.graphics.Color.WHITE);
				self._if.setGravity(android.view.Gravity.CENTER | android.view.Gravity.LEFT);
				self._imginfo.addView(self._if);
				self.llayout.addView(self._imginfo);

				self._oplay = new android.widget.LinearLayout(ctx);
				self._oplay.setLayoutParams(new android.widget.LinearLayout.LayoutParams(self.w, MinecraftWidget.dip(50)));
				self._oplay.setGravity(android.view.Gravity.CENTER | android.view.Gravity.CENTER);
				self._oplay.setOrientation(android.widget.LinearLayout.HORIZONTAL);
				self._oplay.getLayoutParams().setMargins(0, 0, 0, MinecraftWidget.dip(20));
				self._choose = MinecraftWidget.Button(self.w / 2, MinecraftWidget.dip(50), "选择图片", function(v) {
					MinecraftWidget.animation(self.g, 200, new android.view.animation.DecelerateInterpolator(), [
						{key: "translationX", start: 0, end: - MinecraftWidget.dm.widthPixels / 4},
						{key: "alpha", start: 1, end: 0},
					], function() {
						self.$.dismiss();
					});
					MinecraftWidget.show_window(MinecraftWidget.data.fp);
				});
				self._oplay.addView(self._choose);
				self._reload = MinecraftWidget.Button(self.w / 2, MinecraftWidget.dip(50), "加载", function(v) {
					if (PixelGenerator.file) {
						self._if.setText(PixelGenerator.file + "\n源(宽度: " + (self._bmp ? self._bmp.getWidth() : "-") + ", 高度: " + (self._bmp ? self._bmp.getHeight() : "-") + ")\n压缩(宽度: " + (self._bmp ? self._bmp.getWidth() / PixelGenerator.quality : "-") + ", 高度: " + (self._bmp ? self._bmp.getHeight() / PixelGenerator.quality : "-") + ")\n加载中，请不要关闭窗口");
						self._generate.setEnabled(false);
						self.clickable(false);
						PixelGenerator.loadImage(PixelGenerator.file);
						self.starthread();
					} else {
						toast("未选择文件")
					}
				});
				self._oplay.addView(self._reload);
				self.llayout.addView(self._oplay);

				self._alay = new android.widget.LinearLayout(ctx);
				self._alay.setLayoutParams(new android.widget.LinearLayout.LayoutParams(self.w, -2));
				self._alay.setGravity(android.view.Gravity.CENTER | android.view.Gravity.CENTER);
				self._alay.getLayoutParams().setMargins(0, 0, 0, MinecraftWidget.dip(20));
				self._alay.setOrientation(android.widget.LinearLayout.VERTICAL);
				self._a = MinecraftWidget.TextView(self.w, -2, "参数设置\n注意：参数修改完成后要重新加载图片");
				self._a.setPadding(0, 0, 0, MinecraftWidget.dip(10));
				self._a.setTextColor(android.graphics.Color.WHITE);
				self._a.setGravity(android.view.Gravity.CENTER | android.view.Gravity.LEFT);
				self._alay.addView(self._a);

				self._t = {};
				for (var i in this.args) {
					var args = this.args;
					self._t["_$t" + i] = MinecraftWidget.TextView(self.w, -2, this.args[i].text);
					self._t["_$t" + i].setPadding(0, 0, 0, MinecraftWidget.dip(10));
					self._t["_$t" + i].setTextColor(android.graphics.Color.WHITE);
					self._t["_$t" + i].setGravity(android.view.Gravity.CENTER | android.view.Gravity.LEFT);
					self._alay.addView(self._t["_$t" + i]);

					self._t["_$o" + i] = new android.widget.LinearLayout(ctx);
					self._t["_$o" + i].setLayoutParams(new android.widget.LinearLayout.LayoutParams(self.w, MinecraftWidget.dip(40)));
					self._t["_$o" + i].setGravity(android.view.Gravity.CENTER | android.view.Gravity.CENTER);
					self._t["_$o" + i].setOrientation(android.widget.LinearLayout.HORIZONTAL);
					self._t["_$o" + i].getLayoutParams().setMargins(0, 0, 0, MinecraftWidget.dip(5));
					self._t["_$r" + i] = MinecraftWidget.Button(MinecraftWidget.dip(40), MinecraftWidget.dip(40), "-", function(v) {
						self._t["_$e" + (v.getId() - 10)].setText(String(Number(self._t["_$e" + (v.getId() - 10)].getText()) - 1));

					});
					self._t["_$r" + i].setId(10 + Number(i));
					self._t["_$o" + i].addView(self._t["_$r" + i]);
					self._t["_$e" + i] = MinecraftWidget.EditText(self.w - MinecraftWidget.dip(155), MinecraftWidget.dip(40));
					self._t["_$e" + i].setText(String(this.args[i].value));
					self._t["_$o" + i].addView(self._t["_$e" + i]);
					self._t["_$p" + i] = MinecraftWidget.Button(MinecraftWidget.dip(40), MinecraftWidget.dip(40), "+", function(v) {
						self._t["_$e" + (v.getId() - 30)].setText(String(Number(self._t["_$e" + (v.getId() - 30)].getText()) + 1));
						//toast(v.getId())
					});
					self._t["_$p" + i].setId(30 + Number(i));
					self._t["_$o" + i].addView(self._t["_$p" + i]);
					self._t["_$b" + i] = MinecraftWidget.Button(MinecraftWidget.dip(75), MinecraftWidget.dip(40), "修改", function(v) {
						args[v.getId() - 50].onclick(MinecraftWidget.data.main.args[(v.getId() - 50)].value = self._t["_$e" + (v.getId() - 50)].getText());
						self._if.setText(PixelGenerator.file + "\n源(宽度: " + (self._bmp ? self._bmp.getWidth() : "-") + ", 高度: " + (self._bmp ? self._bmp.getHeight() : "-") + ")\n压缩(宽度: " + (self._bmp ? self._bmp.getWidth() / PixelGenerator.quality : "-") + ", 高度: " + (self._bmp ? self._bmp.getHeight() / PixelGenerator.quality : "-") + ")");
						//toast(v.getId())
					});
					self._t["_$b" + i].setId(50 + Number(i));
					self._t["_$o" + i].addView(self._t["_$b" + i]);
					self._alay.addView(self._t["_$o" + i]);
					delete args;
				}
				self.llayout.addView(self._alay);
				
				self._about = MinecraftWidget.Button(self.w, MinecraftWidget.dip(50), "关于", function(v) {
					MinecraftWidget.animation(self.g, 200, new android.view.animation.DecelerateInterpolator(), [
						{key: "translationX", start: 0, end: - MinecraftWidget.dm.widthPixels / 4},
						{key: "alpha", start: 1, end: 0},
					], function() {
						self.$.dismiss();
					});
					MinecraftWidget.show_window(MinecraftWidget.data.about);
				});
				
				self.llayout.addView(self._about);
				
				self.clickable = function(b) {
					self._reload.setEnabled(b);
					self._choose.setEnabled(b);
					for (var i in MinecraftWidget.data.main.args) {
						self._t["_$r" + i].setEnabled(b);
						self._t["_$p" + i].setEnabled(b);
						self._t["_$b" + i].setEnabled(b);
					}
				}
				
				self.starthread = function() {
					
				self.thread_getprogress = new java.lang.Thread(new java.lang.Runnable({
					run: function() {if(PixelGenerator.loading && MinecraftWidget.showing) {
						MinecraftWidget.ui(function(){
							self._reload.setText(String(Math.round(PixelGenerator.l_progress)) + "%");
						});
						self.thread_getprogress.sleep(50);//防止卡死
						self.thread_getprogress.run();
					} else if(!PixelGenerator.loading && MinecraftWidget.showing){
						MinecraftWidget.ui(function(){
							self.clickable(true);
							if(PixelGenerator.succeed) { 
								self._generate.setEnabled(true);
								self._generate.setText("开始生成");
							}
							self._if.setText(PixelGenerator.file + "\n源(宽度: " + (self._bmp ? self._bmp.getWidth() : "-") + ", 高度: " + (self._bmp ? self._bmp.getHeight() : "-") + ")\n压缩(宽度: " + (self._bmp ? self._bmp.getWidth() / PixelGenerator.quality : "-") + ", 高度: " + (self._bmp ? self._bmp.getHeight() / PixelGenerator.quality : "-") + ")");
							self._reload.setText("加载");
						});
						//return;
					} else {
						//return;
					}}
				}));
				self.thread_getprogress.start();
				}
				
			},
			dismiss: function(self) {

			},
			_spec: function(self) {
				self._generate = MinecraftWidget.Button(MinecraftWidget.dm.widthPixels / 2 - 40, MinecraftWidget.dip(50), (PixelGenerator.generating ? "停止生成" : (PixelGenerator.arr_x.length ? "开始生成" : "未就绪")), function(v) {
					if(PixelGenerator.generating) {
						if (state != -1) {
							tick = -1
							PixelGenerator.generating = false;
							toast("已停止");
						}
					} else if(!PixelGenerator.generating){
						if (tick == -1) {
							state = 0
							times = 0
							tick = 0
							PixelGenerator.generating = true;
							PixelGenerator.gx = Player.getX();
							PixelGenerator.gz = Player.getZ();
							PixelGenerator.g_ad = 100 / Math.floor(PixelGenerator.fix_height / PixelGenerator.optimization) / PixelGenerator.fix_width;
							self._generate.setText("停止生成");
							self.clickable(false);
							self.starthread2();
							toast("开始生成" + PixelGenerator.file)
						}
					}
				});
				self._generate.getLayoutParams().setMargins(0, 20, 0, 0);
				self.$1.addView(self._generate);
				
				self.starthread2 = function(){
				self.thread_getprogress2 = new java.lang.Thread(new java.lang.Runnable({
					run: function() {if(PixelGenerator.generating && MinecraftWidget.showing) {
						MinecraftWidget.ui(function(){
							self.ti.setText("Pixel Generator | 生成中(" + Math.round(PixelGenerator.g_progress) + "%)");
						});
						self.thread_getprogress2.sleep(50);//防止卡死
						self.thread_getprogress2.run();
					} else if(!PixelGenerator.generating && MinecraftWidget.showing){
						MinecraftWidget.ui(function(){
							self.clickable(true);
							self.ti.setText("Pixel Generator");
							self._generate.setText("开始生成");
						});
						//return;
					} else {
						//return;
					}}
				}));
				self.thread_getprogress2.start();
				}
				
				if(!PixelGenerator.succeed || PixelGenerator.arr_x.length == 0 || PixelGenerator.loading) self._generate.setEnabled(false);
				if(PixelGenerator.file && PixelGenerator.loading) {
					self.clickable(false);
					self.starthread();
				}if(PixelGenerator.generating) {
					self.clickable(false);
					self.starthread2();
				}
				
				(new java.lang.Thread(new java.lang.Runnable({
					run: function() {
						if (PixelGenerator.file) MinecraftWidget.ui(function(){self._imgpre.setImageBitmap(self._bmp = android.graphics.BitmapFactory.decodeFile(PixelGenerator.file));});
					},
				}))).start();
			},
		}
		this.data.fp = {
			title: "Choose a image file",
			view: function(self) {
				self._storage = "/sdcard";
				self._loadPath = function(fi) {
					self._list.measure(0, 0);
					MinecraftWidget.animation(self._list, 75, new android.view.animation.DecelerateInterpolator(), [
						{key: "translationX", start: 0, end: -self._if.getMeasuredWidth() / 2},
						{key: "alpha", start: 1, end: 0},
					], function() {
						
					self._listAdapter.setArray([]);
					if (fi != "/sdcard") {
						self._listAdapter.add({
							name: "...",
							path: java.io.File(fi).getParent(),
						});
					}

					var path = java.io.File(fi).listFiles();
					for (var i in path) {
						self._listAdapter.add({
							name: (function() {
								var p = String(path[i]).split("/");
								return p[p.length - 1];
							}()),
							path: path[i],
						});
					}
					self._listAdapter.notifyChange();
					
					MinecraftWidget.animation(self._list, 75, new android.view.animation.DecelerateInterpolator(), [
						{key: "translationX", start: -self._if.getMeasuredWidth() / 2, end: 0},
						{key: "alpha", start: 0, end: 1},
					]);
					
					});
					
				}
				self._if = MinecraftWidget.TextView(self.w, -2, self._storage);
				self._if.setTextColor(android.graphics.Color.WHITE);
				self._if.setGravity(android.view.Gravity.CENTER | android.view.Gravity.LEFT);
				self.llayout.addView(self._if);
				self._if.measure(0, 0);
				self._list = new android.widget.ListView(ctx);
				self._list.setLayoutParams(new android.widget.LinearLayout.LayoutParams(self.w, MinecraftWidget.dm.heightPixels - 98 - MinecraftWidget.dip(25) - self._if.getMeasuredHeight()));
				self._listAdapter = SimpleListAdapter.getController(new SimpleListAdapter([], function(holder, params) {
					var click = holder.btn = MinecraftWidget.Button(-1, MinecraftWidget.dip(35));
					return click;
				}, function(holder, element, index, array, params) {
					holder.btn.setText(element.name);
				}));
				self._list.setAdapter(self._listAdapter.self);
				self._list.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener({
					onItemClick: function(parent, view, pos, id) {
						var item = self._listAdapter.get(pos);
						self._listAdapter.clearHolder();
						self._storage = item.path;
						if ((new java.io.File(self._storage)).isFile()) {
							var sp = String(item.path).split(".");
							if (sp[sp.length - 1].toLowerCase() == "jpg" || sp[sp.length - 1].toLowerCase() == "png" || sp[sp.length - 1].toLowerCase() == "jpeg") {
								PixelGenerator.file = item.path;
								MinecraftWidget.show_window(MinecraftWidget.data.main);
								MinecraftWidget.animation(self.g, 200, new android.view.animation.DecelerateInterpolator(), [
									{key: "translationX", start: 0, end: -MinecraftWidget.dm.widthPixels / 4},
									{key: "alpha", start: 1, end: 0},
								], function() {
									self.$.dismiss();
								});
							} else {
								toast("不是图片！");
							}
						} else {
							MinecraftWidget.ui(function(){
								self._if.setText(String(item.path));
								self._list.setLayoutParams(new android.widget.LinearLayout.LayoutParams(self.w, MinecraftWidget.dm.heightPixels - 98 - MinecraftWidget.dip(25) - self._if.getMeasuredHeight()));
							});
							self._loadPath(self._storage);
						}
					},
				}));
				self.llayout.addView(self._list);
			},
			dismiss: function(self) {
				MinecraftWidget.show_window(MinecraftWidget.data.main);
			},
			_spec: function(self) {
				self._loadPath(self._storage);
			}, 
		}
		this.data.about = {
			title: "About",
			view: function(self) {
				self._a = MinecraftWidget.TextView(self.w, -2, "Pixel Generator v1.0\n\nAuthor: \n你的名字(生成算法)\nStageGuard(GUI/优化)");
				self._a.setPadding(0, 0, 0, MinecraftWidget.dip(10));
				self._a.setTextColor(android.graphics.Color.WHITE);
				self._a.setGravity(android.view.Gravity.CENTER | android.view.Gravity.LEFT);
				
				self.llayout.addView(self._a);
				
			},
			dismiss: function(self) {
				MinecraftWidget.show_window(MinecraftWidget.data.main);
			},
		}
		MinecraftWidget.show_suspension();
	},


	show_suspension: function self() {
		if (MinecraftWidget.gs == null){this.showing = false; this.ui(function() {
			var susV = new android.view.View(ctx);
			susV.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(255, 125, 45, 155)));
			susV.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -1));
			susV.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(view) {
					MinecraftWidget.show_window(MinecraftWidget.data.main);
					MinecraftWidget.dismiss_suspension();
					return true;
				},
			}));
			susV.setOnTouchListener(new android.view.View.OnTouchListener({
				onTouch: function onTouchFunction(view, event) {
					switch (event.getAction()) {
						case event.ACTION_MOVE:
							MinecraftWidget.gs.update(
								MinecraftWidget.wx = self.x = event.getRawX() + onTouchFunction.offsetX, MinecraftWidget.wy = self.y = event.getRawY() + onTouchFunction.offsetY, -1, -1);
							break;
						case event.ACTION_DOWN:
							onTouchFunction.offsetX = self.x - event.getRawX();
							onTouchFunction.offsetY = self.y - event.getRawY();
							break;
					}
					return false;
				},
			}));
			MinecraftWidget.gs = new android.widget.PopupWindow(ctx);
			MinecraftWidget.gs.setFocusable(false);
			MinecraftWidget.gs.setContentView(susV);
			MinecraftWidget.gs.setWidth(MinecraftWidget.dip(45));
			MinecraftWidget.gs.setHeight(MinecraftWidget.dip(45));
			MinecraftWidget.gs.showAtLocation(ctx.getWindow().getDecorView(), 00, self.x = MinecraftWidget.wx, self.y = MinecraftWidget.wy);
			
		});
	}},
	dismiss_suspension: function() {
		this.ui(function() {
			if (MinecraftWidget.gs != null) MinecraftWidget.gs.dismiss();
			MinecraftWidget.gs = null;
		});
	},
	show_window: function(data) {
		this.showing = true;
		this.ui(function() {
			try {
				var self = {};
				self.g = new android.widget.LinearLayout(ctx);
				self.g.setGravity(android.view.Gravity.RIGHT | android.view.Gravity.CENTER);

				self.$1 = MinecraftWidget.WindowLinearLayout(MinecraftWidget.dm.widthPixels / 2, MinecraftWidget.dm.heightPixels);
				self.$1.setGravity(android.view.Gravity.RIGHT | android.view.Gravity.CENTER);
				self.$1.setOrientation(android.widget.LinearLayout.VERTICAL);

				self.title = new android.widget.RelativeLayout(ctx);
				self.title.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(MinecraftWidget.dm.widthPixels / 2 - 40, MinecraftWidget.dip(25)));

				self.ti = MinecraftWidget.TextView(MinecraftWidget.dm.widthPixels / 2 - 40, MinecraftWidget.dip(25), String(data.title));
				self.ti.setGravity(android.view.Gravity.CENTER | android.view.Gravity.CENTER);
				self.title.addView(self.ti);

				self.close = new android.widget.ImageView(ctx);
				self.close.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(MinecraftWidget.dip(25), MinecraftWidget.dip(25)));
				self.close.getLayoutParams().addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
				self.close.setScaleType(android.widget.ImageView.ScaleType.CENTER_CROP);
				self.close.setImageBitmap(MinecraftWidget.npatchres.close_unpress);
				self.close.setOnTouchListener(new android.view.View.OnTouchListener({
					onTouch: function onTouchFunction(view, event) {
						switch (event.getAction()) {
							case event.ACTION_DOWN:
								view.setImageBitmap(MinecraftWidget.npatchres.close_press);
								break;
							case event.ACTION_UP:
								view.setImageBitmap(MinecraftWidget.npatchres.close_unpress);
								break;
							case event.ACTION_CANCEL:
								view.setImageBitmap(MinecraftWidget.npatchres.close_unpress);
								break;
						}
						return false;
					},
				}));
				self.close.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(view) {
						data.dismiss(self);
						if (data.root) MinecraftWidget.show_suspension();
						MinecraftWidget.animation(self.g, 250, new android.view.animation.DecelerateInterpolator(), [
							{key: "translationX", start: 0, end: MinecraftWidget.dm.widthPixels / 4},
							{key: "alpha", start: 1, end: 0},
						], function() {
							self.$.dismiss();
						});
						return true;
					},
				}));
				self.title.addView(self.close)
				self.$1.addView(self.title);
				
				self.$2 = MinecraftWidget.ScrollLayout(MinecraftWidget.dm.widthPixels / 2 - 40, MinecraftWidget.dm.heightPixels - 50 - MinecraftWidget.dip(25));
				self.$2.getLayoutParams().setMargins(0, 10, 0, 0);
				self.llayout = new android.widget.LinearLayout(ctx);
				self.llayout.setLayoutParams(new android.widget.LinearLayout.LayoutParams(MinecraftWidget.dm.widthPixels / 2 - 48, MinecraftWidget.dm.heightPixels - 58 - MinecraftWidget.dip(25)));
				self.llayout.setGravity(android.view.Gravity.CENTER | android.view.Gravity.TOP);
				self.llayout.setOrientation(android.widget.LinearLayout.VERTICAL);
				self.llayout.setPadding(20, 20, 20, 20);
				self.w = MinecraftWidget.dm.widthPixels / 2 - 88;
				data.view(self);
				self.$2.addView(self.llayout);
				self.$1.addView(self.$2)
				
				if(data._spec) data._spec(self);
				
				self.g.addView(self.$1)
				self.$ = new android.widget.PopupWindow(ctx);
				self.$.setFocusable(true);
				self.$.setContentView(self.g);
				self.$.setWidth(MinecraftWidget.dm.widthPixels);
				self.$.setHeight(MinecraftWidget.dm.heightPixels);
				self.$.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(0));
				self.$.showAtLocation(ctx.getWindow().getDecorView(), 00, 0, 0);
			
				MinecraftWidget.animation(self.g, 250, new android.view.animation.DecelerateInterpolator(), [
					{key: "translationX", start: MinecraftWidget.dm.widthPixels / 2, end: 0},
					{key: "alpha", start: 0, end: 1},
				]);
				
				
			} catch (e) {
				err(e)
			}
		});
	}, animation: function(object, duration, interpolator, objJSON, endEvent) {
						MinecraftWidget.ui(function() {
							var objectAnimator;
							for (var i in objJSON) {
								objectAnimator = android.animation.ObjectAnimator.ofFloat(object, objJSON[i].key, [objJSON[i].start, objJSON[i].end]);
								objectAnimator.setDuration(duration);
								objectAnimator.setInterpolator(interpolator);
								if (i == objJSON.length - 1) {
									objectAnimator.addListener(new android.animation.Animator.AnimatorListener({
										onAnimationstart: function() {},
										onAnimationEnd: (typeof(endEvent) != "function") ? function() {} : endEvent,
										onAnimationRepeat: function() {},
										onAnimationCancel: function() {},
									}));
								}
								objectAnimator.start();
							}
						});
	},
};
MinecraftWidget.init();


function modTick() {
	if (tick >= 0) {
		if (tick < PixelGenerator.speed) {
			tick++
		} else {
			tick = 0
			if (times >= 0 && times != PixelGenerator.fixed_height - 1) {
				if (state >= 0) {
					for (var y = PixelGenerator.optimization * times; y < PixelGenerator.optimization * (times + 1); y++) {
						PixelGenerator.modpe_setBlocks(PixelGenerator.gx + state, PixelGenerator.arr_x[state][y], PixelGenerator.gz + y);
					}
					state++;
					if(!(state % PixelGenerator.optimization)) {
						Entity.setPosition(Player.getEntity(), PixelGenerator.gx + state, Player.getY(), (times + 0.5) * PixelGenerator.optimization + PixelGenerator.gz)
					}
				}
				if (state >= PixelGenerator.fix_width - 1) {
					state = 0
					times++
				}
			} else {
				if (state >= 0) {
					for (var y = PixelGenerator.optimization * times; y < PixelGenerator.fix_height; y++) {
						PixelGenerator.modpe_setBlocks(PixelGenerator.gx + state, PixelGenerator.arr_x[state][y], PixelGenerator.gz + y);
					}
					state++;
					if(!(state % PixelGenerator.optimization)) {
						Entity.setPosition(Player.getEntity(), PixelGenerator.gx + state, Player.getY(), (times + 0.5) * PixelGenerator.optimization + PixelGenerator.gz)
					}
				}
				if (state >= PixelGenerator.fix_width - 1) {
					state = -1
					times = -1
					tick = -1
					PixelGenerator.g_progress = 0;
					PixelGenerator.generating = false;
					toast("生成完成")
				}
			}
			PixelGenerator.g_progress += PixelGenerator.g_ad;
		}
	}
}