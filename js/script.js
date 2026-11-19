(() => {
 const numeroWhatsApp="573046366517";
 const CLAVE_SELECCION="luisaZapataSeleccionServicios";
 const carrito=(()=>{
  try{
   const guardados=JSON.parse(localStorage.getItem(CLAVE_SELECCION)||"[]");
   return Array.isArray(guardados)?guardados.filter(x=>x&&typeof x.id==="string"&&typeof x.nombre==="string"&&(x.precio===null||typeof x.precio==="number")):[];
  }catch(error){return [];}
 })();
 function guardarSeleccion(){
  try{localStorage.setItem(CLAVE_SELECCION,JSON.stringify(carrito));}
  catch(error){console.warn("No fue posible guardar la selección en este navegador.",error);}
 }
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
 panel.innerHTML='<section class="carrito-ventana" role="dialog" aria-modal="true" aria-labelledby="titulo-carrito"><div class="carrito-cabecera"><h2 id="titulo-carrito">Agendar tu cita</h2><button type="button" class="carrito-cerrar" aria-label="Cerrar selección">×</button></div><div class="carrito-contenido"></div><div class="carrito-total"><span>Total de servicios con precio</span><strong>$0</strong></div><form class="formulario-cita"><label>Nombre completo<input name="nombre" type="text" autocomplete="name" placeholder="Tu nombre" required maxlength="90"></label><label>Número de celular<input name="telefono" type="tel" autocomplete="tel" inputmode="tel" placeholder="Tu número de contacto" required maxlength="20"></label><div class="campo-fecha"><label for="fecha-cita">Fecha preferida</label><input id="fecha-cita" name="fecha" type="text" placeholder="Selecciona una fecha" autocomplete="off" readonly required aria-haspopup="dialog" aria-expanded="false"><div class="calendario-personalizado" hidden><div class="calendario-cabecera"><button type="button" class="calendario-mes-anterior" aria-label="Mes anterior">‹</button><strong class="calendario-titulo"></strong><button type="button" class="calendario-mes-siguiente" aria-label="Mes siguiente">›</button></div><div class="calendario-dias-semana"><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span></div><div class="calendario-dias"></div><button type="button" class="calendario-confirmar" disabled><span class="icono-confirmacion" aria-hidden="true">✓</span><span>Confirmar fecha</span></button><p class="calendario-pie">Selecciona el día que prefieras para tu cita</p></div></div><div class="campo-horario"><span class="etiqueta-horario">Franja horaria preferida</span><div class="opciones-horario" role="group" aria-label="Franja horaria preferida"><label class="opcion-horario"><input type="radio" name="hora" value="En la mañana" required><span>Mañana</span></label><label class="opcion-horario"><input type="radio" name="hora" value="En la tarde" required><span>Tarde</span></label></div></div><fieldset class="selector-modalidad"><legend>¿Dónde deseas tu servicio?</legend><div class="opciones-modalidad"><label class="opcion-modalidad"><input type="radio" name="modalidad" value="En el estudio" required><span class="modalidad-contenido"><span class="modalidad-icono" aria-hidden="true">⌂</span><span class="modalidad-texto"><strong>En el estudio</strong><small>Te atendemos en nuestro espacio</small></span><span class="modalidad-check" aria-hidden="true">✓</span></span></label><label class="opcion-modalidad"><input type="radio" name="modalidad" value="A domicilio" required><span class="modalidad-contenido"><span class="modalidad-icono modalidad-icono-casa" aria-hidden="true">⌖</span><span class="modalidad-texto"><strong>A domicilio</strong><small>Vamos hasta donde estés</small></span><span class="modalidad-check" aria-hidden="true">✓</span></span></label></div></fieldset><div class="campo-direccion" hidden><label>Dirección<input name="direccion" type="text" autocomplete="street-address" placeholder="Ej. Calle 45 # 12-30"></label><label>Barrio<input name="barrio" type="text" autocomplete="address-level3" placeholder="Nombre del barrio"></label></div><label>Observaciones (opcional)<textarea name="observaciones" rows="2" maxlength="300" placeholder="Cuéntanos si tienes alguna preferencia"></textarea></label><button type="submit" class="carrito-enviar">Solicitar cita</button></form><p class="carrito-ayuda">Tu solicitud se enviará a Luisa para confirmar disponibilidad y detalles de la cita.</p></section>';
 document.body.appendChild(panel);
 const contenido=panel.querySelector(".carrito-contenido");
 // Microanimación táctil para que los botones respondan también en móvil.
 document.addEventListener("pointerdown",e=>{
  const b=e.target.closest(".boton-anadir-servicio,.carrito-enviar,.calendario-confirmar,.boton-agendar");
  if(!b || b.disabled)return;
  b.classList.remove("animar-toque");
  void b.offsetWidth;
  b.classList.add("animar-toque");
  window.setTimeout(()=>b.classList.remove("animar-toque"),650);
 });

 function render(){
  boton.querySelector(".carrito-contador").textContent=carrito.length;
  boton.hidden=carrito.length===0;
  panel.querySelectorAll(".agenda-continuar").forEach(b=>{b.hidden=carrito.length===0;b.querySelector(".agenda-cantidad").textContent=carrito.length;});
  panel.querySelector(".carrito-total strong").textContent=cop(carrito.reduce((s,x)=>s+(x.precio||0),0));
  if(!carrito.length){contenido.innerHTML='<p class="carrito-vacio">Aún no has añadido servicios. Explora los tratamientos y elige los que te interesen.</p>';return;}
  const lista=document.createElement("div");lista.className="carrito-lista";
  carrito.forEach((item,i)=>{const fila=document.createElement("div");fila.className="carrito-linea";const datos=document.createElement("div");const nombre=document.createElement("strong");nombre.textContent=item.nombre;const precio=document.createElement("small");precio.textContent=item.precio===null?"Valor por consultar":cop(item.precio);datos.append(nombre,precio);const quitar=document.createElement("button");quitar.type="button";quitar.className="carrito-quitar";quitar.innerHTML='<span class="icono-eliminar" aria-hidden="true">×</span><span>Eliminar</span>';quitar.addEventListener("click",()=>{carrito.splice(i,1);guardarSeleccion();actualizar();render();});fila.append(datos,quitar);lista.append(fila);});contenido.replaceChildren(lista);
 }
 function actualizar(){document.querySelectorAll(".boton-anadir-servicio").forEach(b=>{const on=carrito.some(x=>x.id===b.dataset.itemId);b.innerHTML=on?'<span class="marca-anadido" aria-hidden="true">✓</span><span>Añadido</span>':'<span>Añadir</span><span class="simbolo-anadir" aria-hidden="true">＋</span>';b.classList.toggle("anadido",on);b.setAttribute("aria-pressed",String(on));const card=b.closest(".tarjeta-servicio,.curso-contenido");if(card)card.classList.toggle("servicio-seleccionado",on);});}
 function crearBoton(destino,nombre,precio,id){const b=document.createElement("button");b.type="button";b.className="boton-anadir-servicio";b.dataset.itemId=id;b.textContent="Añadir";b.setAttribute("aria-pressed","false");b.addEventListener("click",()=>{const i=carrito.findIndex(x=>x.id===id);if(i>=0)carrito.splice(i,1);else carrito.push({id,nombre,precio});guardarSeleccion();actualizar();render();mostrarAviso(i>=0?"Se quitó de tu selección":"¡Añadido a tu selección!");});destino.append(b);}
 document.querySelectorAll("#pestanas .tarjeta-servicio,#facial .tarjeta-servicio").forEach((card,i)=>{const nombre=card.querySelector("h3")?.textContent.trim(),strong=card.querySelector(".precio-servicio strong"),destino=card.querySelector(".precio-servicio");if(nombre&&strong&&destino){const digits=strong.textContent.replace(/[^0-9]/g,"");crearBoton(destino,nombre,digits?Number(digits):null,"servicio-"+i);}});
 const curso=document.querySelector("#cursos .curso-datos");if(curso)crearBoton(curso,"Formación profesional personalizada en extensiones de pestañas",1400000,"curso-extensiones-profesional");
 // Navegación interna de la agenda: categorías, servicios y confirmación.
 const ventanaAgenda=panel.querySelector(".carrito-ventana");
 const vistaCategorias=document.createElement("section");
 vistaCategorias.className="agenda-vista agenda-categorias";
 vistaCategorias.innerHTML='<div class="agenda-intro"><p class="agenda-etiqueta">LUISA ZAPATA · BEAUTY STUDIO</p><h3>Agenda tu cita</h3><p>Selecciona la categoría que deseas consultar.</p></div><div class="agenda-categorias-grid"></div><button type="button" class="agenda-continuar" hidden>Ver mi selección <span class="agenda-cantidad">0</span></button>';
 const vistaDetalle=document.createElement("section");
 vistaDetalle.className="agenda-vista agenda-detalle";
 vistaDetalle.hidden=true;
 vistaDetalle.innerHTML='<button type="button" class="agenda-volver">← Todas las categorías</button><div class="agenda-detalle-cabecera"><p class="agenda-etiqueta"></p><h3></h3><p></p></div><div class="agenda-detalle-lista"></div><button type="button" class="agenda-continuar" hidden>Ver mi selección <span class="agenda-cantidad">0</span></button>';
 const confirmacion=document.createElement("section");
 confirmacion.className="agenda-confirmacion";
 const volverCategorias=document.createElement("button");
 volverCategorias.type="button";volverCategorias.className="agenda-volver agenda-volver-confirmacion";
 volverCategorias.textContent="← Seguir explorando servicios";
 const contenidoExistente=panel.querySelector(".carrito-contenido");
 const totalExistente=panel.querySelector(".carrito-total");
 const formularioExistente=panel.querySelector(".formulario-cita");
 confirmacion.append(volverCategorias,contenidoExistente,totalExistente,formularioExistente);
 confirmacion.hidden=true;
 ventanaAgenda.append(vistaCategorias,vistaDetalle,confirmacion);
 function crearTarjetaCategoria(id,titulo,descripcion,foto){
  const b=document.createElement("button");b.type="button";b.className="agenda-categoria";b.dataset.categoria=id;
  if(foto){const imagen=foto.cloneNode(true);imagen.classList.add("agenda-categoria-imagen");if(imagen.tagName==="IMG"){imagen.removeAttribute("style");imagen.loading="lazy";}b.append(imagen);}
  const textos=document.createElement("span");textos.className="agenda-categoria-textos";
  const nombre=document.createElement("strong");nombre.textContent=titulo;
  const detalle=document.createElement("small");detalle.textContent=descripcion;
  const enlace=document.createElement("span");enlace.className="agenda-categoria-enlace";enlace.textContent="Ver servicios →";
  textos.append(nombre,detalle,enlace);b.append(textos);return b;
 }
 const categorias=[
  {id:"pestanas",titulo:"Pestañas y cejas",descripcion:"Extensiones, lifting y diseño de cejas.",seccion:document.querySelector("#pestanas"),foto:document.querySelector("#pestanas .foto-servicio"),subtitulo:"PESTAÑAS Y CEJAS",frase:"Un efecto para cada estilo, una mirada que habla por ti."},
  {id:"facial",titulo:"Facial",descripcion:"Limpiezas y tratamientos para tu piel.",seccion:document.querySelector("#facial"),foto:document.querySelector("#facial .foto-servicio"),subtitulo:"CUIDADO FACIAL",frase:"Tratamientos para consentir y cuidar tu piel."},
  {id:"cursos",titulo:"Cursos",descripcion:"Formación profesional y personalizada.",seccion:document.querySelector("#cursos"),foto:document.querySelector("#cursos .imagen-curso img"),subtitulo:"FORMACIÓN PROFESIONAL",frase:"Aprende y perfecciona tus técnicas."}
 ];
 const rejillaCategorias=vistaCategorias.querySelector(".agenda-categorias-grid");
 categorias.forEach(cat=>{
  const tarjeta=crearTarjetaCategoria(cat.id,cat.titulo,cat.descripcion,cat.foto);
  tarjeta.addEventListener("click",()=>abrirCategoria(cat.id));
  rejillaCategorias.append(tarjeta);
 });
 function abrirCategoria(id){
  const cat=categorias.find(x=>x.id===id);if(!cat)return;
  vistaCategorias.hidden=true;confirmacion.hidden=true;vistaDetalle.hidden=false;
  vistaDetalle.querySelector(".agenda-etiqueta").textContent=cat.subtitulo;
  vistaDetalle.querySelector("h3").textContent=cat.titulo;
  vistaDetalle.querySelector(".agenda-detalle-cabecera>p:last-child").textContent=cat.frase;
  const lista=vistaDetalle.querySelector(".agenda-detalle-lista");lista.replaceChildren();
  if(id==="cursos"){
   const original=cat.seccion?.querySelector(".curso-contenido");
   if(original){
    const copia=original.cloneNode(true);
    copia.querySelectorAll(".boton-anadir-servicio").forEach(x=>x.remove());
    const datos=copia.querySelector(".curso-datos");
    if(datos)crearBoton(datos,"Formación profesional personalizada en extensiones de pestañas",1400000,"curso-extensiones-profesional");
    lista.append(copia);
   }
  }else{
   cat.seccion?.querySelectorAll(".tarjeta-servicio").forEach((original,i)=>{
    const copia=original.cloneNode(true);
    copia.querySelectorAll(".boton-anadir-servicio").forEach(x=>x.remove());
    const nombre=copia.querySelector("h3")?.textContent.trim();
    const precio=copia.querySelector(".precio-servicio strong");
    const destino=copia.querySelector(".precio-servicio");
    if(nombre&&destino){
     const digits=precio?.textContent.replace(/[^0-9]/g,"")||"";
     crearBoton(destino,nombre,digits?Number(digits):null,"agenda-"+id+"-"+i);
    }
    lista.append(copia);
   });
  }
  render();ventanaAgenda.scrollTop=0;
 }
 function mostrarConfirmacion(){
  vistaCategorias.hidden=true;vistaDetalle.hidden=true;confirmacion.hidden=false;
  render();ventanaAgenda.scrollTop=0;
 }
 function mostrarCategorias(){
  vistaDetalle.hidden=true;confirmacion.hidden=true;vistaCategorias.hidden=false;
  render();ventanaAgenda.scrollTop=0;
 }
 vistaDetalle.querySelector(".agenda-volver").addEventListener("click",mostrarCategorias);
 volverCategorias.addEventListener("click",mostrarCategorias);
 vistaCategorias.querySelector(".agenda-continuar").addEventListener("click",mostrarConfirmacion);
 vistaDetalle.querySelector(".agenda-continuar").addEventListener("click",mostrarConfirmacion);

 let posicionScrollGuardada=0;
 function abrirPanelSeleccion(vista="categorias"){
  posicionScrollGuardada=window.scrollY||window.pageYOffset;
  document.body.classList.add("seleccion-abierta");
  document.body.style.top="-"+posicionScrollGuardada+"px";
  panel.hidden=false;
  render();
  if(vista==="seleccion")mostrarConfirmacion();else mostrarCategorias();
 }
 function cerrarPanelSeleccion(){
  if(panel.hidden)return;
  panel.hidden=true;
  document.body.classList.remove("seleccion-abierta");
  document.body.style.top="";
  window.scrollTo(0,posicionScrollGuardada);
 }
 boton.addEventListener("click",()=>abrirPanelSeleccion("seleccion"));
 document.querySelectorAll(".boton-agendar").forEach(enlace=>enlace.addEventListener("click",e=>{e.preventDefault();abrirPanelSeleccion("categorias");}));
 panel.querySelector(".carrito-cerrar").addEventListener("click",cerrarPanelSeleccion);
 panel.addEventListener("click",e=>{if(e.target===panel)cerrarPanelSeleccion();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)cerrarPanelSeleccion();});
 const formulario=panel.querySelector(".formulario-cita"), fecha=formulario.elements.fecha;
 const calendario=panel.querySelector(".calendario-personalizado");
 const tituloCalendario=calendario.querySelector(".calendario-titulo");
 const rejillaDias=calendario.querySelector(".calendario-dias");
 const confirmarFecha=calendario.querySelector(".calendario-confirmar");
 const hoy=new Date();hoy.setHours(0,0,0,0);
 let mesVisible=new Date(hoy.getFullYear(),hoy.getMonth(),1), fechaElegida="";
 const nombresMeses=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
 const fechaISO=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
 const formatoFecha=d=>{const partes=new Intl.DateTimeFormat("es-CO",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).formatToParts(d);const parte=tipo=>partes.find(p=>p.type===tipo)?.value||"";const inicial=texto=>texto.charAt(0).toLocaleUpperCase("es-CO")+texto.slice(1);return inicial(parte("weekday"))+", "+parte("day")+" de "+inicial(parte("month"))+" de "+parte("year");};
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
   botonDia.addEventListener("click",evento=>{
    evento.preventDefault();evento.stopPropagation();
    fechaElegida=iso;confirmarFecha.disabled=false;dibujarCalendario();
   });
   rejillaDias.append(botonDia);
  }
 }
 calendario.addEventListener("click",evento=>evento.stopPropagation());
 function abrirCalendario(){calendario.hidden=false;confirmarFecha.disabled=!fechaElegida;fecha.setAttribute("aria-expanded","true");dibujarCalendario();}
 confirmarFecha.addEventListener("click",evento=>{evento.preventDefault();evento.stopPropagation();if(!fechaElegida)return;const [anio,mes,dia]=fechaElegida.split("-").map(Number);const seleccion=new Date(anio,mes-1,dia);fecha.value=formatoFecha(seleccion);fecha.setCustomValidity("");calendario.hidden=true;fecha.setAttribute("aria-expanded","false");});
 fecha.addEventListener("click",()=>calendario.hidden?abrirCalendario():(calendario.hidden=true,fecha.setAttribute("aria-expanded","false")));
 fecha.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();abrirCalendario();}if(e.key==="Escape"){calendario.hidden=true;fecha.setAttribute("aria-expanded","false");}});
 calendario.querySelector(".calendario-mes-anterior").addEventListener("click",evento=>{evento.preventDefault();evento.stopPropagation();const anterior=new Date(mesVisible.getFullYear(),mesVisible.getMonth()-1,1);if(anterior>=new Date(hoy.getFullYear(),hoy.getMonth(),1)){mesVisible=anterior;dibujarCalendario();}});
 calendario.querySelector(".calendario-mes-siguiente").addEventListener("click",evento=>{evento.preventDefault();evento.stopPropagation();mesVisible=new Date(mesVisible.getFullYear(),mesVisible.getMonth()+1,1);dibujarCalendario();});

 const opcionesModalidad=formulario.querySelectorAll('input[name="modalidad"]'),campoDireccion=formulario.querySelector(".campo-direccion");
 const campoBarrio=formulario.elements.barrio;
 opcionesModalidad.forEach(opcion=>opcion.addEventListener("change",()=>{const domicilio=opcion.value==="A domicilio";campoDireccion.hidden=!domicilio;formulario.elements.direccion.required=domicilio;campoBarrio.required=domicilio;if(!domicilio){formulario.elements.direccion.value="";campoBarrio.value="";}}));
 formulario.addEventListener("submit",evento=>{
  evento.preventDefault();if(!carrito.length){alert("Añade al menos un servicio antes de solicitar tu cita.");return;}if(!formulario.checkValidity()){alert("Para realizar la solicitud, debes completar todos los campos obligatorios.");formulario.reportValidity();return;}
  const datos=new FormData(formulario);
  const lineas=carrito.map((x,i)=>(i+1)+". "+x.nombre+" — "+(x.precio===null?"valor por consultar":cop(x.precio)));
  const total=carrito.reduce((s,x)=>s+(x.precio||0),0),pendiente=carrito.some(x=>x.precio===null);
  const fechaMensaje=String(datos.get("fecha")||"").replace(/^./,letra=>letra.toLocaleUpperCase("es-CO"));
  const partesMensaje=[
   "Hola, Luisa. Quisiera solicitar una cita.",
   "",
   "*Datos de contacto*",
   "Nombre: "+datos.get("nombre"),
   "Celular: "+datos.get("telefono"),
   "",
   "*Servicios seleccionados*",
   ...lineas,
   "",
   "*Total:* "+cop(total)
  ];
  if(pendiente)partesMensaje.push("Un servicio tiene el valor pendiente por confirmar.");
  partesMensaje.push(
   "",
   "*Preferencias de cita*",
   "*Fecha:* "+fechaMensaje,
   "*Horario:* "+datos.get("hora"),
   "*Modalidad:* "+datos.get("modalidad")
  );
  if(datos.get("modalidad")==="A domicilio")partesMensaje.push(
   "",
   "*Datos para el servicio a domicilio*",
   "Dirección: "+datos.get("direccion"),
   "Barrio: "+datos.get("barrio")
  );
  if(datos.get("observaciones"))partesMensaje.push("","*Observaciones:* "+datos.get("observaciones"));
  partesMensaje.push("","Quedo pendiente de tu confirmación. ¡Muchas gracias!");
  const msg=partesMensaje.join("\n");
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
