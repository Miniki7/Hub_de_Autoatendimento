import './Navbar.css'
export default function Navbar({ usuario, usuarioId, usuarios, onTrocarUsuario }) {
  return (
    <nav className="navbar">
      <span className="navbar_logo">FALKON</span>

      {usuarios && onTrocarUsuario && (
        <div className="navbar_usuario">
          <span className="navbar_label">Usuário:</span>
          <select className="navbar_select" value={usuarioId} onChange={(e) => onTrocarUsuario(e.target.value)}>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      {usuario && (
        <div className="navbar_perfil">
          <div className="navbar_avatar">{usuario.nome.charAt(0)}</div>
          <div>
            <p className="navbar_nome">{usuario.nome}</p>
            <p className="navbar_saldo">
              Saldo: R$ {usuario.carteira_saldo.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      )}
    </nav>
  )
}