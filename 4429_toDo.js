var textInput;
var listToDO;
var clearBtn;
var mdfk = [];
var subIndex = -1;

// 利用 addEventListener 方法來監聽當整個 HTML 文件載入完成的事件 (DOMContentLoaded)。
//   一旦文檔載入完成，後續的函數就會被執行。
// textInput = document.getElementById("input");：這行程式碼獲取了一個 ID 為 "input" 的元素，
//   它可能是一個文字輸入框，然後將其指定給變數 textInput，這個輸入框可能用於輸入文字。
// listToDO = document.getElementById("listToDo");：這行程式碼獲取了一個 ID 為 "listToDo" 的元素，
//   然後將其指定給變數 listToDO，這個元素可能是一個待辦事項清單。
// clearBtn = document.getElementById("clearBtn");：這行程式碼獲取了一個 ID 為 "clearBtn" 的元素，
//   然後將其指定給變數 clearBtn，這個元素可能是一個清除按鈕。
// loadList();：這行程式碼呼叫了一個名為 loadList() 的函數，
//   該函數可能用於加載待辦事項清單的內容，或執行其他與清單相關的操作。

document.addEventListener("DOMContentLoaded", function (){
    textInput = document.getElementById("input");
    listToDO = document.getElementById("listToDo");
    clearBtn = document.getElementById("clearBtn");
    loadList();
});

// subBtnClick() 是一個按鈕點擊事件的處理函式
// var txt = textInput.value;：這行程式碼從文字輸入框中獲取輸入的文本，並將其存儲在名為 txt 的變數中
// if(subIndex===-1){ ... }：這個條件語句檢查 subIndex 變數是否等於 -1。
//   如果 subIndex 等於 -1，表示沒有選擇任何一個代辦事項（或者是新建一個代辦事項），則執行相應的代碼塊。
//   if(!txt){ ... }：這個內部條件語句檢查輸入的文本是否為空。如果輸入的文本為空，
//     彈出一個警告框提醒用戶輸入代辦事項，然後函式返回，不繼續執行後面的代碼。
//   mdfk.push(txt);：如果輸入的文本不為空，則將該文本添加到名為 mdfk 的陣列中。
//   refresh();：這個函式用於刷新待辦事項列表，可能是將陣列中的內容顯示在網頁上。


function subBtnClick(){
    var txt = textInput.value;
    if(subIndex===-1){
        if(!txt){
            alert("請輸入代辦事項");
            return;
        }
        mdfk.push(txt);
        refresh();
    }

    // if(subIndex!==-1){ ... }：這個條件語句檢查 subIndex 變數是否不等於 -1。
    //   如果 subIndex 不等於 -1，表示正在修改某個已存在的代辦事項，則執行相應的代碼塊。
    // mdfk[subIndex] = txt;：將修改後的文本更新到名為 mdfk 的陣列中，替換原來的內容。
    // refresh();：刷新待辦事項列表，以顯示更新後的內容。
    // subIndex = -1;：重置 subIndex 變數為 -1，表示已經完成修改操作。
    // textInput.value = "";：最後，將文字輸入框的值清空，為下一次輸入做準備。

    if(subIndex!==-1){
        mdfk[subIndex] = txt;
        refresh();
        subIndex = -1;
    }
    textInput.value = "";
}


// del(btn) 用於刪除待辦事項
// mdfk.splice(getIndex(btn), 1);：這行程式碼使用 splice 方法從 mdfk 陣列中刪除一個元素。
//   它調用了一個名為 getIndex(btn) 的函式來獲取要刪除的元素的索引，然後從該索引位置開始刪除一個元素。
// refresh();：這個函式用於刷新待辦事項列表，可能是將陣列中的內容顯示在網頁上。

function del(btn){
    mdfk.splice(getIndex(btn), 1);
    refresh();
}


// edit(btn) 用於編輯待辦事項
// var index = getIndex(btn)：這行程式碼獲取了要編輯的待辦事項在列表中的索引，使用了一個名為 getIndex(btn) 的函式。
//   這個函式可能是用來從按鈕 btn 中獲取相應的索引值。
// textInput.value = mdfk[index];：這行程式碼將待辦事項列表中索引為 index 的事項的文本值設置為文本輸入框 textInput 的值。
//   換句話說，它將要編輯的事項的文本內容顯示在了文本輸入框中，以便進行修改。
//subIndex = index;：這行程式碼將變數 subIndex 的值設置為編輯的待辦事項的索引值。
//   這可能是為了後續在保存修改時能夠知道要更新的事項索引。

