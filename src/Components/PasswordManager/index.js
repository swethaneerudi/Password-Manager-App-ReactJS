import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordRecords: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    count: 0,
    searchInput: '',
    isShowed: false,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: uuidv4(),
      websiteInput,
      usernameInput,
      passwordInput,
    }

    this.setState(prevState => ({
      passwordRecords: [...prevState.passwordRecords, newPassword],
      count: prevState.count + 1,
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onClickDeletePassword = id => {
    const {passwordRecords} = this.state
    const filteredPasswords = passwordRecords.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({
      passwordRecords: filteredPasswords,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  getSearchedRecords = () => {
    const {passwordRecords, searchInput} = this.state
    return passwordRecords.filter(eachRecord =>
      eachRecord.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  onRenderShowedPasswords = () => {
    const {isShowed} = this.state
    const searchedResults = this.getSearchedRecords()

    if (searchedResults.length !== 0) {
      return (
        <ul className="passwords-list-container">
          {searchedResults.map(eachItem => (
            <PasswordItem
              record={eachItem}
              key={eachItem.id}
              deletePasswordRecord={this.onClickDeletePassword}
              showPassword={isShowed}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-passwords-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-passwords-image"
        />
        <p className="no-passwords-title">No Passwords</p>
      </div>
    )
  }

  onChangeWebsite = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeCheck = () => {
    this.setState(prevState => ({
      isShowed: !prevState.isShowed,
    }))
  }

  render() {
    const {websiteInput, usernameInput, passwordInput} = this.state
    const searchedResults = this.getSearchedRecords()
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <div className="app-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app-logo"
            />
          </div>
          <div className="input-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-image"
            />
            <div className="card">
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-box">
                  <div className="input-icon-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                      className="input-icon"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="input-text"
                    onChange={this.onChangeWebsite}
                    value={websiteInput}
                  />
                </div>
                <div className="input-box">
                  <div className="input-icon-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="input-icon"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="input-text"
                    onChange={this.onChangeUsername}
                    value={usernameInput}
                  />
                </div>

                <div className="input-box">
                  <div className="input-icon-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="input-icon"
                    />
                  </div>

                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="input-text"
                    onChange={this.onChangePassword}
                    value={passwordInput}
                  />
                </div>
                <div className="add-btn-container">
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card-container">
            <div className="card-responsive">
              <div className="passwords-header">
                <h1 className="passwords-header-title">
                  Your Passwords
                  <p className="results-count"> {searchedResults.length}</p>
                </h1>

                <div className="search-container">
                  <div className="search-icon-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                      alt="search"
                      className="search-icon"
                    />
                  </div>

                  <input
                    type="search"
                    placeholder="Search"
                    className="search-input"
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
              <hr className="hr-line" />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  id="myCheckBox"
                  onChange={this.onChangeCheck}
                />
                <label className="checkbox-label" htmlFor="myCheckBox">
                  Show Passwords
                </label>
              </div>
              {this.onRenderShowedPasswords()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
