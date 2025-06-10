# 📈 Proyecto de Interpolación Numérica

Este proyecto web interactivo tiene como objetivo explorar y comparar diversos métodos de interpolación aplicados a problemas reales del mundo físico y financiero. Está desarrollado con HTML, JavaScript y Bootstrap, e incluye visualizaciones dinámicas mediante Chart.js.

## 📚 Descripción general

La interpolación es una técnica matemática usada para estimar valores intermedios entre puntos conocidos. Este proyecto permite al usuario:

- Ingresar sus propios datos (pares x, y) y valores a interpolar.
- Aplicar métodos de interpolación: Lagrange, Newton, Regresión Lineal y Spline Cúbica.
- Ver los resultados en una tabla comparativa.
- Visualizar gráficamente los resultados interpolados.

## 🧠 Métodos utilizados

- **Lagrange**: Polinomio interpolante con productos de términos.
- **Newton**: Polinomio basado en diferencias divididas.
- **Regresión Lineal Simple**: Ajuste de una recta óptima por mínimos cuadrados.
- **Spline Cúbica**: Curvas suaves por tramos con continuidad en derivadas.

## 💡 Aplicaciones incluidas

Cada aplicación representa un caso práctico distinto, con su propio formulario y visualización:

### 1. `ap1.html` – Estimación de Temperatura 🌡️

- Datos: Horas del día y temperaturas registradas.
- Objetivo: Estimar la temperatura en horas no medidas.
- Ejemplo de uso:
x = 6,9,12,15,18
y = 15,18,25,28,22
xi = 10.5

### 2. `ap2.html` – Análisis de Acciones 💹

- Datos: Días y precios de una acción.
- Objetivo: Estimar el precio en un día intermedio.

### 3. `ap3.html` – Estimación de Velocidad 🚗

- Datos: Tiempo y velocidad registrada de un vehículo.
- Objetivo: Estimar la velocidad a un tiempo no registrado.

## 🖥️ Estructura del Proyecto

## 📂 Archivos del repositorio

```text
├── index.html → Página de inicio y navegación
├── inicio.html → Introducción teórica al tema
├── ap1.html → Aplicación 1: Temperatura
├── ap2.html → Aplicación 2: Acciones
├── ap3.html → Aplicación 3: Velocidad
├── main.js → Funciones de interpolación, resolución y gráficos
├── Spline.js → Clase externa para interpolación cúbica
```


## 📊 Visualizaciones

Cada aplicación incluye una gráfica donde se muestran:

- Los datos originales como una línea continua.
- Los resultados interpolados de cada método como puntos coloreados.

Esto permite comparar visualmente la precisión y forma de cada técnica.

## 🛠️ Tecnologías usadas

- HTML5 + CSS3 (Bootstrap 5.3)
- JavaScript Vanilla
- [Chart.js](https://www.chartjs.org/)
- Lógica numérica implementada a mano + clase Spline.js

## ✅ Cómo usar

1. Clona este repositorio o descarga el ZIP.
2. Abre `index.html` en tu navegador.
3. Selecciona una aplicación.
4. Ingresa los datos y presiona “Interpolar”.

## 🧾 Créditos

Proyecto realizado como práctica para la materia de **Métodos Numéricos**, simulando aplicaciones reales en meteorología, finanzas e ingeniería automotriz.

---
