#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_scene;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_grain;
uniform float u_vignette;

float rand(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 col = texture2D(u_scene, uv).rgb;

  float scan = 0.96 + 0.04*sin(uv.y*u_resolution.y*1.15 + u_time*20.0);
  float grain = (rand(uv + fract(u_time)) - 0.5) * 0.12 * u_grain;
  col *= scan;
  col += grain;

  vec2 p = uv - 0.5;
  float vig = smoothstep(0.9 + 0.5*(1.0-u_vignette), 0.15, length(p));
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
