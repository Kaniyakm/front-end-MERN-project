// PHASE 3-2: Login Page Skeleton
// Matches Figma: Title, subtitle, email, password, login button

function Login() {
  return (
    <div className="login-container">
      <h1>Balance Blueprint</h1>
      <p>Smart budgeting with AI-powered insights</p>

      <form>
        <label>Email</label>
        <input type="email" placeholder="you@example.com" />

        <label>Password</label>
        <input type="password" placeholder="••••••••" />

        <button>Login</button>
      </form>

      <a href="/register">Create an account</a>
    </div>
  );
}

export default Login;