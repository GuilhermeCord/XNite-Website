(() => {
if (!document.querySelector(".xn-activation")) return;

const params = new URLSearchParams(location.search);
const pair = params.get("pair");
const copy = {
  "pt-BR":["Ativar X-Nite","Dispositivo","Código de pareamento","Confira se o código coincide com o exibido no Playnite.","Discord ainda indisponível.","E-mail usado no Buy Me a Coffee","Enviar código","Código recebido por e-mail","Substituir dispositivo","Ativar este PC","Abra um novo QR Code no X-Nite.","Se o e-mail estiver cadastrado, você receberá um código.","Não foi possível enviar o código.","Ativação concluída. Volte ao X-Nite.","Escolha qual dispositivo substituir.","Código inválido ou expirado.","Não foi possível concluir a ativação."],
  "en-US":["Activate X-Nite","Device","Pairing code","Check that this code matches the one on Playnite.","Discord is not available yet.","Buy Me a Coffee email","Send code","Code received by email","Replace device","Activate this PC","Open a new QR code in X-Nite.","If the email is registered, you will receive a code.","Could not send the code.","Activation complete. Return to X-Nite.","Choose a device to replace.","Invalid or expired code.","Could not complete activation."],
  "es-ES":["Activar X-Nite","Dispositivo","Código de vinculación","Comprueba que el código coincide con el de Playnite.","Discord aún no está disponible.","Correo de Buy Me a Coffee","Enviar código","Código recibido por correo","Sustituir dispositivo","Activar este PC","Abre un código QR nuevo en X-Nite.","Si el correo está registrado, recibirás un código.","No se pudo enviar el código.","Activación completada. Vuelve a X-Nite.","Elige un dispositivo para sustituir.","Código inválido o caducado.","No se pudo completar la activación."],
  "fr-FR":["Activer X-Nite","Appareil","Code d’association","Vérifiez que le code correspond à celui de Playnite.","Discord est indisponible pour le moment.","Adresse Buy Me a Coffee","Envoyer le code","Code reçu par e-mail","Remplacer un appareil","Activer ce PC","Ouvrez un nouveau QR code dans X-Nite.","Si l’adresse est enregistrée, vous recevrez un code.","Impossible d’envoyer le code.","Activation terminée. Retournez dans X-Nite.","Choisissez un appareil à remplacer.","Code invalide ou expiré.","Impossible de terminer l’activation."],
  "it-IT":["Attiva X-Nite","Dispositivo","Codice di associazione","Verifica che il codice corrisponda a quello in Playnite.","Discord non è ancora disponibile.","Email di Buy Me a Coffee","Invia codice","Codice ricevuto via email","Sostituisci dispositivo","Attiva questo PC","Apri un nuovo codice QR in X-Nite.","Se l’email è registrata, riceverai un codice.","Impossibile inviare il codice.","Attivazione completata. Torna a X-Nite.","Scegli un dispositivo da sostituire.","Codice non valido o scaduto.","Impossibile completare l’attivazione."]
};
const locale = document.documentElement.lang.split("-")[0].toLowerCase();
const language = ({ pt: "pt-BR", es: "es-ES", fr: "fr-FR", it: "it-IT" })[locale] ?? "en-US";
const stepCopy = {
  "pt-BR": ["Seu e-mail", "Código de ativação", "Informe seu e-mail", "Enviaremos um código de ativação para o e-mail cadastrado no Buy Me a Coffee.", "Digite o código de ativação", "Insira o código que enviamos para", "Código de 6 dígitos", "Alterar e-mail", "Não recebeu o código?", "Reenviar código"],
  "en-US": ["Your email", "Activation code", "Enter your email", "We will send an activation code to the email registered with Buy Me a Coffee.", "Enter your activation code", "Enter the code we sent to", "6-digit code", "Change email", "Didn’t receive the code?", "Resend code"],
  "es-ES": ["Tu correo", "Código de activación", "Introduce tu correo", "Enviaremos un código de activación al correo registrado en Buy Me a Coffee.", "Introduce el código de activación", "Introduce el código que enviamos a", "Código de 6 dígitos", "Cambiar correo", "¿No recibiste el código?", "Reenviar código"],
  "fr-FR": ["Votre e-mail", "Code d’activation", "Saisissez votre e-mail", "Nous enverrons un code d’activation à l’adresse enregistrée sur Buy Me a Coffee.", "Saisissez le code d’activation", "Saisissez le code envoyé à", "Code à 6 chiffres", "Modifier l’e-mail", "Code non reçu ?", "Renvoyer le code"],
  "it-IT": ["La tua email", "Codice di attivazione", "Inserisci la tua email", "Invieremo un codice di attivazione all’email registrata su Buy Me a Coffee.", "Inserisci il codice di attivazione", "Inserisci il codice che abbiamo inviato a", "Codice di 6 cifre", "Modifica email", "Non hai ricevuto il codice?", "Invia di nuovo"]
};
let mailStep = 1, mailBusy = false, sentEmail = "", cooldownTimer;
const cooldowns = new Map();
const remaining = () => Math.max(0, Math.ceil(((cooldowns.get(email.value.trim().toLowerCase()) || 0) - Date.now()) / 1000));
function renderMail() {
  const t = words(), s = stepCopy[language];
  for (const [id, text] of [["email-step-label",s[0]],["code-step-label",s[1]],["email-heading",s[2]],["email-description",s[3]],["code-heading",s[4]],["code-description",s[5]],["change-email",s[7]],["resend-help",s[8]],["send-label",t[6]],["activate-label",t[9]],["replacement-label",t[8]]]) document.getElementById(id).textContent = text;
  document.querySelector(".mail-steps").ariaLabel = t[0];
  email.ariaLabel = t[5];
  email.placeholder = t[5];
  form.elements.code.ariaLabel = s[6];
  form.elements.code.placeholder = s[6];
  document.getElementById("sent-email").textContent = sentEmail;
  document.getElementById("email-step").hidden = mailStep !== 1;
  document.getElementById("code-step").hidden = mailStep !== 2;
  email.readOnly = mailStep === 2 || mailBusy;
  form.elements.code.disabled = mailStep !== 2 || mailBusy;
  const first = document.getElementById("email-progress"), second = document.getElementById("code-progress");
  for (const [index, progress] of [first, second].entries()) {
    const complete = index === 0 ? mailStep === 2 : message === 13;
    progress.classList.toggle("complete", complete);
    const marker = progress.querySelector(".step-number");
    if (complete) {
      const check = form.querySelector(".activation-check").cloneNode(true);
      check.setAttribute("class", "step-check");
      check.querySelector("path").setAttribute("fill", "currentColor");
      marker.replaceChildren(check);
    } else marker.textContent = String(index + 1);
  }
  first.toggleAttribute("aria-current", mailStep === 1);
  second.toggleAttribute("aria-current", mailStep === 2);
  (mailStep === 1 ? first : second).setAttribute("aria-current", "step");
  const seconds = remaining();
  send.disabled = mailBusy || seconds > 0;
  if (mailStep === 1 && seconds) document.getElementById("send-label").textContent = t[6] + " (" + seconds + "s)";
  document.getElementById("resend").textContent = s[9] + (seconds ? " (" + seconds + "s)" : "");
  for (const id of ["resend", "change-email", "close-mail"]) document.getElementById(id).disabled = mailBusy || (id === "resend" && seconds > 0);
  form.querySelector("[type=submit]").disabled = mailBusy;
  form.elements.replace.disabled = mailBusy;
}
function startCountdown() {
  clearInterval(cooldownTimer);
  cooldownTimer = setInterval(() => { if (mail.open) renderMail(); else clearInterval(cooldownTimer); }, 1000);
}
function changeEmail() {
  mailStep = 1; message = null; sentEmail = "";
  form.elements.code.value = "";
  form.elements.code.setCustomValidity("");
  replacement.hidden = true;
  translate(); email.focus();
}
async function requestCode() {
  if (mailBusy || remaining() || !email.reportValidity()) return;
  const address = email.value.trim();
  mailBusy = true; message = null; translate();
  try {
    const result = await call("/email/start", {email:address});
    if (result.ok) {
      sentEmail = email.value = address;
      cooldowns.set(address.toLowerCase(), Date.now() + 60000);
      mailStep = 2;
      report(11);
      startCountdown();
    } else report(12);
  } catch { report(12); }
  finally {
    mailBusy = false; renderMail();
    if (mailStep === 2) form.elements.code.focus();
  }
}

const words = () => copy[language];
let device, message;
const methods = document.querySelector("#methods");
const discordStatus = document.querySelector("#discord-status");
function translate() {
  const t = words();
  const continueWith = ({
    "pt-BR":"Continuar com", "es-ES":"Continuar con", "fr-FR":"Continuer avec", "it-IT":"Continua con"
  })[language] ?? "Continue with";
  document.querySelector("#discord-label").textContent = continueWith + " Discord";
  document.querySelector("#coffee-label").textContent = continueWith + " Buy Me a Coffee";
  document.querySelector("#activation-title").textContent = t[0];
  const completed = message === 13;
  document.querySelector("#activation-title").hidden = completed;
  document.querySelector("#device").hidden = !device || completed;
  const success = document.querySelector("#activation-success");
  success.hidden = !completed;
  const [successTitle, successHelp] = ({
    "pt-BR": ["Ativação concluída", "Volte ao X-Nite."],
    "en-US": ["Activation complete", "Return to X-Nite."],
    "es-ES": ["Activación completada", "Vuelve a X-Nite."],
    "fr-FR": ["Activation terminée", "Retournez dans X-Nite."],
    "it-IT": ["Attivazione completata", "Torna a X-Nite."]
  })[language];
  document.querySelector("#success-title").textContent = successTitle;
  document.querySelector("#success-help").textContent = successHelp;
  if (completed) methods.hidden = discordStatus.hidden = true;
  if (device) {
    const [prefix, label] = ({
      "en-US": ["You are activating X-Nite on the PC ", "CODE"],
      "pt-BR": ["Você está ativando o X-Nite no PC ", "CÓDIGO"],
      "es-ES": ["Estás activando X-Nite en el PC ", "CÓDIGO"],
      "fr-FR": ["Vous activez X-Nite sur le PC ", "CODE"],
      "it-IT": ["Stai attivando X-Nite sul PC ", "CODICE"]
    })[language];
    const name = document.createElement("strong");
    name.textContent = device.name;
    document.querySelector("#device-name").replaceChildren(prefix, name, ".");
    document.querySelector("#code-label").textContent = label;
    document.querySelector("#pair-code").textContent = device.code;
    document.querySelector("#pair-help").textContent = t[3];
  }
  document.querySelector("#close-mail").ariaLabel = ({ "pt-BR":"Fechar", "es-ES":"Cerrar", "fr-FR":"Fermer", "it-IT":"Chiudi" })[language] ?? "Close";
  discordStatus.textContent = t[4];
  renderMail();
  status.textContent = message == null || mail.open || completed ? "" : t[message];
  mailStatus.textContent = message == null || !mail.open ? "" : t[message];
}
function report(index) { message = index; translate(); }
const mail = document.querySelector("#mail");
const mailStatus = document.querySelector("#mail-status");
document.querySelector("#coffee").onclick = () => { mail.showModal(); translate(); startCountdown(); (mailStep === 2 ? form.elements.code : email).focus(); };
document.querySelector("#close-mail").onclick = () => mail.close();
mail.oncancel = event => { if (mailBusy) event.preventDefault(); };
mail.onclose = () => { clearInterval(cooldownTimer); if (message !== 13) message = null; translate(); };
const form = document.querySelector("#form");
const status = document.querySelector("#status");
const send = document.querySelector("#send");
const replacement = document.querySelector("#replacement");
const email = form.elements.email;
const validationMessages = {
  "en-US": ["Enter your email address.", "Enter a valid email address.", "Enter the code you received by email.", "Enter the six-digit code."],
  "pt-BR": ["Digite seu e-mail.", "Digite um e-mail válido.", "Digite o código recebido por e-mail.", "Digite o código de seis dígitos."],
  "es-ES": ["Introduce tu correo electrónico.", "Introduce un correo electrónico válido.", "Introduce el código recibido por correo.", "Introduce el código de seis dígitos."],
  "fr-FR": ["Saisissez votre adresse e-mail.", "Saisissez une adresse e-mail valide.", "Saisissez le code reçu par e-mail.", "Saisissez le code à six chiffres."],
  "it-IT": ["Inserisci il tuo indirizzo email.", "Inserisci un indirizzo email valido.", "Inserisci il codice ricevuto via email.", "Inserisci il codice di sei cifre."]
};
const [emailRequired, emailInvalid, codeRequired, codeInvalid] = validationMessages[language];
for (const [input, required, invalid] of [
  [email, emailRequired, emailInvalid],
  [form.elements.code, codeRequired, codeInvalid]
]) {
  input.addEventListener("input", () => input.setCustomValidity(""));
  input.addEventListener("invalid", () => {
    input.setCustomValidity("");
    if (!input.validity.valid) {
      input.setCustomValidity(input.validity.valueMissing ? required : invalid);
    }
  });
}
async function call(path, data) {
  const response = await fetch("https://xnite-activation.xnitexbox.workers.dev" + path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
  return response.json();
}
async function initialize() {
  const data = await call("/pair/info",{id:pair});
  if (!data.name) throw Error();
  device = data;
  methods.hidden = false;
  discordStatus.hidden = data.discord === true;
  const discordButton = document.querySelector(".discord");
  discordButton.disabled = data.discord !== true;
  if (data.discord === true) discordButton.onclick = () => {
    const url = new URL("https://xnite-activation.xnitexbox.workers.dev/discord/start");
    url.searchParams.set("pair", pair);
    location.assign(url.href);
  };
  translate();
}
translate();
if (pair) initialize().catch(() => report(10));
else report(10);
for (const link of document.querySelectorAll(".md-select a[href]")) {
  if (!pair) break;
  const url = new URL(link.href);
  if (/\/activation-code\/$/.test(url.pathname)) { url.searchParams.set("pair", pair); link.href = url.href; }
}
send.onclick = requestCode;
document.getElementById("resend").onclick = requestCode;
document.getElementById("change-email").onclick = changeEmail;
email.addEventListener("input", () => renderMail());
form.elements.code.addEventListener("input", () => {
  form.elements.code.value = form.elements.code.value.replace(/[^0-9]/g, "");
});
form.onsubmit = async event => {
  event.preventDefault();
  if (mailBusy) return;
  if (mailStep === 1) { await requestCode(); return; }
  if (!form.reportValidity()) return;
  mailBusy = true; renderMail();
  try {
    const data = await call("/email/activate", {pair,email:sentEmail,code:form.elements.code.value,
      replace:replacement.hidden ? undefined : form.elements.replace.value});
    if (data.ok) {
      mail.close();
      methods.hidden = discordStatus.hidden = true;
      report(13);
      document.querySelector("#activation-success").focus();
    } else if (data.error === "device_limit") {
      form.elements.replace.replaceChildren(...data.devices.map(device => new Option(device.name,device.id)));
      replacement.hidden = false;
      report(14);
    } else report(data.error === "invalid_code" ? 15 : 16);
  } catch { report(16); }
  finally { mailBusy = false; renderMail(); }
};

})();
