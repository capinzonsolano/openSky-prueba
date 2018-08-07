// Variables frm Inicio de sesión
var contratistaInputName = document.getElementById('contratistaInputName');
var contratistaInputEmail = document.getElementById('contratistaInputEmail');
var cBoxEmailReal = document.getElementById('cBoxEmailReal');
var contratistaNombre;
var contratistaEmail;

var btnIniciarSesion = document.getElementById('btnIniciarSesion');

// Variables frm Cobro
var frmCobro = document.getElementById('frmCobro');
var inpConsecutivo = document.getElementById('inpConsecutivo');
var inpFecha = document.getElementById('inpFecha');
var inpHora = document.getElementById('inpHora');
var inpNombre = document.getElementById('inpNombre');
var inpEmail = document.getElementById('inpEmail');
var textAConcepto = document.getElementById('textAConcepto');
var inpValor = document.getElementById('inpValor');
var inpFileDocs = document.getElementById('inpFileDocs');

var consecutivo = 0;
var hoy;
var valor;
var concepto;
var fechaPago;

var btnIniciarCobro = document.getElementById('btnIniciarCobro');

// Variables Gerente Financiero
var frmGerente = document.getElementById('frmGerente');
var spanMensajeGerente = document.getElementById('spanMensajeGerente');

var textAModificaciones = document.getElementById('textAModificaciones');

var btnGerenteAceptar = document.getElementById('btnGerenteAceptar');
var btnGerenteRechazar = document.getElementById('btnGerenteRechazar');

// Variables frm Asistente Financiero
var frmAsistente = document.getElementById('frmAsistente');
var spanMensajeAsistente = document.getElementById('spanMensajeAsistente');

var inpFechaPago = document.getElementById('inpFechaPago');

var btnProgramarPago = document.getElementById('btnProgramarPago');

// Listeners botones
btnIniciarSesion.addEventListener('click', iniciarSesion);
btnIniciarCobro.addEventListener('click', iniciarCobro);
btnGerenteAceptar.addEventListener('click', aceptarPago);
btnGerenteRechazar.addEventListener('click', rechazarPago);
btnProgramarPago.addEventListener('click', programarPago);

// Funciones/acciones para cada click en boton
function iniciarSesion(e) {
  if (contratistaInputName.value !== '' && contratistaInputEmail.value.indexOf('@') !== -1) {
    e.preventDefault();
    consecutivo++;
    inpConsecutivo.value = numeroMensaje(consecutivo);

    hoy = new Date();
    inpFecha.value = fechaAFechaSimple(hoy);
    inpHora.value = fechaAHoraSimple(hoy);

    contratistaNombre = contratistaInputName.value;
    inpNombre.value = contratistaNombre;

    contratistaEmail = contratistaInputEmail.value;
    inpEmail.value = contratistaEmail;
    disableIniciarSesion();
    frmCobro.classList.remove('d-none');
  }

}

function iniciarCobro(e) {
  if (textAConcepto.value !== '' && inpValor.value !== '') {
    e.preventDefault();
    valor = inpValor.value;
    concepto = textAConcepto.value;
    if (valor > 1000000) {
      spanMensajeGerente.innerHTML =
        `${contratistaNombre} ha radicado la solicitud número ${numeroMensaje(consecutivo)}
         por un valor de $${valor}, mayor a un millón por concepto de
        ${concepto.toLowerCase()}. Debe ser estudiado por el gerente financiero.`;
      frmGerente.classList.remove('d-none');
    } else {
      spanMensajeAsistente.innerHTML =
        `${contratistaNombre} ha radicado la solicitud número ${numeroMensaje(consecutivo)}
         por un valor de $${valor}, menor o igual a un millón por concepto de
         ${concepto.toLowerCase()}. Listo para programar fecha de pago`;
      frmAsistente.classList.remove('d-none');
    }

    inpFechaPago.setAttribute('min', fechaAFechaSimple(hoy));
    disableIniciarCobro();
    $('#emailModal').modal();
    $('#emailModalLabel').html('Solicitud radicada');
    $('#emailModalContent').html(`${contratistaNombre}, su solicitud ha sido radicada con el número
      ${numeroMensaje(consecutivo)} satisfactoriamente y será tratada proximamente.`);
  }
}

