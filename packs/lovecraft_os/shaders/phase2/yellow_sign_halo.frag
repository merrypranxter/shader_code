#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_intensity;
uniform float u_glow;
uniform float u_glitch;

mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

float symbol(vec2 p, float t){
  float a = atan(p.y, p.x);
  float r = length(p);
  float branchA = smoothstep(0.96, 1.0, sin(a * 4.0 + t * 0.7));
  float branchB = smoothstep(0.96, 1.0, sin((a + 0.7) * 7.0 - t * 0.9));
  float ring = smoothstep(0.03, 0.0, abs(r - 0.25 - 0.02 * sin(t * 1.3)));
  return max(max(branchA, branchB), ring);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  vec2 p = uv * rot(0.2 * sin(t * 0.6));
  float r = length(p);

  float halo = exp(-6.0 * r) * (0.65 + 0.35 * sin(t * 2.0 + r * 40.0));
  float sigA = symbol(p, t);
  float sigB = symbol(p * rot(1.0472) * 1.2, t + 0.8) * 0.7;

  float tear = step(0.975, fract((uv.y + t * 0.3) * 11.0));
  float glitch = tear * (0.5 + 0.5 * sin(t * 50.0 + uv.y * 300.0)) * u_glitch;

  vec3 bg = vec3(0.02, 0.00, 0.01);
  vec3 amber = vec3(0.95, 0.78, 0.22);
  vec3 toxic = vec3(0.85, 1.00, 0.35);

  vec3 col = bg;
  col += halo * mix(vec3(0.25, 0.08, 0.0), amber, 0.8);
  col += (sigA + sigB) * u_glow * mix(amber, toxic, 0.5 + 0.5 * sin(t));
  col += glitch * vec3(0.2, 0.4, 0.1);

  float vig = smoothstep(1.1, 0.16, r);
  col *= vig * (0.75 + 0.75 * u_intensity);

  gl_FragColor = vec4(col, 1.0);
}
