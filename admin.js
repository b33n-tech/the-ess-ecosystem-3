let data = { sources: [] };

function addCall() {
  const structure = document.getElementById("structure").value.trim();
  const title = document.getElementById("title").value.trim();
  const deadline = document.getElementById("deadline").value;
  const url = document.getElementById("url").value.trim();
  const tags = document.getElementById("tags").value.split(",").map(t=>t.trim()).filter(Boolean);
  const note = document.getElementById("note").value.trim();

  if(!structure||!title||!deadline||!url){alert("Remplis Structure, Titre, Date, URL"); return;}

  let source = data.sources.find(s=>s.name===structure);
  if(!source){ source={name:structure,desc:"",tags:[],calls:[]}; data.sources.push(source); }

  source.calls.push({title,deadline,url,tags,note});
  document.getElementById("json-editor").value = JSON.stringify(data,null,2);
  ["structure","title","deadline","url","tags","note"].forEach(id=>document.getElementById(id).value="");
}

function downloadJSON(){
  const blob = new Blob([document.getElementById("json-editor").value],{type:"application/json"});
  const link = document.createElement("a"); link.href = URL.createObjectURL(blob);
  link.download="data.json"; link.click();
}

document.getElementById("add-btn").onclick = addCall;
document.getElementById("save-btn").onclick = downloadJSON;
