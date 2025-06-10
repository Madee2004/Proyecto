// Este archivo define funciones para métodos de interpolación y regresión lineal

// Método de Lagrange
function interpolarLagrange(x, y, xEval) {
  const n = x.length;
  let result = 0;
  for (let i = 0; i < n; i++) {
    let term = y[i];
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        term *= (xEval - x[j]) / (x[i] - x[j]);
      }
    }
    result += term;
  }
  return result;
}

// Método de Newton
function interpolarNewton(x, y, xEval) {
  const n = x.length;
  const coef = y.slice();
  for (let j = 1; j < n; j++) {
    for (let i = n - 1; i >= j; i--) {
      coef[i] = (coef[i] - coef[i - 1]) / (x[i] - x[i - j]);
    }
  }
  let result = coef[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    result = result * (xEval - x[i]) + coef[i];
  }
  return result;
}

// Regresión Lineal Simple
function regresionLineal(x, y, xEval) {
  const n = x.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
  }
  const a1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const a0 = (sumY - a1 * sumX) / n;
  return a0 + a1 * xEval;
}

// Interpolación cúbica usando Spline.js
function interpolarCubica(x, y, xEval) {
  const spline = new Spline(x, y);
  return spline.at(xEval);
}

// Función general para resolver
function resolverGenerico(event, tipo) {
  if (event) event.preventDefault();

  const x = document.getElementById('x').value.split(',').map(Number);
  const y = document.getElementById('y').value.split(',').map(Number);
  const xi = document.getElementById('xi').value.split(',').map(Number);

  const titulo = tipo === 'temperatura' ? 'Hora' : tipo === 'acciones' ? 'Día' : 'Tiempo';
  let html = '<h4>📋 Resultados:</h4>';
  html += `<table class="table table-bordered"><thead><tr><th>${titulo}</th><th>Lagrange</th><th>Newton</th><th>Spline</th><th>Regresión</th></tr></thead><tbody>`;

  xi.forEach(val => {
    const lag = interpolarLagrange(x, y, val).toFixed(2);
    const newt = interpolarNewton(x, y, val).toFixed(2);
    const cub = interpolarCubica(x, y, val).toFixed(2);
    const reg = regresionLineal(x, y, val).toFixed(2);
    html += `<tr><td>${val}</td><td>${lag}</td><td>${newt}</td><td>${cub}</td><td>${reg}</td></tr>`;
  });

  html += '</tbody></table>';
  document.getElementById('resultados').innerHTML = html;

  if (xi.length === 1) {
    const val = xi[0];
    const resultados = {
      Lagrange: interpolarLagrange(x, y, val),
      Newton: interpolarNewton(x, y, val),
      Spline: interpolarCubica(x, y, val),
      Regresion: regresionLineal(x, y, val)
    };
    graficarXYComparacion(x, y, val, resultados);
  }

}

// Funciones específicas
function resolverTemperatura(event) {
  resolverGenerico(event, 'temperatura');
}
function resolverAcciones(event) {
  resolverGenerico(event, 'acciones');
}
function resolverVelocidad(event) {
  resolverGenerico(event, 'velocidad');
}

window.resolverTemperatura = resolverTemperatura;
window.resolverAcciones = resolverAcciones;
window.resolverVelocidad = resolverVelocidad;

// Gráfico estilo Runge-Kutta/Huen con resultados como puntos
function graficarXYComparacion(x, y, xi, valores) {
  const datosOriginales = x.map((xi, i) => ({ t: xi, y: y[i] }));

  const estimaciones = [
    { metodo: "Lagrange", color: "red", y: valores.Lagrange },
    { metodo: "Newton", color: "green", y: valores.Newton },
    { metodo: "Spline", color: "orange", y: valores.Spline },
    { metodo: "Regresion", color: "purple", y: valores.Regresion }
  ];

  const interpolados = estimaciones.map(e => ({ t: xi, y: e.y }));

  const ctx = document.getElementById("grafico-problema").getContext("2d");

  if (window.chartInterpolacion) window.chartInterpolacion.destroy();

  window.chartInterpolacion = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [
        {
          label: "Datos originales",
          data: datosOriginales,
          parsing: { xAxisKey: "t", yAxisKey: "y" },
          borderColor: "#007bff",
          backgroundColor: "#007bff",
          tension: 0.3,
          fill: false,
          pointRadius: 4
        },
        ...estimaciones.map((e, i) => ({
          label: e.metodo + " (" + xi + ")",
          data: [interpolados[i]],
          parsing: { xAxisKey: "t", yAxisKey: "y" },
          borderColor: e.color,
          backgroundColor: e.color,
          pointRadius: 6,
          showLine: false
        }))
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "X" }, type: "linear" },
        y: { title: { display: true, text: "Y" } }
      }
    }
  });
}



window.graficarXYyPunto = graficarXYyPunto;
