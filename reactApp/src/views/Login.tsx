import { Link } from "react-router-dom"

function Login() {
  const onSubmit = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
}
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Sign Up? <Link to='/signup'>Create an acount</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login