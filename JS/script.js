let listaProductos = "Productos disponibles:"
let total = 0
let seguirNavegando
let ProductoIngresado
let indexProductoIngresado
let cantidadIngresada
let nombre
const carrito = []
let n
let listaProductosCarrito
// Clase constructora para cada producto
class Producto{
    constructor(tipo, material, precio, stock, cantidadIngresada){
       this.tipo = tipo,
       this.material = material,
       this.precio = precio,
       this.stock = stock,
       this.cantidadIngresada = cantidadIngresada
       
    }
    // Estas funcion muestran un producto con sus propiedades
    mostrarProducto() {
        listaProductos = `${listaProductos}${n}) ${this.tipo} de ${this.material} \nPrecio: ${this.precio} \nUnidades: ${this.stock}\n`
        n += 1 
        return listaProductos
    }
    mostrarProductosCarrito(){
        listaProductosCarrito = `${listaProductosCarrito}${n}) ${this.tipo} de ${this.material} \nCantidad: ${this.cantidadIngresada} \n`
        n += 1
        return listaProductosCarrito
    }
}
const collarOro = new Producto("Collar", "oro rosa con colgante de cristal", 1200, 18)
const anilloGema = new Producto("Anillo", "plata con gema natural", 780, 12)
const gargantillaTerciopelo = new Producto("Gargantilla", "terciopelo con un colgante de corazon", 950, 25)
const pulseraPerlas = new Producto("Pulsera", "perlas blancas con broche de plata", 850, 18)
const pendientesDiamantes = new Producto("Pendientes", "oro blanco con diamantes", 2500, 8)
const anilloCompromiso = new Producto("Anillo", "oro amarillo con diamante", 3500, 5)
const productosDisponibles = [collarOro, anilloGema, gargantillaTerciopelo, pulseraPerlas, pendientesDiamantes, anilloCompromiso]
// Funcion para hacer una lista con todos los productos en un array
function listaDeProductos (array){
    array.forEach(producto => {
        producto.mostrarProducto()
      })
}
// Funcion para ingresar el nombre, intente que solo permitiera ingresar letras
function promptNombre() {
    nombre = prompt("Ingrese su nombre") 
    if(/[1234567890!¿{}.,#%&;:_]/.test(nombre) === true){
       nombre = prompt("Ingrese solo letras")
    }
    else {
       return nombre
    }
   }
// Funcion que calcula el total de la compra multiplicando la cantidad ingresada por el precio de la unidad para cada objeto en el carrito
function finalizarCompra(){
    carrito.forEach(producto => {
        total += parseInt(producto.precio) * parseInt(producto.cantidadIngresada)
      })
    alert(`El total de su compra es ${total}\nGracias por elegirnos!`)
}
function seguirNavegacion(mensaje1, mensaje2) {
seguirNavegando = prompt(mensaje1 + "\nDesea seguir navegando?" + mensaje2).toLowerCase()
if(seguirNavegando === "si" || seguirNavegando === "sí") {
    opcionIngresada = prompt(`Ingrese el numero de la opcion que desea:\n1) Navegar en la tienda\n2) Buscar productos segun precio\n3) Ver carrito\n4)Eliminar un producto del carrito\n5)Finalizar compra`)
}
else if(seguirNavegando == "no") {
    finalizarCompra()
}
else {
    seguirNavegando = prompt(mensaje1 + "\nDesea seguir navegando?" + mensaje2).toLowerCase()
}
}
// Esta funcion elimina un producto del array si su stock es 0 
function checkDisponibilidad(array) {
if (array[indexProductoIngresado].stock == 0) {
    array.splice(indexProductoIngresado, 1)
}
}
function compra(array){
    ProductoIngresado = parseInt(prompt(`Ingrese el numero del producto que desea agregar al carrito\n${listaProductos}`))
    // En la lista de productos se enumera empezando desde el 1, pero el n° de index empieza en cero, asi que para calcularlo hay que restarle uno al numero ingresado
    indexProductoIngresado = ProductoIngresado - 1
    cantidadIngresada = parseInt(prompt(`Indique la cantidad que desea comprar. Contamos con ${array[indexProductoIngresado].stock} unidades.`))
    // No permite añadir al carrito si la cantidad es mayor al stock disponible
    if(cantidadIngresada > array[indexProductoIngresado].stock) {
        cantidadIngresada = parseInt(prompt(`No poseemos ${cantidadIngresada} unidades de este producto.\nPor favor seleccione una cantidad menor a ${array[indexProductoIngresado].stock} unidades.`))
    }
    // No permite añadir al carrito si la cantidad es menor a cero o se escriben letras
    else if(cantidadIngresada <= 0 || isNaN(cantidadIngresada) == true){
        cantidadIngresada = parseInt(prompt(`Ingrese una cantidad valida. Contamos con ${array[indexProductoIngresado].stock} unidades.`))
    }
    // Añade el producto al carrito, se pregunta si desea seguir navegando y se resta la cantidad ingresada al stock
    else {
        array[indexProductoIngresado].cantidadIngresada = cantidadIngresada
        array[indexProductoIngresado].stock -= cantidadIngresada
        carrito.push(array[indexProductoIngresado])
        seguirNavegacion(`${array[indexProductoIngresado].cantidadIngresada} unidades de ${array[indexProductoIngresado].tipo} de ${array[indexProductoIngresado].material} fueron añadidos a su carrito.`, "")
        checkDisponibilidad(productosDisponibles)
    }
}
// Esta funcion busca todos los productos dentro de un rango de precio donde el precio ingresado es el maximo
function busquedaPorPrecio() {
do {
    let precioMax = parseInt(prompt("Ingrese el precio máximo que desea buscar"))
    // checkea que el precio ingresado no sean letras
    if (isNaN(precioMax) == true) {
      precioMax = parseInt(prompt("Ingrese un número válido para el precio máximo que desea buscar"))
    }
    busqueda = productosDisponibles.filter((producto) => {
      return producto.precio <= precioMax
    })
    if (busqueda.length === 0) {
      precioMax = parseInt(prompt("Lamentablemente no tenemos productos en ese rango de precio. Ingrese un precio máximo diferente."))
    }
  } while (busqueda.length === 0)
    // Muestra los productos encontrados y permite comprar dentro de esa seleccion
    listaProductos = 'Los resultados de su búsqueda son:\n'
    n = 1
    listaDeProductos(busqueda)
    compra(busqueda)

}
function mostrarCarrito(){
    n = 1
    listaProductosCarrito = "Los productos en su carrito son:\n"
    carrito.forEach(producto => {
        producto.mostrarProductosCarrito()
      })
    seguirNavegacion(listaProductosCarrito,"\n(Si ingresa \"no\" se finalizara su compra)")
}
function eliminarDelCarrito(){
        n = 1
    listaProductosCarrito = "Ingrese el numero del producto que desea quitar:\n"
    carrito.forEach(producto => {
        producto.mostrarProductosCarrito()
      })
    productoEliminar = parseInt(prompt(listaProductosCarrito))
    if (isNaN(productoEliminar) == true) {
        productoEliminar = parseInt(prompt(listaProductosCarrito))
    }
    else {
        indexProductoEliminar = productoEliminar - 1
        carrito.splice(indexProductoEliminar, 1)
        mostrarCarrito()
    }
}
function menu(){
opcionIngresada = prompt(`Bienvenido/a ${nombre}\nIngrese el numero de la opcion que desea:\n1) Navegar en la tienda\n2) Buscar productos segun precio\n3) Ver carrito\n4)Eliminar un producto del carrito\n5)Finalizar compra`)
do {
    switch(opcionIngresada) {
        case "1":
            listaProductos = "Los productos disponibles son:\n"
            n = 1
            listaDeProductos(productosDisponibles)
            compra(productosDisponibles)
            break;
        case "2":
            busquedaPorPrecio()
            break;
        case "3":
            mostrarCarrito()
            break;
        case "4":
            eliminarDelCarrito()
            break;
        case "5":
            finalizarCompra()
    }
} while(seguirNavegando == "si")
}
promptNombre()
menu()