function aceptarPago() {
  spanMensajeAsistente.innerHTML =
    `${contratistaNombre} ha radicado la solicitud número ${numeroMensaje(consecutivo)}
     por un valor de $${valor}, mayor a un millón por concepto de ${concepto.toLowerCase()}.
     El gerente financiero ya estudió el cobro y está listo para programar fecha de pago`;
  frmAsistente.classList.remove('d-none');
  disableGerenteFinanciero();
}

function rechazarPago(e) {
  if (textAModificaciones.value !== '') {
    e.preventDefault();
    disableGerenteFinanciero();
    $('#emailModal').modal();
    $('#emailModalLabel').html('Solicitud rechazada');
    $('#emailModalContent').html(`${contratistaNombre}, su solicitud con radicado número
      ${numeroMensaje(consecutivo)} ha sido rechazada por el gerente financiero,
      es necesario realizar las siguientes modificaciones: ${textAModificaciones.value}`);
    nuevaSolicitud();
  }
}

function programarPago(e) {
  if (inpFechaPago.value !== '') {
    e.preventDefault();
    fechaPago = inpFechaPago.value;
    $('#emailModal').modal();
    $('#emailModalLabel').html('Solicitud aceptada');
    $('#emailModalContent').html(`${contratistaNombre}, su solicitud con radicado número
      ${numeroMensaje(consecutivo)} ha sido aceptada y se ha programado el pago para la fecha :
      ${fechaPago} (año-mes-día).`);
    nuevaSolicitud();
  }
}

// Funciones / acciones adicionales
function disableIniciarSesion() {
  contratistaInputName.disabled = true;
  contratistaInputEmail.disabled = true;
  btnIniciarSesion.disabled = true;
}

function disableIniciarCobro() {
  textAConcepto.disabled = true;
  inpValor.disabled = true;
  inpFileDocs.disabled = true;
  btnIniciarCobro.disabled = true;
}

function disableGerenteFinanciero() {
  btnGerenteAceptar.disabled = true;
  textAModificaciones.disabled = true;
  btnGerenteRechazar.disabled = true;
}

function nuevaSolicitud() {
  frmCobro.classList.add('d-none');
  frmGerente.classList.add('d-none');
  frmAsistente.classList.add('d-none');

  contratistaInputEmail.value = '';
  contratistaInputEmail.disabled = false;

  contratistaInputName.value = '';
  contratistaInputName.disabled = false;

  btnIniciarSesion.disabled = false;

  textAConcepto.value = '';
  textAConcepto.disabled = false;

  inpValor.value = '';
  inpValor.disabled = false;

  inpFileDocs.value = '';
  inpFileDocs.disabled = false;

  btnIniciarCobro.disabled = false;

  textAModificaciones.value = '';
  textAModificaciones.disabled = false;

  btnGerenteAceptar.disabled = false;
  btnGerenteRechazar.disabled = false;

  inpFechaPago.value = '';

}

function numeroMensaje(num) {
  let texto;
  if (num < 10) {
    texto = `0${num}`;
  } else {
    texto = num;
  }

  return texto;
}

function fechaAFechaSimple(fecha) {
  let year = fecha.getFullYear();
  let month = fecha.getMonth();
  let day = fecha.getDate();
  if (month < 10) {
    month = `0${month + 1}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  let fechaSimple = `${year}-${month}-${day}`;
  return fechaSimple;
}

function fechaAHoraSimple(fecha) {
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();

  if (horas < 10) {
    horas = `0${horas}`;
  }

  if (minutos < 10) {
    minutos = `0${minutos}`;
  }

  let horaSimple = `${horas}:${minutos}`;
  return horaSimple;
}
