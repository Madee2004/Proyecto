class Spline {
  constructor(x, y) {
    const n = x.length;
    const a = y.slice();
    const h = Array(n - 1);
    const alpha = Array(n - 1);
    const l = Array(n), mu = Array(n), z = Array(n);
    const c = Array(n), b = Array(n - 1), d = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
      h[i] = x[i + 1] - x[i];
      alpha[i] = (a[i + 1] - a[i]) / h[i];
    }

    l[0] = 1;
    mu[0] = z[0] = 0;

    for (let i = 1; i < n - 1; i++) {
      l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * mu[i - 1];
      mu[i] = h[i] / l[i];
      z[i] = (alpha[i] - alpha[i - 1] - h[i - 1] * z[i - 1]) / l[i];
    }

    l[n - 1] = 1;
    z[n - 1] = c[n - 1] = 0;

    for (let j = n - 2; j >= 0; j--) {
      c[j] = z[j] - mu[j] * c[j + 1];
      b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
      d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
    }

    this.x = x;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  at(xi) {
    const x = this.x;
    let i = x.length - 2;
    while (i >= 0 && xi < x[i]) i--;
    i = Math.max(0, i);
    const dx = xi - x[i];
    return this.a[i] + this.b[i] * dx + this.c[i] * dx ** 2 + this.d[i] * dx ** 3;
  }
}
