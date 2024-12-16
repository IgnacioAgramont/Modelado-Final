import React, { useState } from 'react';

const SimuladorCaja = () => {
  const [resultados, setResultados] = useState({
    cant_cli: 0,
    Tesperapromedio: 0,
    NuevoCajero: false,
  });
  const [tablaDatos, setTablaDatos] = useState([]);

  const iniciarSimulacion = () => {
    const Tfinal = 780 * 60; // Hora final en segundos (13:00)
    let Tllegada = 540 * 60; // Hora inicial en segundos (9:00 AM)
    let Tfinalizacion = 540 * 60; // Hora en la que termina el servicio anterior
    let TesperaTotal = 0; // Tiempo total de espera
    let cc = 0; // Contador de clientes
    const detallesClientes = []; // Almacena detalles de cada cliente

    // Generar cantidad de clientes entre 900 y 950
    const cant_cli = Math.round(900 + (950 - 900) * Math.random());

    while (cc < cant_cli && Tllegada < Tfinal) {
      // Generar tiempo de servicio entre 2 y 12 minutos
      const rservicio = Math.random();
      const Tservicio = (0 + rservicio * 1.8) * 60; // Tiempo de servicio en segundos

      // Calcular tiempo de espera individual
      const espera = Tfinalizacion > Tllegada ? Tfinalizacion - Tllegada : 0;

      // Sumar al tiempo total de espera
      TesperaTotal += espera;

      // Actualizar la hora de finalización del servicio actual
      Tfinalizacion = Tllegada + espera + Tservicio;

      // Guardar detalles del cliente actual
      detallesClientes.push({
        cliente: cc + 1,
        horaLlegada: segundosAMinutos(Tllegada),
        tiempoServicio: (Tservicio / 60).toFixed(2), // En minutos
        tiempoEspera: (espera / 60).toFixed(2), // En minutos
        horaFinalizacion: segundosAMinutos(Tfinalizacion),
      });

      cc++;

      // Calcular la próxima hora de llegada
      const rllegada = Math.random();
      Tllegada += Math.round(-((Tfinal / cant_cli) * Math.log(1 - rllegada)));
    }

    // Calcular tiempo de espera promedio
    const Tesperapromedio = (TesperaTotal / 60) / cant_cli;

    // Determinar si se necesita un nuevo cajero
    const NuevoCajero = Tesperapromedio > 3;

    // Actualizar resultados
    setResultados({
      cant_cli,
      Tesperapromedio: Tesperapromedio.toFixed(2),
      NuevoCajero,
    });
    setTablaDatos(detallesClientes);
  };

  // Función para convertir segundos a minutos con decimales
  const segundosAMinutos = (segundos) => {
    return (segundos / 60).toFixed(2);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Simulador de Caja</h1>
      <button onClick={iniciarSimulacion}>Iniciar Simulación</button>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Cantidad de Clientes:</strong> {resultados.cant_cli}</p>
        <p><strong>Tiempo de Espera Promedio:</strong> {resultados.Tesperapromedio} minutos</p>
        <p>
          <strong>¿Se necesita un nuevo cajero?</strong>{' '}
          {resultados.NuevoCajero ? 'Sí' : 'No'}
        </p>
      </div>

      {tablaDatos.length > 0 && (
        <div style={{ marginTop: '20px', overflowX: 'auto' }}>
          <h2>Detalles de la Simulación</h2>
          <table border="1" style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th># Cliente</th>
                <th>Hora de Llegada (min)</th>
                <th>Tiempo de Servicio (min)</th>
                <th>Tiempo de Espera (min)</th>
                <th>Hora de Finalización (min)</th>
              </tr>
            </thead>
            <tbody>
              {tablaDatos.map((cliente) => (
                <tr key={cliente.cliente}>
                  <td>{cliente.cliente}</td>
                  <td>{cliente.horaLlegada}</td>
                  <td>{cliente.tiempoServicio}</td>
                  <td>{cliente.tiempoEspera}</td>
                  <td>{cliente.horaFinalizacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SimuladorCaja;