#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_intensity;
uniform float u_moire;
uniform float u_glitch;

float grid(vec2 p, float scale){
  vec2 g = abs(fract(p * scale - 0.5) - 0.5) / fwidth(p * scale);
  return 1.0 - min(min(g.x, g.y), 1.0);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  float a = atan(uv.y, uv.x);
  float r = length(uv);

  vec2 p1 = uv;
  vec2 p2 = mat2(cos(0.9), -sin(0.9), sin(0.9), cos(0.9)) * uv;

  float g1 = grid(p1 + vec2(sin(t * 0.8 + r * 14.0) * 0.03), 28.0 + 14.0 * u_moire);
  float g2 = grid(p2 + vec2(cos(t * 0.7 - r * 11.0) * 0.03), 24.0 + 10.0 * u_moire);
  float interference = abs(g1 - g2);

  float radial = 0.5 + 0.5 * sin(r * 50.0 - t * 7.0 + a * 8.0);
  float glitch = step(0.985, fract((uv.y + t * 0.45) * 13.0)) * u_glitch;

  vec3 dark = vec3(0.01, 0.01, 0.03);
  vec3 line = vec3(0.70, 0.25, 0.95);
  vec3 accent = vec3(0.10, 0.95, 0.95);

  vec3 col = mix(dark, line, interference);
  col = mix(col, accent, radial * 0.35);
  col += glitch * vec3(0.2, 0.3, 0.35);

  float vig = smoothstep(1.2, 0.12, r);
  col *= vig * (0.6 + 0.9 * u_intensity);

  gl_FragColor = vec4(col, 1.0);
}
