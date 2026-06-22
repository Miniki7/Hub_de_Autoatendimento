import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRefund } from '../../hooks/useRefund'
import { getProduct } from '../../services/productService'
import { API_URL } from '../../services/api'
import Navbar from '../../components/Navbar'
import './Refund.css'

export default function Refund() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { refund } = useRefund()

  const [order, setOrder] = useState(null)
  const [produto, setProduto] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [confirmando, setConfirmando] = useState(false)
  const [concluido, setConcluido] = useState(false)

  useEffect(() => {
    async function carregar() {
      const resOrder = await fetch(`${API_URL}/pedidos/${id}`)
      const pedido = await resOrder.json()

      if (pedido && pedido.id) {
        setOrder(pedido)
        const prod = await getProduct(pedido.produtoId)
        setProduto(prod)
        const resUser = await fetch(`${API_URL}/usuarios/${pedido.usuarioId}`)
        const user = await resUser.json()
        setUsuario(user)
      }

      setCarregando(false)
    }
    carregar()
  }, [id])

  async function handleConfirmar() {
    setConfirmando(true)
    await refund(order.id)
    setConfirmando(false)
    setConcluido(true)
  }

  if (carregando) {
    return (
      <div className="rf-wrapper">
        <Navbar usuario={null} />
        <main className="rf-main">
          <p style={{ color: '#4A7FA5', fontSize: '0.88rem' }}>Carregando...</p>
        </main>
      </div>
    )
  }

  if (!order || !produto) {
    return (
      <div className="rf-wrapper">
        <Navbar usuario={usuario} />
        <main className="rf-main">
          <button className="rf-btn rf-btn--ghost rf-voltar" onClick={() => navigate('/')}>
            ← Voltar para o Hub
          </button>
          <div className="rf-center">
            <p style={{ color: '#4A7FA5', fontSize: '0.88rem' }}>Pedido não encontrado.</p>
          </div>
        </main>
      </div>
    )
  }

  if (concluido) {
    return (
      <div className="rf-wrapper">
        <Navbar usuario={usuario} />
        <main className="rf-main">
          <button className="rf-btn-ghost" onClick={() => navigate('/')}>
            ← Voltar para o Hub
          </button>
          <div className="rf-sucesso">
            <span className="rf-sucesso_icone">✅</span>
            <h2>Reembolso solicitado!</h2>
            <p>
              O valor de{' '}
              <strong>R$ {order.valor_pago.toFixed(2).replace('.', ',')}</strong>{' '}
              foi devolvido para sua carteira.
            </p>
            <button className="rf-btn-prim" onClick={() => navigate('/')}>
              Voltar para o Hub
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="rf-wrapper">
      <Navbar usuario={usuario} />

      <main className="rf-main">
        <button className="rf-btn-ghost" onClick={() => navigate('/')}>
          ← Voltar para o Hub
        </button>

        <div className="rf-center">
          <header className="rf-header">
            <h1 className="rf-titulo">Solicitar Reembolso</h1>
            <p className="rf-sub">Revise os detalhes antes de confirmar</p>
          </header>

          <div className="rf-card">
            <h2 className="rf-produto-nome">{produto.nome}</h2>
            <p className="rf-produto-desc">{produto.descricao}</p>

            <table className="rf-table">
              <tbody>
                <tr>
                  <td className="rf-table_label">Valor pago</td>
                  <td className="rf-table_valor">
                    R$ {order.valor_pago.toFixed(2).replace('.', ',')}
                  </td>
                </tr>
                <tr>
                  <td className="rf-table_label">Data do pedido</td>
                  <td className="rf-table_valor">
                    {new Date(order.data).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
                <tr>
                  <td className="rf-table_label">Status</td>
                  <td className="rf-table_valor">
                    <span className="status status--entregue">Entregue</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="rf-aviso">
            Ao confirmar, o valor será devolvido integralmente para o saldo da sua carteira.
          </p>

          <button className="rf-btn-prim" onClick={handleConfirmar} disabled={confirmando}>
            {confirmando ? 'Processando...' : 'Confirmar Reembolso'}
          </button>
        </div>
      </main>
    </div>
  )
}