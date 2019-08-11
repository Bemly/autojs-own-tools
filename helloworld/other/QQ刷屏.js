"ui";

ui.layout(

    <vertical id="djdj">
       <text w="*" h="60" gravity="center" color="#32CD32" size="24sp" textStyle="bold">苹果树QQ刷屏器</text>
            <vertical marginTop="13">
                <text marginLeft="16" color="#1E1E1E" size="18sp" textStyle="bold">版本：1.2-最终版，2018-7-29</text>
                <linear>
                <text text="消息内容:" size="18sp" gravity="center" textColor="black" paddingLeft="8" h="auto" w="auto"/>
                <input id="sendingText" paddingLeft="5" inputType="text"  marginTop="8" singleLine="false" marginLeft="16" h="auto" w="250" hint="内容"/> 
                </linear>
                <linear>
                    <text text="发送次数:" size="18sp" gravity="center" textColor="black" paddingLeft="8" h="auto" w="auto"/>
                    <input id="counts" paddingLeft="5" inputType="number" maxLength = "4" marginTop="8" singleLine="true" marginLeft="16" h="auto" w="250" hint="次数（必填）"/>
                </linear>
                <linear>
                    <text text="发送间隔:" size="18sp" gravity="center" textColor="black" paddingLeft="8" h="auto" w="auto"/>
                    <input id="rest" paddingLeft="5" inputType="numberDecimal" maxLength = "4" marginTop="8" singleLine="true" marginLeft="16" h="auto" w="250" hint="请输入刷屏间隔（秒）"/>
                </linear>
            </vertical>
        <linear paddingTop='10'>
            <checkbox id="show" text="刷屏显示次数" color="#684D38" marginLeft="16"/>
            <checkbox id="developing" text="开发模式" color="#684D38" marginLeft="16"/>
        </linear>
        <horizontal marginTop="30">
            <button id="start" text="开始" marginLeft="25" h="50" w="150" ></button>
            <button id="over" text="结束" marginLeft="10" h="50" w="150"></button>
            </horizontal>
    </vertical>
);

ui.show.setChecked(true);
ui.developing.setChecked(true);
ui.sendingText.setText("你好");
ui.rest.setText("0.5");
ui.counts.setText("10");
//alert(ui.setContentView(ui.over));
//ui.showPopupMenu();
var thread;
ui.start.click(() => {
    var sendingText = ui.sendingText.text();
    var counts = ui.counts.text();
    var rest = ui.rest.text();
    var showed = ui.show.isChecked();
    /*启动新线程运行刷屏函数*/
    thread = threads.start(function() {
        startSending(sendingText, counts, rest, showed);
        thread = null;
    });
});
ui.over.click(() => {
    try {
        thread.interrupt();
    } catch (err) {
        toast("未找到刷屏任务");
        return;
    }
    toast("已停止刷屏任务");
});


function startSending(sendingText, counts, rest, showed) {
    auto.waitFor();
    toast("现在打开聊天对话框会自动刷屏");
    launchApp("TIM");
    rest = rest * 1000; /*将秒转换为毫秒*/
    newText = sendingText;
    for (var i = 1; i <= counts; i++) {
        sleep(rest);
        if (showed) {
            newText = sendingText + " " + i;
        }
            className("EditText").findOne().setText(newText);
            text("发送").findOne().click();
    }    
}