function edit(btn){
    var index = getIndex(btn)
    textInput.value = mdfk[index];
    subIndex = index;
}

// addList(txt) 用於向待辦事項列表中新增一個新的項目
// var list = "<li class='st_li'>" ... "</li>";：這行程式碼創建了一個包含待辦事項項目的 HTML 字串。
//   這個字串包括了一個 <li> 標籤，表示一個列表項目，其中包含了文本、編輯按鈕和刪除按鈕。
// <span class='st_span'>"+ txt + " </span>"：這部分將傳入的 txt 文本加入到 <span> 標籤中，用來顯示待辦事項的文字內容。
// <i id='edt' onclick='edit(this)' ... />：這部分創建了一個編輯按鈕。當用戶點擊這個按鈕時，
//   會調用 edit(this) 函式來編輯該待辦事項。這個按鈕使用了 "fa fa-edit" 圖示，並且設置了一些樣式，如字體大小、顏色和間距。
// <i id='del' onclick='del(this)' ... />：這部分創建了一個刪除按鈕。當用戶點擊這個按鈕時，
//   會調用 del(this) 函式來刪除該待辦事項。這個按鈕使用了 "fa fa-trash-o" 圖示，並且設置了一些樣式，如字體大小、顏色和間距。
// listToDO.innerHTML += list;：這行程式碼將創建的列表項目 HTML 字串 list 添加到待辦事項列表 listToDO 的內容中。
//   這將使新的待辦事項顯示在列表的末尾。

function addList(txt){
    var list = "<li class='st_li'>" +
        "<span class='st_span'>"+ txt + " </span>" +
        "<i id='edt' onclick='edit(this)' class='fa fa-edit' style='font-size:30px;color:green;margin-right:10px'/>" +
        "<i id='del' onclick='del(this)' class='fa fa-trash-o' style='font-size:30px;color:red;margin-left:10px'/>" +
        "</li>";
    listToDO.innerHTML += list;
}

// getIndex(btn) 用於獲取按鈕 btn 所屬的待辦事項在列表中的索引
// var li = btn.parentElement;：這行程式碼獲取了按鈕 btn 的父元素，即按鈕所在的列表項目 <li>。
// var node = Array.from(li.closest('ul').children)：這行程式碼找到了與列表項目 <li> 同一個父級 <ul> 元素下的所有子元素（列表項目）。
//   它使用了 closest('ul') 方法找到最近的父級 <ul> 元素，並使用 children 屬性獲取該元素的所有子元素。
// return node.indexOf(li)：這行程式碼返回了列表項目 <li> 在子元素陣列 node 中的索引位置，
//   這樣就可以得到按鈕所屬的待辦事項在列表中的索引值。

function getIndex(btn){
    var li = btn.parentElement;
    var node = Array.from(li.closest('ul').children)
    return node.indexOf(li)
}

// refresh() 用於刷新待辦事項列表
// listToDO.innerHTML = "";：這行程式碼將待辦事項列表 listToDO 的內容清空，
//   以便重新填充新的待辦事項。
// for(var i=0;i<mdfk.length;i++){ ... }：這是一個 for 迴圈，
//   用於遍歷待辦事項陣列 mdfk 中的每一個元素。
//   addList(mdfk[i]);：在迴圈中，對每個待辦事項調用 addList() 函式，將其添加到待辦事項列表中。
//   這將會動態地更新列表中的所有待辦事項。
//   btnShowDelAll();：這行程式碼呼叫了一個名為 btnShowDelAll() 的函式。
//   這個函式可能是用來根據待辦事項列表的狀態來顯示或隱藏刪除全部按鈕。
//   saveList();：這行程式碼呼叫了一個名為 saveList() 的函式。
//   這個函式可能是用來將待辦事項列表的內容保存到本地存儲或者是服務器上，以便在下次訪問時恢復列表狀態。

function refresh(){
    listToDO.innerHTML = "";
    for(var i=0;i<mdfk.length;i++){
        addList(mdfk[i]);
    }
    btnShowDelAll();
    saveList();
}

// btnShowDelAll() 函式用於根據待辦事項列表中是否有待辦事項來顯示或隱藏「刪除全部」按鈕
// if(mdfk.length > 0)：這是一個條件語句，用於檢查待辦事項陣列 mdfk 的長度是否大於 0。
//   如果待辦事項陣列中有待辦事項，則執行條件語句中的程式碼塊。
//   clearBtn.removeAttribute("hidden")：如果待辦事項陣列中有待辦事項，
//   就移除「clearBtn」按鈕的 "hidden" 屬性，使按鈕可見。
// else：如果待辦事項陣列中沒有待辦事項，則執行條件語句的 else 程式碼塊。
//   clearBtn.setAttribute("hidden", "hidden")：在這個程式碼塊中，
//   將「clearBtn」按鈕的 "hidden" 屬性設置為 "hidden"，這樣按鈕就會被隱藏。

