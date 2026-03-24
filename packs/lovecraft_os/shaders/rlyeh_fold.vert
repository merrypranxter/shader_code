#ifdef GL_ES
precision highp float;
#endif

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_time;
uniform float u_intensity;
uniform float u_distort;

varying vec2 v_uv;
varying float v_depthFold;

void main() {
  v_uv = uv;

  vec3 p = position;
  float t = u_time;

  // non-euclidean-esque fold terms
  float foldA = sin(p.x * 3.5 + t * 1.1) * cos(p.y * 2.2 - t * 0.9);
  float foldB = sin(length(p.xy) * 5.0 - t * 1.6);
  float curl = sin(atan(p.y, p.x) * 6.0 + t);

  float fold = (0.45 * foldA + 0.35 * foldB + 0.20 * curl) * u_distort;
  p.z += fold * (0.15 + 0.25 * u_intensity);

  // subtle lateral warping for impossible perspective vibe
  p.xy += normalize(p.xy + 1e-4) * fold * 0.05;

  v_depthFold = fold;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
