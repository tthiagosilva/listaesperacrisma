const form = document.getElementById("listaEspera");
const statusMsg = document.getElementById("status");
const btn = document.getElementById("btnSubmit");

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxWQMvT01DFB8Cc6AmMWhYr0OvFYlw3Ruj6Nz-UeGLziYHt563MlOvA-PL3L24gMsEy9g/exec";

function setStatus(msg, type) {
  statusMsg.textContent = msg;
  statusMsg.className = "status " + type;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.innerText = "Enviando...";

  try {
    const formData = new FormData(form);
    await fetch(APPS_SCRIPT_URL, { method: "POST", body: formData });

    setStatus("✅ Cadastro realizado com sucesso!", "success");
    form.reset();
  } catch {
    setStatus("❌ Erro ao enviar. Tente novamente.", "error");
  } finally {
    btn.disabled = false;
    btn.innerText = "Entrar na lista de espera";
  }
});

const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, "");

  // limita a 11 dígitos (DDD + 9 números)
  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length > 6) {
    e.target.value = `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7)}`;
  } else if (valor.length > 2) {
    e.target.value = `(${valor.slice(0, 2)})${valor.slice(2)}`;
  } else if (valor.length > 0) {
    e.target.value = `(${valor}`;
  }
});
