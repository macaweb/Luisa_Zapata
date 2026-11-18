(() => {
 const numeroWhatsApp="573046366517", carrito=[];
 const cop=n=>n.toLocaleString("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0});
 const guia=document.createElement("div");
 guia.className="guia-seleccion-servicios";
 guia.innerHTML='<p><strong>Elige tus servicios</strong><span>Explora las opciones y pulsa “Añadir” en los tratamientos que te interesen. Puedes escoger uno o varios.</span></p>';
 const encabezadoServicios=document.querySelector("#pestanas .encabezado-seccion");
 if(encabezadoServicios) encabezadoServicios.append(guia);
 const boton=document.createElement("button");
 boton.type="button";
 boton.className="enlace-ver-seleccion seleccion-flotante";
 boton.setAttribute("aria-label","Abrir mi selección");
 boton.hidden=true;
 boton.innerHTML='<svg class="icono-seleccion" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 26.5c-5.8-3.8-9-8.2-9-13.1 0-3.2 2-5.4 4.7-5.4 2 0 3.5 1.2 4.3 3 0.8-1.8 2.3-3 4.3-3 2.7 0 4.7 2.2 4.7 5.4 0 4.9-3.2 9.3-9 13.1Z"/><path d="M5 5.5 6 3l1 2.5L9.5 6.5 7 7.5 6 10 5 7.5 2.5 6.5 5 5.5ZM25.5 22l.9-2.2.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9Z"/></svg><span>Mi selección</span><span class="carrito-contador">0</span>';
 document.body.append(boton);
 const panel=document.createElement("div");panel.className="carrito-panel";panel.hidden=true;
 panel.innerHTML='<section class="carrito-ventana" role="dialog" aria-modal="true" aria-labelledby="titulo-carrito"><div class="carrito-cabecera"><h2 id="titulo-carrito">Agendar tu cita</h2><button type="button" class="carrito-cerrar" aria-label="Cerrar selección">×</button></div><div class="carrito-contenido"></div><div class="carrito-total"><span>Total de servicios con precio</span><strong>$0</strong></div><form class="formulario-cita"><label>Nombre completo<input name="nombre" type="text" autocomplete="name" placeholder="Tu nombre" required maxlength="90"></label><label>Número de celular<input name="telefono" type="tel" autocomplete="tel" inputmode="tel" placeholder="Tu número de contacto" required maxlength="20"></label><label>Fecha preferida<input name="fecha" type="date" required></label><label>Franja horaria preferida<select name="hora" required><option value="">Selecciona una franja</option><option>En la mañana</option><option>En la tarde</option><option>Horario flexible</option></select></label><label>¿Dónde deseas tu servicio?<select name="modalidad" required><option value="">Selecciona una opción</option><option>En el estudio</option><option>A domicilio</option></select></label><label class="campo-direccion" hidden>Dirección para el servicio a domicilio<input name="direccion" type="text" autocomplete="street-address" placeholder="Dirección y barrio"></label><label>Observaciones (opcional)<textarea name="observaciones" rows="2" maxlength="300" placeholder="Cuéntanos si tienes alguna preferencia"></textarea></label><button type="submit" class="carrito-enviar">Enviar solicitud por WhatsApp</button></form><p class="carrito-ayuda">Tu solicitud se enviará a Luisa para confirmar disponibilidad y detalles de la cita.</p></section>';
 document.body.appendChild(panel);
 const contenido=panel.querySelector(".carrito-contenido");
 function render(){
  boton.querySelector(".carrito-contador").textContent=carrito.length;
  boton.hidden=carrito.length===0;
  panel.querySelector(".carrito-total strong").textContent=cop(carrito.reduce((s,x)=>s+(x.precio||0),0));
  if(!carrito.length){contenido.innerHTML='<p class="carrito-vacio">Aún no has añadido servicios. Explora los tratamientos y elige los que te interesen.</p>';return;}
  const lista=document.createElement("div");lista.className="carrito-lista";
  carrito.forEach((item,i)=>{const fila=document.createElement("div");fila.className="carrito-linea";const datos=document.createElement("div");const nombre=document.createElement("strong");nombre.textContent=item.nombre;const precio=document.createElement("small");precio.textContent=item.precio===null?"Valor por consultar":cop(item.precio);datos.append(nombre,precio);const quitar=document.createElement("button");quitar.type="button";quitar.className="carrito-quitar";quitar.textContent="Quitar";quitar.addEventListener("click",()=>{carrito.splice(i,1);actualizar();render();});fila.append(datos,quitar);lista.append(fila);});contenido.replaceChildren(lista);
 }
 function actualizar(){document.querySelectorAll(".boton-anadir-servicio").forEach(b=>{const on=carrito.some(x=>x.id===b.dataset.itemId);b.innerHTML=on?'<span class="marca-anadido" aria-hidden="true">✓</span><span>Añadido</span>':'<span>Añadir</span><span class="simbolo-anadir" aria-hidden="true">＋</span>';b.classList.toggle("anadido",on);b.setAttribute("aria-pressed",String(on));const card=b.closest(".tarjeta-servicio,.curso-contenido");if(card)card.classList.toggle("servicio-seleccionado",on);});}
 function crearBoton(destino,nombre,precio,id){const b=document.createElement("button");b.type="button";b.className="boton-anadir-servicio";b.dataset.itemId=id;b.textContent="Añadir";b.setAttribute("aria-pressed","false");b.addEventListener("click",()=>{const i=carrito.findIndex(x=>x.id===id);if(i>=0)carrito.splice(i,1);else carrito.push({id,nombre,precio});actualizar();render();mostrarAviso(i>=0?"Se quitó de tu selección":"¡Añadido a tu selección!");});destino.append(b);}
 document.querySelectorAll("#pestanas .tarjeta-servicio,#facial .tarjeta-servicio").forEach((card,i)=>{const nombre=card.querySelector("h3")?.textContent.trim(),strong=card.querySelector(".precio-servicio strong"),destino=card.querySelector(".precio-servicio");if(nombre&&strong&&destino){const digits=strong.textContent.replace(/[^0-9]/g,"");crearBoton(destino,nombre,digits?Number(digits):null,"servicio-"+i);}});
 const curso=document.querySelector("#cursos .curso-datos");if(curso)crearBoton(curso,"Formación profesional personalizada en extensiones de pestañas",1400000,"curso-extensiones-profesional");
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

 // Microinteracciones generales: aviso, navegación activa, entrada suave e imágenes ampliables.
 const aviso=document.createElement("div");aviso.className="aviso-interaccion";aviso.setAttribute("role","status");aviso.setAttribute("aria-live","polite");document.body.append(aviso);
 let avisoTimer;
 function mostrarAviso(mensaje){aviso.textContent=mensaje;aviso.classList.add("visible");clearTimeout(avisoTimer);avisoTimer=setTimeout(()=>aviso.classList.remove("visible"),2100);}
 const cta=document.querySelector(".boton-agendar");
 if(cta)cta.addEventListener("click",()=>{const destino=document.querySelector("#pestanas");if(destino){destino.classList.add("destello-seccion");setTimeout(()=>destino.classList.remove("destello-seccion"),1500);}});
 const secciones=[...document.querySelectorAll("main section[id]")], enlaces=[...document.querySelectorAll(".menu a,.menu-desplegable a")];
 if("IntersectionObserver" in window){
  const observador=new IntersectionObserver(entradas=>entradas.forEach(e=>{if(e.isIntersecting){e.target.classList.add("aparecio");const activo=enlaces.find(a=>a.getAttribute("href")==="#"+e.target.id);if(activo){enlaces.forEach(a=>a.classList.remove("nav-activo"));enlaces.filter(a=>a.getAttribute("href")==="#"+e.target.id).forEach(a=>a.classList.add("nav-activo"));}}}),{threshold:.12});
  secciones.forEach(s=>{s.classList.add("revelar-scroll");observador.observe(s);});
 }
 // Visor ampliado para portada, imágenes de servicios y curso.
 const visor=document.createElement("div");visor.className="visor-imagen";visor.hidden=true;visor.innerHTML='<button type="button" class="visor-cerrar" aria-label="Cerrar imagen">×</button><img alt=""><span class="visor-pista">Pulsa fuera de la imagen para cerrar</span>';document.body.append(visor);
 const visorImg=visor.querySelector("img");
 function abrirImagen(src,alt){if(!src)return;visorImg.src=src;visorImg.alt=alt||"Imagen ampliada";visor.hidden=false;document.body.classList.add("visor-abierto");visor.querySelector(".visor-cerrar").focus();}
 function cerrarImagen(){visor.hidden=true;visorImg.removeAttribute("src");document.body.classList.remove("visor-abierto");}
 visor.addEventListener("click",e=>{if(e.target===visor||e.target.closest(".visor-cerrar"))cerrarImagen();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!visor.hidden)cerrarImagen();});
 document.querySelectorAll(".imagen-portada img,.imagen-curso img").forEach(img=>{img.classList.add("imagen-interactiva");img.tabIndex=0;img.setAttribute("role","button");img.setAttribute("aria-label","Ampliar imagen: "+(img.alt||""));img.addEventListener("click",()=>abrirImagen(img.currentSrc||img.src,img.alt));img.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();abrirImagen(img.currentSrc||img.src,img.alt);}});});
 document.querySelectorAll(".foto-servicio[role='img']").forEach(foto=>{foto.classList.add("foto-interactiva");foto.tabIndex=0;foto.setAttribute("aria-label",(foto.getAttribute("aria-label")||"Imagen del servicio")+". Pulsa para ampliar");const bg=getComputedStyle(foto).backgroundImage;const match=bg.match(/url\(["']?(.*?)["']?\)/);if(match){foto.addEventListener("click",()=>abrirImagen(match[1],foto.getAttribute("aria-label")));foto.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();abrirImagen(match[1],foto.getAttribute("aria-label"));}});}});
 // Realce visual para cada tarjeta al pasar el cursor o seleccionarla.
 document.querySelectorAll(".tarjeta-servicio").forEach(card=>card.addEventListener("pointerdown",()=>{card.classList.add("tarjeta-presionada");setTimeout(()=>card.classList.remove("tarjeta-presionada"),220);}));

 render();
})();
