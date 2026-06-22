import { useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { useOrders } from '../../hooks/useOrders'
import { getProduct } from '../../services/productService'
import { useEffect, useState } from 'react'
import { API_URL } from '../../services/api'
import Navbar from '../../components/Navbar'
import './Dashboard.css'

export default function Dashboard() {
  const [usuarioId, setUsuarioId] = useState('1')
  const [usuarios, setUsuarios] = useState([])
  const user = useUser(usuarioId)
  const orders = useOrders(usuarioId)
  const [produtos, setProdutos] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    async function carregarUsuarios() {
      const res = await fetch(`${API_URL}/usuarios`)
      const data = await res.json()
      setUsuarios(data)
    }
    carregarUsuarios()
  }, [])

  useEffect(() => {
    setProdutos({})
    async function carregarProdutos() {
      const mapa = {}
      for (const order of orders) {
        if (!mapa[order.produtoId]) {
          const produto = await getProduct(order.produtoId)
          mapa[order.produtoId] = produto
        }
      }
      setProdutos(mapa)
    }
    if (orders.length > 0) carregarProdutos()
  }, [orders])

  return (
    <div className="dashboard-container">
      <Navbar
        usuario={user}
        usuarioId={usuarioId}
        usuarios={usuarios}
        onTrocarUsuario={setUsuarioId}
      />

      <main className="dashboard-main">
        <header className="dashboard-main_header">
          <h1 className="dashboard-main_titulo">Hub de Autoatendimento</h1>
          <p className="dashboard-main_sub">Gerencie seus pedidos e solicitações</p>
        </header>

        <h2 className="dashboard-main_secao">Meus Pedidos</h2>

        {!user ? (
          <p className="dashboard-main_vazio">Carregando...</p>
        ) : orders.length === 0 ? (
          <p className="dashboard-main_vazio">Nenhum pedido encontrado para este usuário.</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Data</th>
                <th>Valor pago</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const produto = produtos[order.produtoId]
                return (
                  <tr key={order.id}>
                    <td>{produto ? produto.nome : '...'}</td>
                    <td>{new Date(order.data).toLocaleDateString('pt-BR')}</td>
                    <td>R$ {order.valor_pago.toFixed(2).replace('.', ',')}</td>
                    <td>
                      {order.status === 'pendente' && (
                        <span className="status status--pendente">Pendente</span>
                      )}
                      {order.status === 'entregue' && (
                        <span className="status status--entregue">Entregue</span>
                      )}
                      {order.status === 'reembolso_solicitado' && (
                        <span className="status status--reembolso">Reembolso solicitado</span>
                      )}
                    </td>
                    <td>
                      {order.status === 'entregue' && (
                        <button
                          className="btn-reembolso"
                          onClick={() => navigate(`/refund/${order.id}`)}
                        >
                          Solicitar Reembolso
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  )
}