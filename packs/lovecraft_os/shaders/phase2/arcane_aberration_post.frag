#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_scene;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_aberration;
uniform float u_scan;

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 c = uv - 0.5;
  float r = length(c);

  float drift = (0.001 + 0.006 * u_aberration) * (1.0 + 0.7 * r);
  vec2 dir = normalize(c + 1e-5);

  float jitter = sin(u_time * 33.0 + uv.y * 500.0) * 0.0007 * u_aberration;

  float rr = texture2D(u_scene, uv + dir * drift + vec2(jitter, 0.0)).r;
  float gg = texture2D(u_scene, uv).g;
  float bb = texture2D(u_scene, uv - dir * drift - vec2(jitter, 0.0)).b;

  vec3 col = vec3(rr, gg, bb);
  col *= 0.96 + 0.04 * sin(gl_FragCoord.y * (1.2 + 1.8 * u_scan) + u_time * 8.0);

  gl_FragColor = vec4(col, 1.0);
}
