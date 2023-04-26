import './index.css'

const PasswordItem = props => {
  const profileColors = [
    '#7683cb',
    '#f59e0b',
    '#10b981',
    '#f97316',
    '#14b8a6',
    '#b91c1c',
    '#0ea5e9',
  ]
  const profilePicColor = profileColors[Math.floor(Math.random() * 7)]

  const {record, deletePasswordRecord, showPassword} = props
  const {id, websiteInput, usernameInput, passwordInput} = record

  const passwordPattern = showPassword ? (
    <p className="website-text">{passwordInput}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-icon"
    />
  )

  const deleteItem = () => {
    deletePasswordRecord(id)
  }

  return (
    <li className="password-item">
      <div>
        <p className="circle" style={{background: `${profilePicColor}`}}>
          {websiteInput.charAt(0)}
        </p>
      </div>
      <div className="details-container">
        <p className="website-text">{websiteInput}</p>
        <p className="website-text">{usernameInput}</p>
        {passwordPattern}
      </div>
      <button
        type="button"
        onClick={deleteItem}
        className="delete-btn"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default PasswordItem
