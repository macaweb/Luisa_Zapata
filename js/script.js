(() => {
 const numeroWhatsApp="573046366517", carrito=[];
 const cop=n=>n.toLocaleString("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0});
 const boton=document.createElement("button");
 boton.type="button";boton.className="carrito-flotante";boton.setAttribute("aria-label","Abrir carrito de servicios");
 boton.innerHTML='<span>Mi selección</span><span class="carrito-contador">0</span>';document.body.appendChild(boton);
 const panel=document.createElement("div");panel.className="carrito-panel";panel.hidden=true;
 panel.innerHTML='<section class="carrito-ventana" role="dialog" aria-modal="true" aria-labelledby="titulo-carrito"><div class="carrito-cabecera"><h2 id="titulo-carrito">Servicios seleccionados</h2><button type="button" class="carrito-cerrar" aria-label="Cerrar carrito">×</button></div><div class="carrito-contenido"></div><div class="carrito-total"><span>Total de servicios con precio</span><strong>$0</strong></div><button type="button" class="carrito-enviar">Enviar selección por WhatsApp</button><p class="carrito-ayuda">La selección se enviará a Luisa para confirmar disponibilidad y detalles de tu cita.</p></section>';
 document.body.appendChild(panel);
 const contenido=panel.querySelector(".carrito-contenido");
 function render(){
  boton.querySelector(".carrito-contador").textContent=carrito.length;
  panel.querySelector(".carrito-total strong").textContent=cop(carrito.reduce((s,x)=>s+(x.precio||0),0));
  panel.querySelector(".carrito-enviar").disabled=!carrito.length;
  if(!carrito.length){contenido.innerHTML='<p class="carrito-vacio">Aún no has añadido servicios. Explora las opciones y pulsa “Añadir”.</p>';return;}
  const lista=document.createElement("div");lista.className="carrito-lista";
  carrito.forEach((item,i)=>{const fila=document.createElement("div");fila.className="carrito-linea";const datos=document.createElement("div");const nombre=document.createElement("strong");nombre.textContent=item.nombre;const precio=document.createElement("small");precio.textContent=item.precio===null?"Valor por consultar":cop(item.precio);datos.append(nombre,precio);const quitar=document.createElement("button");quitar.type="button";quitar.className="carrito-quitar";quitar.textContent="Quitar";quitar.addEventListener("click",()=>{carrito.splice(i,1);actualizar();render();});fila.append(datos,quitar);lista.append(fila);});contenido.replaceChildren(lista);
 }
 function actualizar(){document.querySelectorAll(".boton-anadir-servicio").forEach(b=>{const on=carrito.some(x=>x.id===b.dataset.itemId);b.textContent=on?"Añadido ✓":"Añadir";b.classList.toggle("anadido",on);b.setAttribute("aria-pressed",String(on));});}
 function crearBoton(destino,nombre,precio,id){const b=document.createElement("button");b.type="button";b.className="boton-anadir-servicio";b.dataset.itemId=id;b.textContent="Añadir";b.setAttribute("aria-pressed","false");b.addEventListener("click",()=>{const i=carrito.findIndex(x=>x.id===id);if(i>=0)carrito.splice(i,1);else carrito.push({id,nombre,precio});actualizar();render();});destino.append(b);}
 document.querySelectorAll("#pestanas .tarjeta-servicio,#facial .tarjeta-servicio").forEach((card,i)=>{const nombre=card.querySelector("h3")?.textContent.trim(),strong=card.querySelector(".precio-servicio strong"),destino=card.querySelector(".precio-servicio");if(nombre&&strong&&destino){const digits=strong.textContent.replace(/[^0-9]/g,"");crearBoton(destino,nombre,digits?Number(digits):null,"servicio-"+i);}});
 const curso=document.querySelector("#cursos .curso-datos");if(curso)crearBoton(curso,"CPE – Curso profesional de extensiones de pestañas",null,"curso-cpe");
 boton.addEventListener("click",()=>{panel.hidden=false;render();});
 panel.querySelector(".carrito-cerrar").addEventListener("click",()=>panel.hidden=true);
 panel.addEventListener("click",e=>{if(e.target===panel)panel.hidden=true;});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")panel.hidden=true;});
 panel.querySelector(".carrito-enviar").addEventListener("click",()=>{
  if(!carrito.length)return;
  const lineas=carrito.map((x,i)=>(i+1)+". "+x.nombre+" — "+(x.precio===null?"valor por consultar":cop(x.precio)));
  const total=carrito.reduce((s,x)=>s+(x.precio||0),0),pendiente=carrito.some(x=>x.precio===null);
  let msg="Hola, Luisa. Quisiera consultar disponibilidad para estos servicios:\n\n"+lineas.join("\n")+"\n\nTotal de servicios con precio: "+cop(total);
  if(pendiente)msg+="\nTambién quisiera conocer el valor del curso seleccionado.";
  msg+="\n\n¿Me puedes compartir disponibilidad y horarios? ¡Gracias!";
  window.open("https://wa.me/"+numeroWhatsApp+"?text="+encodeURIComponent(msg),"_blank","noopener,noreferrer");
 });
 render();
})();