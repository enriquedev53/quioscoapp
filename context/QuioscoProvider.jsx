import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

const QuioscoContext =  createContext()

const QuioscoProvider = ({children}) => {

  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [paso, setPaso] = useState(1)

  const obtenerCategorias = async () => {
    const { data } = await axios('./api/categorias');
    setCategorias(data)
  }

  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  const handleClickCategoria = id => {
    const categoria = categorias.filter( cat => cat.id === id )
    setCategoriaActual(categoria[0])
  }

  const handleSetProducto = producto => {
    setProducto(producto)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleAgregarPedido = ({categoriaId, ...producto}) => {
    if(pedido.some(productoState => productoState.id === producto.id)) {
        const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
        setPedido(pedidoActualizado)
        toast.success('Guardado Correctamente')
    } else {
        setPedido([...pedido, producto])
        toast.success('Agregado al Pedido')
    }

    setModal(false)

  }

  const handleEditarCantidades = id => {
   const productoActualizar = pedido.filter(producto => producto.id === id)
   setProducto(productoActualizar[0])
   
    setModal(!modal)
  }

  const handleEliminarProducto = id => {
    const productoEliminar = pedido.filter(producto => producto.id !== id)
    setPedido(productoEliminar)
  }

  return (
    <QuioscoContext.Provider
    value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto, 
        handleSetProducto,
        modal, 
        handleChangeModal,
        pedido,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto
    }}>
        {children}
    </QuioscoContext.Provider>
  )
}
export {
    QuioscoProvider
}

export default QuioscoContext