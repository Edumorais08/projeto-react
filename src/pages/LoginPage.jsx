import { useState } from "react";
import styles from "./UserManager.module.css";

import { Link } from "react-router-dom";

const LoginPage = () => {
  const [users] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  });
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === form.email);
    if (!user) {
      setLoginError("Usuário não encontrado. Verifique o e-mail informado.");
      return;
    }
    if (user.password !== form.password) {
      setLoginError("Senha incorreta. Tente novamente.");
      return;
    }
    localStorage.setItem("session", JSON.stringify(user));
    alert("Login realizado com sucesso!");
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Entrar</button>
        {loginError && <p className={styles.error}>{loginError}</p>}
      </form>
      <p>
        Não possui uma conta? <Link to="/register">Cadastre-se aqui</Link>.
      </p>
    </div>
  );
};

export default LoginPage;
