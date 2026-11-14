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
  document.querySelector("#device").hidden = !device;
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
  form.elements.email.parentElement.firstChild.nodeValue = t[5] + " ";
  send.textContent = t[6];
  form.elements.code.parentElement.firstChild.nodeValue = t[7] + " ";
  replacement.firstChild.nodeValue = t[8] + " ";
  form.querySelector("[type=submit]").textContent = t[9];
  status.textContent = message == null || mail.open ? "" : t[message];
  mailStatus.textContent = message == null || !mail.open ? "" : t[message];
}
function report(index) { message = index; translate(); }
const mail = document.querySelector("#mail");
const mailStatus = document.querySelector("#mail-status");
document.querySelector("#coffee").onclick = () => { mail.showModal(); translate(); email.focus(); };
document.querySelector("#close-mail").onclick = () => mail.close();
mail.onclose = () => { if (message !== 13) message = null; translate(); };
const form = document.querySelector("#form");
const status = document.querySelector("#status");
const send = document.querySelector("#send");
const replacement = document.querySelector("#replacement");
const email = form.elements.email;
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
send.onclick = async () => {
  if (!email.reportValidity()) return;
  send.disabled = true;
  try {
    const result = await call("/email/start",{email:email.value});
    report(result.ok ? 11 : 12);
  } catch { report(12); }
  finally { send.disabled = false; }
};
form.onsubmit = async event => {
  event.preventDefault();
  const submit = form.querySelector("[type=submit]");
  submit.disabled = true;
  try {
    const data = await call("/email/activate", {pair,email:email.value,code:form.elements.code.value,
      replace:replacement.hidden ? undefined : form.elements.replace.value});
    if (data.ok) {
      mail.close();
      methods.hidden = discordStatus.hidden = true;
      report(13);
    } else if (data.error === "device_limit") {
      form.elements.replace.replaceChildren(...data.devices.map(device => new Option(device.name,device.id)));
      replacement.hidden = false;
      report(14);
    } else report(data.error === "invalid_code" ? 15 : 16);
  } catch { report(16); }
  finally { submit.disabled = false; }
};

})();
