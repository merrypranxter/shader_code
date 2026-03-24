#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_glow;
uniform float u_distort;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float ring(vec2 p, float radius, float thickness) {
  float d = abs(length(p) - radius);
  return smoothstep(thickness, 0.0, d);
}

float glyph(vec2 p, float t) {
  float a = atan(p.y, p.x);
  float r = length(p);
  float spokes = smoothstep(0.95, 1.0, sin(a * 13.0 + t * 1.7));
  float wavering = smoothstep(0.94, 1.0, sin(r * 44.0 - t * 5.0 + sin(a * 9.0 + t)));
  return max(spokes, wavering);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  p *= rot(0.15 * sin(t * 0.7));
  p += u_distort * 0.08 * vec2(sin(p.y * 8.0 + t), cos(p.x * 7.0 - t));

  float portal = 0.0;
  portal += 0.95 * ring(p, 0.22 + 0.01 * sin(t * 2.0), 0.010);
  portal += 0.80 * ring(p, 0.34 + 0.02 * sin(t * 1.3 + 1.0), 0.014);
  portal += 0.70 * ring(p, 0.50 + 0.02 * sin(t * 1.1 + 2.0), 0.018);

  vec2 gp = p * rot(t * 0.18);
  float sigils = glyph(gp, t) * smoothstep(0.62, 0.15, length(p));

  float swirl = 0.5 + 0.5 * sin(16.0 * length(p) - t * 6.0 + atan(p.y, p.x) * 5.0);
  swirl *= smoothstep(0.95, 0.05, length(p));

  vec3 bg = vec3(0.01, 0.00, 0.02);
  vec3 deep = vec3(0.08, 0.03, 0.20);
  vec3 rune = vec3(0.72, 0.95, 0.20);
  vec3 arcane = vec3(0.35, 0.95, 1.00);

  vec3 col = mix(bg, deep, swirl * 0.7);
  col += portal * mix(rune, arcane, 0.5 + 0.5 * sin(t * 0.9));
  col += sigils * u_glow * mix(arcane, rune, 0.5 + 0.5 * sin(t * 1.3));

  float pulse = 0.9 + 0.1 * sin(t * 2.4 + length(p) * 20.0);
  float vignette = smoothstep(1.2, 0.2, length(p));
  col *= pulse * vignette * (0.65 + 0.8 * u_intensity);

  gl_FragColor = vec4(col, 1.0);
}
