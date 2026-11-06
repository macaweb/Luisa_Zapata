(() => {
 const numeroWhatsApp="573046366517", carrito=[];
 const cop=n=>n.toLocaleString("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0});
 const guia=document.createElement("div");
 guia.className="guia-seleccion-servicios";
 guia.innerHTML='<p><strong>Elige tus servicios</strong><span>Explora las opciones y pulsa “Añadir” en los tratamientos que te interesen. Puedes escoger uno o varios.</span></p><button type="button" class="enlace-ver-seleccion" aria-label="Revisar servicios seleccionados" hidden>Revisar mi selección <span class="carrito-contador">0</span></button>';
 const encabezadoServicios=document.querySelector("#pestanas .encabezado-seccion");
 if(encabezadoServicios) encabezadoServicios.append(guia);
 const boton=guia.querySelector(".enlace-ver-seleccion");
 const panel=document.createElement("div");panel.className="carrito-panel";panel.hidden=true;
 panel.innerHTML='<section class="carrito-ventana" role="dialog" aria-modal="true" aria-labelledby="titulo-carrito"><div class="carrito-cabecera"><h2 id="titulo-carrito">Agendar tu cita</h2><button type="button" class="carrito-cerrar" aria-label="Cerrar carrito">×</button></div><div class="carrito-contenido"></div><div class="carrito-total"><span>Total de servicios con precio</span><strong>$0</strong></div><form class="formulario-cita"><label>Nombre completo<input name="nombre" type="text" autocomplete="name" placeholder="Tu nombre" required maxlength="90"></label><label>Número de celular<input name="telefono" type="tel" autocomplete="tel" inputmode="tel" placeholder="Tu número de contacto" required maxlength="20"></label><label>Fecha preferida<input name="fecha" type="date" required></label><label>Franja horaria preferida<select name="hora" required><option value="">Selecciona una franja</option><option>En la mañana</option><option>En la tarde</option><option>Horario flexible</option></select></label><label>¿Dónde deseas tu servicio?<select name="modalidad" required><option value="">Selecciona una opción</option><option>En el estudio</option><option>A domicilio</option></select></label><label class="campo-direccion" hidden>Dirección para el servicio a domicilio<input name="direccion" type="text" autocomplete="street-address" placeholder="Dirección y barrio"></label><label>Observaciones (opcional)<textarea name="observaciones" rows="2" maxlength="300" placeholder="Cuéntanos si tienes alguna preferencia"></textarea></label><button type="submit" class="carrito-enviar">Enviar solicitud por WhatsApp</button></form><p class="carrito-ayuda">Tu solicitud se enviará a Luisa para confirmar disponibilidad y detalles de la cita.</p></section>';
 document.body.appendChild(panel);
 const contenido=panel.querySelector(".carrito-contenido");
 function render(){
  boton.querySelector(".carrito-contador").textContent=carrito.length;\n  boton.hidden=carrito.length===0;
  panel.querySelector(".carrito-total strong").textContent=cop(carrito.reduce((s,x)=>s+(x.precio||0),0));
  if(!carrito.length){contenido.innerHTML='<p class="carrito-vacio">Aún no has añadido servicios. Explora las opciones y pulsa “Añadir”.</p>';return;}
  const lista=document.createElement("div");lista.className="carrito-lista";
  carrito.forEach((item,i)=>{const fila=document.createElement("div");fila.className="carrito-linea";const datos=document.createElement("div");const nombre=document.createElement("strong");nombre.textContent=item.nombre;const precio=document.createElement("small");precio.textContent=item.precio===null?"Valor por consultar":cop(item.precio);datos.append(nombre,precio);const quitar=document.createElement("button");quitar.type="button";quitar.className="carrito-quitar";quitar.textContent="Quitar";quitar.addEventListener("click",()=>{carrito.splice(i,1);actualizar();render();});fila.append(datos,quitar);lista.append(fila);});contenido.replaceChildren(lista);
 }
 function actualizar(){document.querySelectorAll(".boton-anadir-servicio").forEach(b=>{const on=carrito.some(x=>x.id===b.dataset.itemId);b.textContent=on?"Quitar de mi selección":"Añadir a mi selección";b.classList.toggle("anadido",on);b.setAttribute("aria-pressed",String(on));});}
 function crearBoton(destino,nombre,precio,id){const b=document.createElement("button");b.type="button";b.className="boton-anadir-servicio";b.dataset.itemId=id;b.textContent="Añadir a mi selección";b.setAttribute("aria-pressed","false");b.addEventListener("click",()=>{const i=carrito.findIndex(x=>x.id===id);if(i>=0)carrito.splice(i,1);else carrito.push({id,nombre,precio});actualizar();render();});destino.append(b);}
 document.querySelectorAll("#pestanas .tarjeta-servicio,#facial .tarjeta-servicio").forEach((card,i)=>{const nombre=card.querySelector("h3")?.textContent.trim(),strong=card.querySelector(".precio-servicio strong"),destino=card.querySelector(".precio-servicio");if(nombre&&strong&&destino){const digits=strong.textContent.replace(/[^0-9]/g,"");crearBoton(destino,nombre,digits?Number(digits):null,"servicio-"+i);}});
 const curso=document.querySelector("#cursos .curso-datos");if(curso)crearBoton(curso,"CPE – Curso profesional de extensiones de pestañas",null,"curso-cpe");
 boton.addEventListener("click",()=>{panel.hidden=false;render();});
 panel.querySelector(".carrito-cerrar").addEventListener("click",()=>panel.hidden=true);
 panel.addEventListener("click",e=>{if(e.target===panel)panel.hidden=true;});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")panel.hidden=true;});
 const formulario=panel.querySelector(".formulario-cita"), fecha=formulario.elements.fecha;
 const hoy=new Date();fecha.min=new Date(hoy.getTime()-hoy.getTimezoneOffset()*60000).toISOString().slice(0,10);
 const modalidad=formulario.elements.modalidad,campoDireccion=formulario.querySelector(".campo-direccion");
 modalidad.addEventListener("change",()=>{const domicilio=modalidad.value==="A domicilio";campoDireccion.hidden=!domicilio;formulario.elements.direccion.required=domicilio;});
 formulario.addEventListener("submit",evento=>{
  evento.preventDefault();if(!carrito.length){alert("Añade al menos un servicio antes de solicitar tu cita.");return;}if(!formulario.reportValidity())return;
  const datos=new FormData(formulario);
  const lineas=carrito.map((x,i)=>(i+1)+". "+x.nombre+" — "+(x.precio===null?"valor por consultar":cop(x.precio)));
  const total=carrito.reduce((s,x)=>s+(x.precio||0),0),pendiente=carrito.some(x=>x.precio===null);
  let msg="Hola, Luisa. Quisiera solicitar una cita.\n\nDATOS DE CONTACTO\nNombre: "+datos.get("nombre")+"\nCelular: "+datos.get("telefono")+"\n\nSERVICIOS\n"+lineas.join("\n")+"\n\nTotal de servicios con precio: "+cop(total);
  if(pendiente)msg+="\nHay un servicio cuyo valor deseo consultar.";
  msg+="\n\nPREFERENCIAS DE CITA\nFecha: "+datos.get("fecha")+"\nHorario: "+datos.get("hora")+"\nModalidad: "+datos.get("modalidad");
  if(datos.get("modalidad")==="A domicilio")msg+="\nDirección: "+datos.get("direccion");
  if(datos.get("observaciones"))msg+="\nObservaciones: "+datos.get("observaciones");
  msg+="\n\nQuedo pendiente de la confirmación. ¡Gracias!";
  window.open("https://wa.me/"+numeroWhatsApp+"?text="+encodeURIComponent(msg),"_blank","noopener,noreferrer");
 });
 render();
})();