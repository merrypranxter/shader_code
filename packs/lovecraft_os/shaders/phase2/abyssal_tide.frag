#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_glow;
uniform float u_distort;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i+vec2(1.,0.)), u.x), mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<6;i++){ v += a * noise(p); p = p * 2.0 + vec2(2.1, -1.7); a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time * 0.24;

  float m = length((u_mouse / max(u_resolution, vec2(1.0))) - 0.5);
  float tide = sin(uv.y * 6.0 + t * 3.0 + fbm(uv * 2.0 + t) * 4.0);
  vec2 flow = uv + vec2(tide * 0.12 * (0.4 + u_distort), sin(uv.x * 5.0 - t * 2.0) * 0.05);

  float fog = fbm(flow * (2.5 + u_distort));
  float trenches = smoothstep(0.2, 0.95, fbm(flow * 5.0 - vec2(0.0, t * 2.0)));
  float pulse = 0.8 + 0.2 * sin(t * 4.0 + length(uv) * 20.0);

  vec3 abyss = vec3(0.01, 0.02, 0.06);
  vec3 teal = vec3(0.03, 0.55, 0.62);
  vec3 eld = vec3(0.62, 0.90, 0.22);

  vec3 col = mix(abyss, teal, fog * 0.75);
  col += trenches * 0.35 * mix(teal, eld, 0.5 + 0.5 * sin(t + fog * 6.0));
  col += u_glow * 0.3 * pow(max(tide, 0.0), 2.0) * eld;

  float vig = smoothstep(1.2 + m * 0.4, 0.1, length(uv));
  col *= vig * pulse * (0.7 + 0.7 * u_intensity);

  gl_FragColor = vec4(col, 1.0);
}
