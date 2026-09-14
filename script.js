const $=s=>document.querySelector(s);
const STORAGE_KEY="cyclone_custom_uas_v1";
let editIndex=null;

const pools={
 Android:{
  Chrome:[
   "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro Build/UQ1A.240205.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 15; SM-S928B Build/AP3A.240905.015.A2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 13; 2304FPN6DC Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 14; SM-G991B Build/TP1A.220624.014) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-A135F Build/TP1A.220624.014) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 12; SM-G998B Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.100 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 14; OnePlus 12 Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 14; Xiaomi 14 Ultra Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 15; Vivo X200 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 14; OPPO A3 Pro Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36"
  ],
  Firefox:[
   "Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0",
   "Mozilla/5.0 (Android 13; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0",
   "Mozilla/5.0 (Android 15; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0",
   "Mozilla/5.0 (Android 12; Mobile; rv:128.0) Gecko/128.0 Firefox/128.0",
   "Mozilla/5.0 (Android 14; Tablet; rv:131.0) Gecko/131.0 Firefox/131.0"
  ],
  Edge:[
   "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36 EdgA/131.0.2903.86",
   "Mozilla/5.0 (Linux; Android 13; Samsung SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Mobile Safari/537.36 EdgA/130.0.2849.68",
   "Mozilla/5.0 (Linux; Android 15; OnePlus 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36 EdgA/131.0.2903.86"
  ],
  Safari:[
   "Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36",
   "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Mobile Safari/537.36"
  ]
 },
 iOS:{
  Safari:[
   "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPhone 16 Pro; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1"
  ],
  Chrome:[
   "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.69 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0.6723.58 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.69 Mobile/15E148 Safari/604.1"
  ],
  Firefox:[
   "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/131.0 Mobile/15E148 Safari/605.1.15",
   "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/130.0 Mobile/15E148 Safari/605.1.15"
  ],
  Edge:[
   "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/131.0 Mobile/15E148 Safari/605.1.15",
   "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/130.0 Mobile/15E148 Safari/605.1.15"
  ]
 },
 Desktop:{
  Chrome:[
   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36",
   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36",
   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Safari/537.36",
   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Safari/537.36",
   "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36",
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36",
   "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36",
   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36"
  ],
  Firefox:[
   "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0",
   "Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0",
   "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0",
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0",
   "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0"
  ],
  Edge:[
   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36 Edg/131.0.2903.86",
   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Safari/537.36 Edg/130.0.2849.68",
   "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36 Edg/131.0.2903.86",
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36 Edg/131.0.2903.86"
  ],
  Safari:[
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15",
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
   "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15"
  ]
 },
 iPad:{
  Safari:[
   "Mozilla/5.0 (iPad; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPad; CPU OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPad Pro 12.9-inch; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1"
  ],
  Chrome:[
   "Mozilla/5.0 (iPad; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.69 Mobile/15E148 Safari/604.1",
   "Mozilla/5.0 (iPad; CPU OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0.6723.58 Mobile/15E148 Safari/604.1"
  ],
  Firefox:[
   "Mozilla/5.0 (iPad; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/131.0 Mobile/15E148 Safari/605.1.15",
   "Mozilla/5.0 (iPad; CPU OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/130.0 Mobile/15E148 Safari/605.1.15"
  ],
  Edge:[
   "Mozilla/5.0 (iPad; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/131.0 Mobile/15E148 Safari/605.1.15"
  ]
 },
 Tablet:{
  Chrome:[
   "Mozilla/5.0 (Linux; Android 14; Tablet; SM-X910 Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36",
   "Mozilla/5.0 (Linux; Android 13; Tablet; SM-T870 Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Safari/537.36",
   "Mozilla/5.0 (Linux; Android 15; Tab S10 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36",
   "Mozilla/5.0 (Linux; Android 14; Lenovo Tab M11 Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36"
  ],
  Firefox:[
   "Mozilla/5.0 (Android 14; Tablet; rv:131.0) Gecko/131.0 Firefox/131.0",
   "Mozilla/5.0 (Android 13; Tablet; rv:130.0) Gecko/130.0 Firefox/130.0"
  ],
  Edge:[
   "Mozilla/5.0 (Linux; Android 14; Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Safari/537.36 EdgA/131.0.2903.86"
  ],
  Safari:[
   "Mozilla/5.0 (iPad; CPU OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1"
  ]
 }
};

