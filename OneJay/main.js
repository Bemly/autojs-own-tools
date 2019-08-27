"ui";
"use strict";

/*进入是home有推荐之类的，然后头顶是音乐
点击音乐右边小按钮拉出抽屉搜索用，里面含一个tab
选择模式，然后背景随tab自由切换，然后选中歌就跳出
歌曲页面，关闭右抽屉，然后点击评论拉出左边的评论区
home的左侧抽屉是设置，歌曲是评论区，右侧是始终搜索*/

//--------Global
var isSearch = 0; //判断用的参数 已无法拓展
var hasSearchList = []; //判断是否继续运行搜索的数组

function errToast(err) {
    if (err) {
        return alert("Error:连接出错(不要慌)", "请查看当前网络是否正常,\n并重新刷新几次\n如果不行请联系作者\n" + err);
    }
}

function chooseView(inflate, code, data) {
    ui[inflate[0]].removeAllViews();
    ui[inflate[0]].addView(inflate[1], new android.widget.FrameLayout.LayoutParams(-1, -1));
    data && data[0](data[1]);
    !this.inited && code();
    this.inited = true;
}
ui.layout(
    <drawer id="drawer">
        <frame>
            <frame id="global">
                <!--main-->
            </frame>
            <frame id="background">
                <!--float-->
            </frame>
        </frame>
        <frame id="left" layout_gravity="left" h="*" w="*">
        </frame>
        <frame id="right" layout_gravity = "right" h="*" w="*">
        </frame>
    </drawer>
);

//--------Home<=Main
let homeView = {
    ui: {
        common: ui.inflate(
            <button id="home_toSearch" text="主页"/>)
    },
    code: {
        common: function() {
            ui.home_toSearch.click(() => musicView.loader.home());
        }
    },
    loader: {
        common: function() {
            chooseView.apply(homeView, [
                ["global", homeView.ui.common], homeView.code.common
            ]);
        }
    }
};

//--------Music<=Main
let musicView = {
    ui: {
        common: ui.inflate(
            <vertical>
                    <horizontal>
                        <button w="120" id="music_cancelButton" text="返回"/>
                        <button w="120" id="music_search" text="搜索"/>
                        <button w="*" id="music_message" text="评论"/>
                    </horizontal>
                    <list id="music_Main" w="*">
                        <vertical w="*">
                            <img src="{{this.cover_url}}" h="50"/>
                            <img src="{{this.up_img}}" h="50"/>
                            <text text="作者:{{this.author}}"/>
                            <text text="up主:{{this.up_name}}"/>
                            <text text="简介:{{this.intro}}"/>
                            <text text="{{this.lyric}}"/>
                        </vertical>
                    </list>
                </vertical>
        )
    },
    code: {
        common: function() {
            ui.music_message.click(() => {
                ui.drawer.openDrawer(ui.left);
            });
            ui.music_search.click(() => {
                ui.drawer.openDrawer(ui.right);
            });
            ui.music_cancelButton.click(() => {
                homeView.loader.common();
            });
        },
        home: function() {
            ui.music_Main.setDataSource([{
                cover_url: "http://i0.hdslb.com/bfs/music/612f20986a02ea42ad4f9be98cab6b7a8fdd32fc.jpg",
                up_img: "http://i0.hdslb.com/bfs/music/612f20986a02ea42ad4f9be98cab6b7a8fdd32fc.jpg",
                author: "",
                up_name: "",
                lyric: ""
                intro: ""                
            }]);
        },
        search: {
            bili: function(data) {
                http.get("http://api.bilibili.com/audio/music-service-c/songs/playing?song_id=" + data, {}, function(res, err) {
                    errToast(err);
                    ui.music_lyr.setDataSource([{text: "加载中..."}]);
                    let getMusic = res.body.json().data;
                    ui.run(function() {
                        ui.music_Main.setDataSource([getMusic]);
                    });
                    if (getMusic.lyric_url === "") {
                        ui.run(function() {
                            ui.music_lyr.setDataSource([{text: "无歌词"}]);
                        });
                    } else {
                        http.get(getMusic.lyric_url, {}, function(res, err) {
                            ui.run(function() {
                                ui.music_lyr.setDataSource([{text: res.body.string()}]);
                                ui.music_lyric.setText("{{this.text}}");
                            });
                        });
                    }
                });
            }
        } //[cover_url, [author, up_name], up_img, intro, qualities[type, desc, bps, tag]]
    },
    loader: {
        home: function() {
            chooseView.apply(musicView, [
                ["global", musicView.ui.common], musicView.code.common, [musicView.code.home, null]
            ]);
        },
        search: {
            bili: function(data) {
                chooseView.apply(musicView, [
                    ["global", musicView.ui.common], musicView.code.common, [musicView.code.search.bili, data]
                ]);
            }
        }
    }
};

