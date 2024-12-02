import React, { useState, useEffect } from "react";
import styles from "./UserManager.module.css";

const RegisterPage = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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

  return (
    <div className={styles.container}>
      <h1>Registrar</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
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
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já possui uma conta? <a href="/login">Faça login aqui</a>.
      </p>
    </div>
  );
};

export default RegisterPage;