function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1600)}
function copyText(v){navigator.clipboard?.writeText(v).then(()=>toast("Copied")).catch(()=>toast("Copy unavailable"))}
function download(name,type,data){const blob=new Blob([data],{type});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function custom(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}catch{return[]}}
function saveList(x){localStorage.setItem(STORAGE_KEY,JSON.stringify(x));renderCustom()}

function renderCustom(){
 const list=custom(), box=$("#customList"), empty=$("#emptyCustom");box.innerHTML="";
 empty.style.display=list.length?"none":"block";
 list.forEach((u,i)=>{
  const item=document.createElement("div");item.className="custom-item";
  item.innerHTML=`<div><strong>${esc(u.name)}</strong><code>${esc(u.ua)}</code></div><div class="item-actions"><button class="btn" data-edit="${i}">Edit</button><button class="btn" data-del="${i}">Delete</button></div>`;
  box.appendChild(item);
 });
 box.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>openModal(+b.dataset.edit));
 box.querySelectorAll("[data-del]").forEach(b=>{b.onclick=()=>{const a=custom();a.splice(+b.dataset.del,1);saveList(a);toast("Deleted")}})
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function openModal(i=null){
 editIndex=i;$("#modalTitle").textContent=i===null?"Add Custom UA":"Edit Custom UA";
 const u=i===null?{name:"",ua:""}:custom()[i];$("#customName").value=u.name;$("#customValue").value=u.ua;$("#modal").classList.remove("hidden");
}
function closeModal(){$("#modal").classList.add("hidden");editIndex=null}
function generate(){
 const f=$("#deviceFamily").value,b=$("#browser").value,p=pools[f]?.[b]||pools[f]?.Chrome||[];
 const ua=p[Math.floor(Math.random()*p.length)];$("#generatedUA").value=ua;toast("UA generated");
}
async function detectIP(){
 try{const r=await fetch("https://api.ipify.org?format=json",{cache:"no-store"});const j=await r.json();$("#ipAddress").textContent=j.ip}
 catch{$("#ipAddress").textContent="Unavailable (offline/browser policy)"}
}
function init(){
 const ua=navigator.userAgent;$("#currentUA").value=ua;$("#platform").textContent=navigator.platform||"Unknown";$("#language").textContent=navigator.language||"Unknown";$("#port").textContent=location.port||((location.protocol==="https:")?"443":"80");
 detectIP();renderCustom();
}
$("#copyCurrent").onclick=()=>copyText($("#currentUA").value);
$("#copyGenerated").onclick=()=>copyText($("#generatedUA").value);
$("#generateBtn").onclick=generate;
$("#exportCurrentTxt").onclick=()=>download("cyclone-current-ua.txt","text/plain",$("#currentUA").value);
$("#exportCurrentJson").onclick=()=>download("cyclone-current-ua.json","application/json",JSON.stringify({userAgent:$("#currentUA").value,ip:$("#ipAddress").textContent,port:$("#port").textContent,platform:navigator.platform,language:navigator.language},null,2));
$("#exportGeneratedTxt").onclick=()=>download("cyclone-generated-ua.txt","text/plain",$("#generatedUA").value);
$("#exportGeneratedJson").onclick=()=>download("cyclone-generated-ua.json","application/json",JSON.stringify({userAgent:$("#generatedUA").value,deviceFamily:$("#deviceFamily").value,browser:$("#browser").value},null,2));
$("#addCustom").onclick=()=>openModal();
$("#closeModal").onclick=closeModal;$("#cancelModal").onclick=closeModal;
$("#saveCustom").onclick=()=>{const name=$("#customName").value.trim(),ua=$("#customValue").value.trim();if(!name||!ua){toast("Name and UA are required");return}const a=custom();const obj={name,ua,createdAt:new Date().toISOString()};if(editIndex===null)a.push(obj);else a[editIndex]={...a[editIndex],...obj};saveList(a);closeModal();toast(editIndex===null?"Added":"Updated")};
init();