#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_scene;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_aberration;
uniform float u_scan;

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv - 0.5;
  vec2 dir = normalize(p + 1e-6) * (0.002 + 0.004*u_aberration);

  float s = sin(uv.y * u_resolution.y * 0.65 + u_time*18.0) * 0.0015 * u_scan;
  vec2 off = vec2(dir.x + s, dir.y);

  float r = texture2D(u_scene, uv + off).r;
  float g = texture2D(u_scene, uv).g;
  float b = texture2D(u_scene, uv - off).b;

  vec3 col = vec3(r,g,b);
  gl_FragColor = vec4(col,1.0);
}