function btnShowDelAll(){
    if(mdfk.length>0){
        clearBtn.removeAttribute("hidden")
    }else{
        clearBtn.setAttribute("hidden", "hidden");
    }
}

// clearAll() 的功能是清空所有待辦事項
// mdfk=[];：這行程式碼將待辦事項陣列 mdfk 設置為空陣列，也就是清除了所有待辦事項。
// refresh();：這行程式碼呼叫了 refresh() 函式，重新載入待辦事項列表，以反映對待辦事項陣列所做的更改。

function clearAll(){
    mdfk=[];
    refresh();
}

// saveList() 函式用於將待辦事項列表保存到瀏覽器的 cookie 中
// var strSave = "";：這行程式碼創建了一個空字串 strSave，用於存儲待辦事項列表的內容。
// for (var i=0;i<mdfk.length;i++){ ... }：這是一個 for 迴圈，用於遍歷待辦事項陣列 mdfk 中的每一個元素。
// if(strSave!==""){ ... }：這是一個條件語句，用於檢查 strSave 字串是否為空。
//   如果 strSave 不為空，則執行條件語句中的程式碼塊。
// strSave+=",;"：如果 strSave 不為空，則在待辦事項的文本之間加上逗號（,），以便將它們區分開來。
// strSave+=mdfk[i];：這行程式碼將待辦事項陣列 mdfk 中每個元素的內容添加到 strSave 字串中，用於保存待辦事項列表。
// document.cookie = "toDoList="+strSave;：這行程式碼將保存了待辦事項列表的字串 strSave 賦值給瀏覽器的 cookie，
//   並設置了 cookie 的名稱為 "toDoList"。這樣，待辦事項列表就會被保存到瀏覽器的 cookie 中了。

function saveList() {
    var strSave = "";
    for (var i=0;i<mdfk.length;i++){
       if(strSave!==""){
           strSave+=",";
       }
       strSave+=mdfk[i];
    }
    //alert("strSave:"+strSave)
    document.cookie = "toDoList="+strSave;
}


// loadList() 函式用於從瀏覽器的 cookie 中加載待辦事項列表
// var toDoList = "";：這行程式碼創建了一個空字串 toDoList，用於存儲待辦事項列表的內容。
// var name = "toDoList=";：這行程式碼設置了一個名稱為 "toDoList" 的 cookie，用於存儲待辦事項列表的內容。
// var decodedCookie = decodeURIComponent(document.cookie);：
//   這行程式碼通過使用 decodeURIComponent() 函式解碼瀏覽器中的 cookie。
// var ca = decodedCookie.split(';');：這行程式碼將解碼後的 cookie 字串以分號分割成多個子字串，並存儲在 ca 陣列中。
// for(var i = 0; i <ca.length; i++) { ... }：這是一個 for 迴圈，用於遍歷 ca 陣列中的每個子字串。
//   var c = ca[i];：在迴圈中，將每個子字串存儲在變數 c 中
//   if (c.includes(name)) { ... }：這是一個條件語句，用於檢查子字串 c 是否包含了待辦事項列表的 cookie 名稱。
//   toDoList = c.replace(name,"");：如果子字串包含了待辦事項列表的 cookie 名稱，
//   則將該子字串中的 cookie 名稱部分替換為空白，從而獲取到待辦事項列表的內容。
// if(toDoList!==""){ ... }：這是一個條件語句，用於檢查待辦事項列表的內容是否為空字串。
//   mdfk = toDoList.split(",")：如果待辦事項列表的內容不為空，則將待辦事項列表的內容以逗號分割成多個子字串，
//   並將這些子字串存儲在 mdfk 陣列中，從而還原待辦事項列表。
// refresh();：最後，呼叫 refresh() 函式重新加載待辦事項列表，以便反映加載的待辦事項列表的內容。

function loadList(){
    var toDoList = "";
    var name = "toDoList=";
    var decodedCookie = decodeURIComponent(document.cookie);
    //alert(decodedCookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        if (c.includes(name)) {
            toDoList = c.replace(name,"");
        }
    }
    if(toDoList!==""){
        mdfk = toDoList.split(",")
    }
    refresh();
}