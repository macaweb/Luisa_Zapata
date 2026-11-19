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
  boton.innerHTML='<svg class="icono-seleccion" viewBox="0 0 32 32" aria-hidden="true"><path d="M4 19.5c3.1-6.2 7.1-9.3 12-9.3s8.9 3.1 12 9.3"/><path d="M7.5 15.2 5.8 11M12 11.5 11.2 6.8M17 10.3 17.2 5.5M22 11.5 23.4 7M26 15.2 28.3 11"/><path d="M8 21.5c2.5 2.2 5.2 3.3 8 3.3s5.5-1.1 8-3.3"/></svg><span>Mi selección</span><span class="carrito-contador">0</span>';
 document.body.append(boton);
 const panel=document.createElement("div");panel.className="carrito-panel";panel.hidden=true;
 panel.innerHTML='<section class="carrito-ventana" role="dialog" aria-modal="true" aria-labelledby="titulo-carrito"><div class="carrito-cabecera"><h2 id="titulo-carrito">Agendar tu cita</h2><button type="button" class="carrito-cerrar" aria-label="Cerrar selección">×</button></div><div class="carrito-contenido"></div><div class="carrito-total"><span>Total de servicios con precio</span><strong>$0</strong></div><form class="formulario-cita"><label>Nombre completo<input name="nombre" type="text" autocomplete="name" placeholder="Tu nombre" required maxlength="90"></label><label>Número de celular<input name="telefono" type="tel" autocomplete="tel" inputmode="tel" placeholder="Tu número de contacto" required maxlength="20"></label><label class="campo-fecha">Fecha preferida<input name="fecha" type="text" placeholder="Selecciona una fecha" autocomplete="off" readonly required aria-haspopup="dialog" aria-expanded="false"><div class="calendario-personalizado" hidden><div class="calendario-cabecera"><button type="button" class="calendario-mes-anterior" aria-label="Mes anterior">‹</button><strong class="calendario-titulo"></strong><button type="button" class="calendario-mes-siguiente" aria-label="Mes siguiente">›</button></div><div class="calendario-dias-semana"><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span></div><div class="calendario-dias"></div><p class="calendario-pie">Selecciona el día que prefieras para tu cita</p></div></label><label>Franja horaria preferida<select name="hora" required><option value="">Selecciona una franja</option><option>En la mañana</option><option>En la tarde</option><option>Horario flexible</option></select></label><label>¿Dónde deseas tu servicio?<select name="modalidad" required><option value="">Selecciona una opción</option><option>En el estudio</option><option>A domicilio</option></select></label><label class="campo-direccion" hidden>Dirección para el servicio a domicilio<input name="direccion" type="text" autocomplete="street-address" placeholder="Dirección y barrio"></label><label>Observaciones (opcional)<textarea name="observaciones" rows="2" maxlength="300" placeholder="Cuéntanos si tienes alguna preferencia"></textarea></label><button type="submit" class="carrito-enviar">Solicitar cita</button></form><p class="carrito-ayuda">Tu solicitud se enviará a Luisa para confirmar disponibilidad y detalles de la cita.</p></section>';
 document.body.appendChild(panel);
 const contenido=panel.querySelector(".carrito-contenido");
 // Microanimación táctil para que los botones respondan también en móvil.
 document.addEventListener("pointerdown",e=>{
  const b=e.target.closest(".boton-anadir-servicio,.carrito-enviar");
  if(!b)return;
  b.classList.remove("animar-toque");
  void b.offsetWidth;
  b.classList.add("animar-toque");
  window.setTimeout(()=>b.classList.remove("animar-toque"),650);
 });

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
 const calendario=panel.querySelector(".calendario-personalizado");
 const tituloCalendario=calendario.querySelector(".calendario-titulo");
 const rejillaDias=calendario.querySelector(".calendario-dias");
 const hoy=new Date();hoy.setHours(0,0,0,0);
 let mesVisible=new Date(hoy.getFullYear(),hoy.getMonth(),1), fechaElegida="";
 const nombresMeses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
 const fechaISO=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
 const formatoFecha=d=>new Intl.DateTimeFormat("es-CO",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(d);
 function dibujarCalendario(){
  tituloCalendario.textContent=nombresMeses[mesVisible.getMonth()]+" "+mesVisible.getFullYear();
  rejillaDias.replaceChildren();
  const primero=new Date(mesVisible.getFullYear(),mesVisible.getMonth(),1);
  const desplazamiento=(primero.getDay()+6)%7;
  const total=new Date(mesVisible.getFullYear(),mesVisible.getMonth()+1,0).getDate();
  for(let i=0;i<desplazamiento;i++){const vacio=document.createElement("span");vacio.className="dia-vacio";rejillaDias.append(vacio);}
  for(let dia=1;dia<=total;dia++){
   const fechaDia=new Date(mesVisible.getFullYear(),mesVisible.getMonth(),dia);fechaDia.setHours(0,0,0,0);
   const iso=fechaISO(fechaDia), botonDia=document.createElement("button");
   botonDia.type="button";botonDia.className="dia-calendario";botonDia.textContent=dia;
   botonDia.disabled=fechaDia<hoy;
   if(iso===fechaElegida)botonDia.classList.add("dia-seleccionado");
   if(iso===fechaISO(hoy))botonDia.classList.add("dia-hoy");
   botonDia.setAttribute("aria-label",formatoFecha(fechaDia));
   botonDia.addEventListener("click",()=>{
    fechaElegida=iso;fecha.value=formatoFecha(fechaDia);fecha.setCustomValidity("");
    calendario.hidden=true;fecha.setAttribute("aria-expanded","false");dibujarCalendario();
   });
   rejillaDias.append(botonDia);
  }
 }
 function abrirCalendario(){calendario.hidden=false;fecha.setAttribute("aria-expanded","true");dibujarCalendario();}
 fecha.addEventListener("click",()=>calendario.hidden?abrirCalendario():(calendario.hidden=true,fecha.setAttribute("aria-expanded","false")));
 fecha.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();abrirCalendario();}if(e.key==="Escape"){calendario.hidden=true;fecha.setAttribute("aria-expanded","false");}});
 calendario.querySelector(".calendario-mes-anterior").addEventListener("click",()=>{const anterior=new Date(mesVisible.getFullYear(),mesVisible.getMonth()-1,1);if(anterior>=new Date(hoy.getFullYear(),hoy.getMonth(),1)){mesVisible=anterior;dibujarCalendario();}});
 calendario.querySelector(".calendario-mes-siguiente").addEventListener("click",()=>{mesVisible=new Date(mesVisible.getFullYear(),mesVisible.getMonth()+1,1);dibujarCalendario();});

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
