#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_scene;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_grain;
uniform float u_vignette;

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 src = texture2D(u_scene, uv).rgb;

  float n = hash(gl_FragCoord.xy + u_time * 17.0) - 0.5;
  float grain = n * (0.06 * u_grain);

  vec2 c = uv - 0.5;
  float vig = smoothstep(0.85 + 0.3 * (1.0 - u_vignette), 0.2, dot(c, c) * 2.0);

  vec3 col = src + grain;
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
