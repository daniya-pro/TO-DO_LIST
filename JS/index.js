const completedEl = document.getElementById("completed")
const activedEl = document.getElementById("actived")
const allEl = document.getElementById("allI")
const LSGN = "typeof"
const TypeA = "active"
const TypeC = "complete"
localStorage.setItem(LSGN,"all")

//var comment = lsg === L= local S = storage G =.getitem 
//lsgn === local storage .getItem's Name


var myData = []
getdata()

function getdata() {
var refr =    database() .ref(`items`);
refr 
        .on("value", (snapshot)=>{
          let num=   snapshot.numChildren()
            //alert(num)
             if(!num){
        document.getElementById("spinner").style.display = 'none'
                document.getElementById('list').innerHTML=''
                document.getElementById('nothing').style.display='block'
                myData=[]

             }else{
                         myData=[]
                         document.getElementById('nothing').style.display='none'

                            snapshot.forEach(on_Data)
                         //   dataUpdated()
             }
            
        } )
    // on_Data()



  

}

function dataUpdated(data) {
    var datav = data.val();
datav.id=data.key
    myData =[datav]   // [{text, checked,id}  ]
renderHTML()



}

function on_Data(data) {
console.log(data,data.val())
document.getElementById("spinner").style.display = 'none'


        console.log(data.key,data)
        let val = data.val()
        let text = val.text
        let checked = val.checked
        let id = data.key

        let myDataOBJ = { text, checked, id }

        myData.push(myDataOBJ)

    
    renderHTML()
}



function renderHTML()  {
    
    document.getElementById("list").innerHTML = ``
    var active = myData.filter(value => !value.checked)
    var complete = myData.filter(value => value.checked)
   let currentMode = localStorage.getItem(LSGN)
    var array = currentMode === TypeA    ? active  : currentMode === TypeC  ?complete:myData
    
    
    console.log("MODE=> ",currentMode,"DATA",array)
    
    array.forEach(({id,checked,text}, i) => {

// console.log(["t"],todo)
        document.getElementById("list").innerHTML += `

        <tr>

        <td id='${id}2' class="td all">
        <div>
        <div class="ui ac checkbox">
        <input ${checked?"checked":""}  value="${text}" type="checkbox" name="checkbox" onChange="check(this,'${id}')">
      <label id='${id}' class='${checked?"lineThough" :"" }'> ${text}</label>
     <div id='${id}parent' class='ui input height-34px'>


    <!--NTB  is none to block-->



    <input id='${id}NTB' class='NTB'  style='display:none;'>
    

       <button class="ui green button updatetext" id = '${id}123' onclick="edit_text(document.getElementById('${id}'),this.parentNode,'${id}')">
  Edit
</button>

<button  style='display:none;' class="ui primary button primarybutton" onclick="cancelEditing('${id}',this.parentNode)">
Cancel
</button>    
<button style='display:none;' class="ui secondary button"onclick="submitEditing('${id}',this.parentNode)">Submit</button>
<button id='${id}delete' class="ui red button" onclick="deleteElement('${id}',this.parentNode)">Delete</button>


</div>

      </div>
      </div>

        </td>

    </tr>
    `
}


    )

array.length === 0 ?document.getElementById('nothing').style.display='block':document.getElementById('nothing').style.display='none'

}
    

function addItem() {

    var itemname = document.getElementById("itemname");
    var itemnameval = itemname.value;
    var regex = /(|<([^>]+)>)/ig;
    itemnameval = itemnameval.replace(regex, '');

    var CEA = Array.from(document.getElementsByClassName("complete"))
    CEA.forEach(function() {




    })

    if (itemnameval.trim() !== "") {

        database().ref("items").push({ text: itemnameval, checked: false, time: new Date().getTime() });




        itemname.value = ''





    }
}

function deleteElement(id,el){

    var ref =  database().ref(`items/${id}`);
ref.remove()

  cancelEditing(id,el)

}



function edit_text(el,el2,id){
    document.getElementById(`${id}123`)? document.getElementById(`${id}123`).className += " hidden":''
    document.getElementById(`${id}`)?   document.getElementById(`${id}`).setAttribute('style','display:none!important;'):''
    //this code not working so i changed class to hide element document.getElementById(`${id}123`).style.display='block'
    console.log(document.getElementById(`${id}123`))
    console.log("el2",el2)

makeElinline("NTB",el,el2,'input','inline')
makeElinline("primarybutton",el,el2,'','inline','inline')



}
function cancelEditing(id,el){
  
    console.log(   '123 elementt ===.>', document.getElementById(`${id}123`))
    document.getElementById(`${id}123`)?  document.getElementById(`${id}123`).className='ui green button updatetext' :'';
     document.getElementById(`${id}`)? document.getElementById(`${id}`).setAttribute('style','display:inline!important;'):'';

    var doc = el;
    for (var i = 0; i < doc.childNodes.length; i++) {
        doc.childNodes[i].style&&doc.childNodes[i].id !==id+'123'&&doc.childNodes[i].id !==id+'delete'? doc.childNodes[i].style.display='none': ''
    }
}
function submitEditing(id,el){

    if(id!=="undefined"){
        var ref =  database().ref(`items/${id}`);
     ref .update({ text: document.getElementById(id+'NTB').value.trim() })
    
     
          renderHTML()
          
          
    }else{}

cancelEditing(id,el)

}

    

function makeElinline(classn,el,el2,str){

    var doc = el2;
    doc.style.display='inline-flex'
    for (var i = 0; i < doc.childNodes.length; i++) {
        doc.childNodes[i].style? doc.childNodes[i].style.display='inline': ''

        if (doc.childNodes[i].className == classn) {
  var  childel = doc.childNodes[i];
  childel.style.display='inline';
        str ==='input'&&el?childel.value=el.innerText:''
break;
        }       

    }
    





}

function check(el, id) {
    if(id!=="undefined"){
    database().ref(`items/${id}`).update({ checked: el.checked })


}else{}}

function active() {
 localStorage.setItem(LSGN,TypeA)
 renderHTML()

    activedEl.style.border = '1px #dd7900 solid'

    completedEl.style.border = 'none'

    allEl.style.border = 'none'

    //localStorage.getItem(LSGN,TypeA)
    

}



function complete(c) {
 localStorage.setItem(LSGN,TypeC)
 renderHTML()


    completedEl.style.border = '1px #dd7900 solid'

    activedEl.style.border = 'none'

    allEl.style.border = 'none'
    localStorage.getItem(LSGN,TypeC)


}

// allEl.style.border = '1px #dd7900 solid'


function all() {
 localStorage.setItem(LSGN,"all")
 renderHTML()

    allEl.style.border = '1px #dd7900 solid'
    // document.getElementById("nothing").style.display = "none"

    localStorage.setItem("ACOA", "all")

    activedEl.style.border = 'none'
    document.getElementById("all-add").style.display = 'block'

    completedEl.style.border = 'none'



    localStorage.getItem(LSGN,'all')

}







activedEl.addEventListener("click", active)
completedEl.addEventListener("click", complete)

allEl.addEventListener("click", all)

document.getElementById("add-item").addEventListener("click", addItem)