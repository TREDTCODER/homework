const files={
  Physics:[
    {name:"physics_practical.pdf",path:"pdfs/physics/physics_practical.pdf"},
    {name:"DocScanner Aug 19, 2026 7-35 AM.pdf",path:"pdfs/physics/DocScanner Aug 19, 2026 7-35 AM.pdf"}
  ],
  Chemistry:[
    {name:"chemistry_practical.pdf",path:"pdfs/chemistry/chemistry_practical.pdf"},
  ],
  Mathematics:[
    {name:"NONE.pdf",path:"pdfs/mathematics/NONE.pdf"},
  ],
  English:[
    {name:"NONE.pdf",path:"pdfs/english/NONE.pdf"}
  ]
};
let current="root", previous="root", maximized=false;
const win=()=>document.getElementById("window");
function openRoot(){current="root";render();showWindow()}
function openFolder(name){previous=current;current=name;render();showWindow()}
function showWindow(){win().classList.remove("hidden");document.getElementById("startMenu").classList.add("hidden")}
function closeWindow(){win().classList.add("hidden")}
function minimizeWindow(){win().classList.add("hidden")}
function maximizeWindow(){maximized=!maximized;win().style.left=maximized?"0":"140px";win().style.top=maximized?"0":"55px";win().style.width=maximized?"100vw":"760px";win().style.height=maximized?"calc(100vh - 30px)":"510px"}
function goBack(){if(current!=="root"){current="root";render()}}
function goUp(){goBack()}
function openPdf(path){window.open(path,"_blank","noopener")}
function render(){
  const explorer=document.getElementById("explorer");
  explorer.innerHTML="";
  const title=current==="root"?"HW Share - My Computer":`HW Share - ${current}`;
  document.getElementById("windowTitle").textContent=title;
  document.getElementById("addressPath").textContent=current==="root"?"":current+"\\";
  if(current==="root"){
    Object.keys(files).forEach(name=>addFolder(name));
    document.getElementById("statusText").textContent=`${Object.keys(files).length} folders`;
  }else{
    files[current].forEach(file=>addFile(file));
    document.getElementById("statusText").textContent=`${files[current].length} files`;
  }
}
function addFolder(name){
  const el=document.createElement("div");el.className="item";
  el.innerHTML=`<div class="item-icon folder-small"></div><div class="item-name">${name}</div>`;
  el.ondblclick=()=>openFolder(name);el.onclick=()=>select(el);document.getElementById("explorer").appendChild(el);
}
function addFile(file){
  const el=document.createElement("div");el.className="item";
  el.innerHTML=`<div class="item-icon pdf-icon"></div><div class="item-name">${file.name}</div>`;
  el.ondblclick=()=>openPdf(file.path);el.onclick=()=>select(el);document.getElementById("explorer").appendChild(el);
}
function select(el){document.querySelectorAll(".item").forEach(x=>x.classList.remove("selected"));el.classList.add("selected")}
function toggleStart(){document.getElementById("startMenu").classList.toggle("hidden")}
function updateClock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}
render();updateClock();setInterval(updateClock,1000);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeWindow()});
