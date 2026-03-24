#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_glow;
uniform float u_distort;
uniform float u_moire;
uniform float u_glitch;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time * 0.35;

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  uv *= rot(0.35 * sin(t + r * 6.0));
  uv += 0.12 * u_distort * vec2(sin(4.0 * a + t), cos(3.0 * a - t));

  float rings = sin((r * 62.0 * (1.0 + 0.35 * u_moire)) - t * 6.0);
  float spokes = sin(a * 24.0 + t * 2.5);
  float moire = 0.5 + 0.5 * sin(rings * 3.0 + spokes * 2.0);

  float fog = 0.0;
  vec2 p = uv * 2.8;
  for (int i = 0; i < 4; i++) {
    fog += noise(p + t * 0.35);
    p = p * 1.8 + vec2(1.2, -0.7);
  }
  fog /= 4.0;

  float tear = step(0.96, fract((uv.y + t * 0.5) * 9.0));
  float shift = (noise(vec2(floor((uv.y + t) * 40.0), t * 3.0)) - 0.5) * 0.08 * u_glitch;
  vec2 guv = uv + vec2(tear * shift, 0.0);

  float sigil = sin(length(guv * vec2(1.0, 1.2)) * 34.0 - t * 8.0 + sin(a * 7.0));
  sigil = smoothstep(0.6, 0.95, sigil);

  vec3 abyss = vec3(0.02, 0.01, 0.06);
  vec3 violet = vec3(0.50, 0.10, 0.95);
  vec3 cyan = vec3(0.05, 0.95, 1.00);
  vec3 acid = vec3(0.90, 1.00, 0.15);

  vec3 col = abyss;
  col += 0.45 * fog * mix(violet, cyan, moire);
  col += u_glow * 0.35 * sigil * mix(cyan, acid, 0.5 + 0.5 * sin(t + r * 8.0));
  col += 0.15 * moire * vec3(0.3, 0.1, 0.45);

  float vig = smoothstep(1.2, 0.15, r);
  float pulse = 0.9 + 0.1 * sin(t * 3.0 + r * 18.0);
  col *= vig * pulse * (0.65 + 0.7 * u_intensity);

  col *= 0.96 + 0.04 * sin(gl_FragCoord.y * 1.7);

  gl_FragColor = vec4(col, 1.0);
}
