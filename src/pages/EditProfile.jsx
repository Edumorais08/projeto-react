import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      const user = JSON.parse(session);
      setCurrentUser(user);
      setForm(user);
    } else {
      alert("Você precisa estar logado para editar seu perfil.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? form : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("session", JSON.stringify(form));
    alert("Perfil atualizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="edit-profile-container">
      <h1>Editar Perfil</h1>
      <form className="edit-profile-form" onSubmit={handleSave}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="save-button">
          Salvar Alterações
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
