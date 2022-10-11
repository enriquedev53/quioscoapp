import { useEffect, useCallback } from "react"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"
import Layout from "../layout/Layout"

export default function Total() {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "";
  }, [pedido, nombre])

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido])

  return (
    <Layout pagina='Total y Confirmar Pedido'>
      <h1 className="text-4xl font-black">
        Total y Confirmar Pedido
      </h1>
      <p className="text-2xl my-10">
        Confirma tu Pedido a Continuación
      </p>

      <form
      onSubmit={colocarOrden}>
        <div>
          <label 
          htmlFor="nombre"
          className="block uppercase text-slate-800 front-bold text-xl">
          </label>
          <input 
          id="nombre"
          type="text" className="bg-gray-200 w-1/2 lg:w-2/5 xl:w-1/4 2xl:w-1/5 rounded-md mt-3 p-2"
          value={nombre}
          onChange={e => setNombre(e.target.value)}></input>
        </div>

        <div className="mt-10">
          <p className="text-2xl">Total a pagar:{' '}
            <span className="font-bold">
              {formatearDinero(total)}
            </span>
          </p>
        </div>

        <div className="mt-5">
          <input 
          type="submit"
          className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} w-1/2 lg:w-2/5 xl:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
          value="Confirmar Pedido"
          disabled={comprobarPedido()}>
          </input>
        </div>
      </form>
    </Layout>
  )
}
