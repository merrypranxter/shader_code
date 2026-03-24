#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_glow;
uniform float u_glitch;
uniform float u_distort;

float rand(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (uv - 0.5) * vec2(u_resolution.x/u_resolution.y, 1.0);
  float t = u_time;

  vec2 g = p * (8.0 + 8.0*u_distort);
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;

  float line = min(abs(f.x), abs(f.y));
  float lattice = smoothstep(0.07, 0.0, line);

  float n = rand(id);
  float blink = smoothstep(0.72, 1.0, sin(t*3.5 + n*20.0));
  float dot = smoothstep(0.23, 0.0, length(f + 0.15*vec2(sin(n*10.0+t), cos(n*12.0-t))));

  float glitch = step(0.95, rand(vec2(id.y, floor(t*14.0)))) * u_glitch;
  vec2 warp = vec2(glitch*0.02, 0.0);
  p += warp;

  vec3 bg = vec3(0.05,0.02,0.10);
  vec3 hot = vec3(1.0,0.1,0.6);
  vec3 cool = vec3(0.2,0.9,1.0);
  vec3 zing = vec3(0.95,1.0,0.2);

  vec3 col = bg;
  col += lattice * mix(hot, cool, 0.5+0.5*sin(t + n*6.0));
  col += dot * blink * zing;
  col += u_glow * 0.25 * lattice * cool;

  float vig = smoothstep(1.4, 0.25, length(p));
  col *= vig * (0.75 + 0.65*u_intensity);

  gl_FragColor = vec4(col,1.0);
}
