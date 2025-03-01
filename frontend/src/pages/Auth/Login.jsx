import "./Auth.css";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login, reset } from "../../slices/authSlice";
import Message from "../../components/Message/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver oque há de novo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta ? <Link to="/register">Clique aqui!</Link>
      </p>
    </div>
  );
};

export default Login;