//--------Message<=left
let messageView = {
    ui: {
        bili: ui.inflate(
            <button id="message_main" text="评论"/>)
    },
    code: {
        bili: function() {
            ui.message_main.click(() => ui.drawer.closeDrawers());
        }
    },
    loader: {
        bili: function() {
            chooseView.apply(messageView, [
                ["left", messageView.ui.bili], messageView.code.bili
            ]);
        }
    }
};

//--------Setter<=left
let setterView = {
    ui: {
        common: ui.inflate(<button id="set_main" text="设置"/>)
    },
    code: {
        common: function() {
            ui.set_main.click(() => ui.drawer.closeDrawers());
        }
    },
    loader: {
        common: function() {
            chooseView.apply(setterView, [
                ["left", setterView.ui.common], setterView.code.common
            ]);
        }
    }
};

//--------Search<=right
let searchView = {
    ui: {
        bili: ui.inflate(
            <vertical>
                    <horizontal w="*">
                        <button w="100" id="search_bili_inputButton" text="轰炸b站"/>
                        <input id="search_bili_inputKey" w="*" hint="输入信息"/>
                    </horizontal>
                    <list id="search_bili_list">
                        <vertical w="*">
                            <img src="{{this.cover}}" h="80" w="80"/>
                            <text text="题目:{{this.title}}"/>
                            <text text="名字:{{this.up_name}}"/>
                            <text text="播放数:{{this.play_count}}"/>
                            <text text="评论数:{{this.review_count}}"/>
                            <text text="id:{{this.id}}"/>
                            <text text="{{this.play_url_list[0].url}}"/>
                        </vertical>
                    </list>
                </vertical>
        )
    },
    code: {
        bili: function() {
            function checkInput(inputSearch, hasSearch) { //搜索第一类  
                http.get(inputSearch, {}, function(res, err) {
                    errToast(err);
                    var bilibiliSearch = res.body.json().data;
                    hasSearchList[hasSearch] = hasSearch;
                    for (let bilibiliSearchPage = 2; bilibiliSearchPage <= bilibiliSearch.num_pages + 1; ++bilibiliSearchPage) {
                        sleep(2000);
                        let maxSearch = Math.max.apply(null, hasSearchList);
                        if (maxSearch === hasSearch) {
                            http.get(inputSearch + "&page=" + bilibiliSearchPage, {}, function(res, err) {
                                errToast(err);
                                bilibiliSearch.result.push.apply(bilibiliSearch.result, res.body.json().data.result);
                                ui.run(() => {
                                    ui.search_bili_list.setDataSource(bilibiliSearch.result);
                                });
                            });
                        } else {
                            break;
                        }
                    }
                    bilibiliSearch = null;
                });
            }

            function 废弃代码$使用play_url_list下载() {
                var bilibiliPlay = {},
                    bilibiliPlayNum = [];
                item.play_url_list.forEach(val => {
                    bilibiliPlay[parseInt(val.quality)] = val.url;
                    bilibiliPlayNum.push(parseInt(val.quality));
                });
                var biliDownloadNum = Math.max.apply(null, bilibiliPlayNum);
                http.get(bilibiliPlay[biliDownloadNum], {}, function(res, err) {
                    errToast(err);
                    files.createWithDirs("/sdcard/OneJay/Temp/bili/");
                    var biliM4A = "/sdcard/OneJay/Temp/bili/bili_" + biliDownloadNum + "_" + item.id + ".m4a";
                    files.writeBytes(biliM4A, res.body.bytes());
                    media.playMusic(biliM4A, 1, false);
                    bilibiliPlay = null, bilibiliPlayNum = null, biliM4A = null;
                });
            }

            ui.search_bili_inputButton.click(() => { //激活搜索
                if (ui.search_bili_inputKey.getText() == "") {} else {
                    checkInput("http://api.bilibili.com/audio/music-service-c/s?keyword=" + encodeURIComponent(ui.search_bili_inputKey.getText()), isSearch++);
                }
            });

            ui.search_bili_list.on("item_click", item => {
                //下载选择kbps-废案
                //if(设置){废弃代码$使用play_url_list下载();}
                //进入歌曲页面-金色传说
                musicView.loader.search.bili(item.id);
                ui.drawer.closeDrawers();
            });
        }
    },
    loader: {
        bili: function() {
            chooseView.apply(searchView, [
                ["right", searchView.ui.bili], searchView.code.bili
            ]);
        }
    }
};
//--------StartView<=loader
searchView.loader.bili();
setterView.loader.common();
homeView.loader.common();