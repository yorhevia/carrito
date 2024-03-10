// funcionalidad al carrito
// 1) creacion de variables 
// para llamar un id siempre es con # (errores comunes) 
const  carrito=document.querySelector('#carrito');
//console.log (carrito);
 const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
 const listaCursos = document.querySelector('#lista-cursos');
 const contenedorCarrito = document.querySelector('#carrito tbody')
   //2. estructura donde vamos a guardar
   let articulosCarrito =[];
   //3. difinir los eventos
cargarEventos();
function cargarEventos(){
    //click para agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
}
function agregarCurso(e){
    e.preventDefault();
   // console.log ('ingrese la funcion');

 // console.log(e.target.classList.contains('agregar-carrito'));
  if(e.target.classList.contains('agregar-carrito')){
    const  curso = e.target.parentElement.parentElement;
   // console.log(curso)
   leerDatosCurso(curso)
  }
}

function leerDatosCurso(curso){
    //console.log(curso)
    const infoCurso = {
        Imagen: curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        
        precio: curso.querySelector('span').textContent,
        cantidad: 1,
        id: curso.querySelector('a').getAttribute('data-id')
    }
  
    if(articulosCarrito.some(curso => curso.id === infoCurso.id )){
      //console.log ('si esta)
      // que si exiata el curso, o ya haya agregado el curso
      const cursos = articulosCarrito.map(i=>{
        if(i.id === infoCurso.id){
          i.cantidad++;
         return i;
        }else{
         return i;


        }
      }) //actualiza
      
      //console.log(cursos)
      articulosCarrito = [...cursos]
      

    }else{
      // caso base 
      // que no exista, o no haya agregado el curso 
    articulosCarrito = [...articulosCarrito, infoCurso];
    
    }
    console.log(articulosCarrito);

    carritoHTML();
}


function carritoHTML(){
  vaciarCarrito();

  articulosCarrito.forEach(i=>{
    const row = document.createElement('tr');
    row.innerHTML = ` 
    <td>
    <img src="${i.Imagen}" width = 100>
    </td>
    <td>
    ${i.titulo}
    </td>
    <td>
    ${i.precio}
    </td>
    <td>
    ${i.cantidad}
    </td>
    <td>
    <a href="#" class="borrar-curso" data-id=${i.id}>x</a>
    </td>
    `;
    
    contenedorCarrito.appendChild(row)
      
   

  })
}


function vaciarCarrito(){
  //eliminar los cursos del carrito
  // forma lenta 
    contenedorCarrito.innerHTML = "";
  // forma rapida o normal
  /*while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }*/
}

function eliminarCurso(e){
    //eliminar curso del carrito
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')){
      const cursoId  =  e.target.getAttribute('data-id');
      // eliminar del arreglo del carrito de curso
      const existe =  articulosCarrito.some(cursos=>cursos.id !== cursoId);
          
          if(existe){
            const cursos = articulosCarrito.map(cursos=>{
              console.log(cursoId);
              console.log(cursos.id);

              if(cursos.id===cursoId){
              //primero verifico el id para aseguarar que haya encontrado el producro a eliminar

                  if(cursos.cantidad > 1 ){
                    cursos.cantidad--;
                    return cursos;
                  }
                  else{
                    //caso base cantidad = 1
                    articulosCarrito = articulosCarrito.filter(cursos=>cursos.id !==cursoId)
                    return cursos;
                  }
              }
           })
          }   
      carritoHTML();
    }
}

//eventos o listenners

cargarEventListenners();

function cargarEventListenners(){
 // captura un evento cuando hacemos click en el boton "agregar carrito"
 listaCursos.addEventListener('click',eliminarCurso);
 // eliminar un curso del carrito 
 carrito.addEventListener('click',eliminarCurso);
 // vaciar carrito
 vaciarCarritoBtn.addEventListener('click',vaciarCarrito);
 articulosCarrito = [];
 vaciarCarrito();

}