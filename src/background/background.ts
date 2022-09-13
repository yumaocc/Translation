import { MD5 } from "../ulits";
chrome.contextMenus.create({
  id: "1",
  title: "翻译",
  contexts: ["selection"],
});
chrome.contextMenus.onClicked.addListener(async (event) => {
  let text = event.selectionText;
  var appid = "20220912001339963";
  var key = "SQ06iUfzZYuqt0KmSoIf";
  var salt = new Date().getTime();
  var str1 = appid + text + salt + key;
  var sign = MD5(str1);
  let res = await fetch(
    `http://api.fanyi.baidu.com/api/trans/vip/translate/?q=${text}&from=auto&to=zh&appid=20220912001339963&salt=${salt}&sign=${sign}`
  )
    let result = await res.json()
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        todo: "background",
        result: result.trans_result[0].dst,
        event: event,
      });
    });
});
