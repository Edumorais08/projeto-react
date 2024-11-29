import React, { useState, useEffect } from "react";
import styles from "./UserManager.module.css";

const UserManager = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  });
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editMode, setEditMode] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("session", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("session");
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const exists = users.find((user) => user.email === form.email);
    if (exists) {
      alert("E-mail já registrado!");
      return;
    }
    setUsers([...users, { ...form }]);
    setForm({ name: "", email: "", password: "" });
    alert("Cadastro realizado com sucesso!");
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
    setCurrentUser(user);
    setForm({ name: "", email: "", password: "" });
    setLoginError("");
    alert("Login realizado com sucesso!");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    alert("Logout realizado com sucesso!");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? { ...form } : user
    );
    setUsers(updatedUsers);
    setCurrentUser(form);
    setEditMode(false);
    alert("Dados atualizados com sucesso!");
  };

  const handleDelete = () => {
    const filteredUsers = users.filter((user) => user.email !== currentUser.email);
    setUsers(filteredUsers);
    setCurrentUser(null);
    alert("Conta excluída com sucesso!");
  };

  return (
    <div className={styles.container}>
      <h1>Gerenciamento de Usuários</h1>
      {!currentUser ? (
        <>
          <form onSubmit={editMode ? handleEdit : handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              required={!editMode}
            />
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
            <button type="submit">
              {editMode ? "Salvar Alterações" : "Cadastrar"}
            </button>
          </form>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
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
        </>
      ) : (
        <div>
          <h2>Bem-vindo, {currentUser.name}</h2>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
          <button onClick={() => setEditMode(true)}>Editar Dados</button>
          <button className={styles.logout} onClick={handleDelete}>
            Excluir Conta
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManager;
