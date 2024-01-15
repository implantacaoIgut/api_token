"use client"
import { useState } from "react";
import axios from "axios";

const Page = () => {
  const [sistema, setSistema] = useState('');
  const [clinica, setClinica] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [copied, setCopied] = useState(false);

  const gerarToken = async () => {
    let apiUrl = '';

    if (sistema === '1') {
      apiUrl = 'https://api.igut.med.br/v2/usuarios/login';
    } else {
      apiUrl = 'https://api.eba.med.br/v3/usuarios/login';
    }

    const base64Clinica = btoa(clinica);

    const requestBody = {
      username: user,
      password: password
    };

    const headers = {
      'Content-Type': 'application/json',
      'client_token': base64Clinica
    };

    try {
      const response = await axios.post(apiUrl, requestBody, { headers });
      const token = response.data?.data?.token;
      if (token) {
        console.log('Token gerado:', token);
        setData(token);
        setCopied(false);

        setTimeout(() => {
          setClinica('');
          setUser('');
          setPassword('');
          setCopied(false);
        }, 10000);
      } else {
        console.error('Token não encontrado na resposta:', response.data);
        setData('');
        setCopied(false);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setData('');
      setCopied(false);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col gap-3 w-80 border border-1 border-sky-500 p-5 rounded-md">
      <label htmlFor="">Sistema</label>
      <select
        className="border border-b-1 outline-none p-3"
        value={sistema}
        onChange={(e) => setSistema(e.target.value)}
      >
        <option value="1">iGUT Clínicas</option>
        <option value="2">eBA - Boletim Anestésico</option>
      </select>

      <label htmlFor="">Clínica</label>
      <input
        className="border border-b-1 outline-none p-3"
        type="text"
        value={clinica}
        onChange={(e) => setClinica(e.target.value)}
      />

      <label htmlFor="">Usuário</label>
      <input
        className="border border-b-1 outline-none p-3"
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <label htmlFor="">Senha</label>
      <input
        className="border border-b-1 outline-none p-3"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={gerarToken} className="bg-sky-500 text-white rounded-md p-3">Gerar Token</button>

      <div>
        {data && (
          <div className="flex gap-2 flex flex-col">
            <code className="text-pretty max-w-[300px] overflow-y-auto">
              {data}
            </code>
            <button onClick={copyToClipboard} className={`bg-green-500 text-white rounded-md p-2 ${copied ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;

