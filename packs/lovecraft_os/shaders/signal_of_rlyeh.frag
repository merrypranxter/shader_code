#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_glitch;
uniform float u_glow;
uniform float u_distort;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.0 + vec2(4.3, -2.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  float band = step(0.92, fract((uv.y + t * 0.4) * 12.0));
  float lineShift = (noise(vec2(floor((uv.y + t) * 90.0), t * 10.0)) - 0.5) * 0.12 * u_glitch;
  p.x += band * lineShift;

  float radial = length(p);
  float angle = atan(p.y, p.x);

  float worm = sin(angle * 17.0 + t * 2.0 + sin(radial * 31.0 - t * 6.0));
  float sig = smoothstep(0.75, 0.95, worm);

  float cloud = fbm(p * (2.0 + u_distort) + vec2(t * 0.2, -t * 0.1));
  float scan = 0.93 + 0.07 * sin(gl_FragCoord.y * 2.7 + t * 14.0);

  vec3 base = vec3(0.01, 0.02, 0.04);
  vec3 toxic = vec3(0.35, 1.00, 0.76);
  vec3 magenta = vec3(0.92, 0.23, 1.00);
  vec3 staticColor = vec3(0.82, 0.90, 1.00);

  vec3 col = base;
  col += cloud * mix(vec3(0.06, 0.10, 0.25), magenta, 0.35 + 0.65 * sig);
  col += u_glow * 0.45 * sig * mix(toxic, magenta, 0.5 + 0.5 * sin(t + radial * 14.0));

  float noiseSpark = step(0.988, noise(vec2(gl_FragCoord.x * 0.07 + t * 22.0, gl_FragCoord.y * 0.13)));
  col += noiseSpark * staticColor * (0.25 + 0.75 * u_glitch);

  float vignette = smoothstep(1.25, 0.18, radial);
  col *= vignette * scan * (0.7 + 0.8 * u_intensity);

  gl_FragColor = vec4(col, 1.0);
}
