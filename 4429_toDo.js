var textInput;
var listToDO;
var clearBtn;
var mdfk = [];
var subIndex = -1;
document.addEventListener("DOMContentLoaded", function (){
    textInput = document.getElementById("input");
    listToDO = document.getElementById("listToDo");
    clearBtn = document.getElementById("clearBtn");
    loadList();
});

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

    if(subIndex!==-1){
        mdfk[subIndex] = txt;
        refresh();
        subIndex = -1;
    }
    textInput.value = "";
}

function del(btn){
    mdfk.splice(getIndex(btn), 1);
    refresh();
}

function edit(btn){
    var index = getIndex(btn)
    textInput.value = mdfk[index];
    subIndex = index;
}

function addList(txt){
    var list = "<li class='st_li'>" +
        "<span class='st_span'>"+ txt + " </span>" +
        "<i id='edt' onclick='edit(this)' class='fa fa-edit' style='font-size:30px;color:green;margin-right:10px'/>" +
        "<i id='del' onclick='del(this)' class='fa fa-trash-o' style='font-size:30px;color:red;margin-left:10px'/>" +
        "</li>";
    listToDO.innerHTML += list;
}

function getIndex(btn){
    var li = btn.parentElement;
    var node = Array.from(li.closest('ul').children)
    return node.indexOf(li)
}

function refresh(){
    listToDO.innerHTML = "";
    for(var i=0;i<mdfk.length;i++){
        addList(mdfk[i]);
    }
    btnShowDelAll();
    saveList();
}

function btnShowDelAll(){
    if(mdfk.length>0){
        clearBtn.removeAttribute("hidden")
    }else{
        clearBtn.setAttribute("hidden", "hidden");
    }
}

function clearAll(){
    mdfk=[];
    refresh();
}

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