#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_glow;
uniform float u_distort;

mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.0+vec2(2.3,-1.7); a*=0.5; }
  return v;
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy)/min(u_resolution.x,u_resolution.y);
  float t = u_time;

  float mouseTwist = (u_mouse.x / max(u_resolution.x, 1.0) - 0.5) * 1.2;
  p *= rot(0.35*sin(t*0.6) + mouseTwist);
  p += 0.10*u_distort*vec2(sin(p.y*8.0+t*1.3), cos(p.x*7.0-t*1.1));

  float a = atan(p.y,p.x);
  float r = length(p);
  float k = abs(sin(a*6.0 + t*0.8));
  vec2 kp = vec2(cos(a*k), sin(a*k))*r;

  float bands = 0.5 + 0.5*sin(28.0*length(kp) - t*5.0 + fbm(kp*4.0+t)*3.0);
  float petals = smoothstep(0.2, 1.0, sin(a*12.0 + t*2.2));
  float core = smoothstep(0.33, 0.0, r);

  vec3 pink = vec3(1.0, 0.15, 0.55);
  vec3 cyan = vec3(0.05, 0.95, 1.0);
  vec3 lime = vec3(0.75, 1.0, 0.1);
  vec3 violet = vec3(0.45, 0.2, 0.95);

  vec3 col = mix(violet, cyan, bands);
  col = mix(col, pink, petals*0.45);
  col += core * mix(lime, pink, 0.5+0.5*sin(t*1.4));
  col += u_glow * 0.4 * pow(max(bands,0.0), 3.0) * cyan;

  float vignette = smoothstep(1.25, 0.15, r);
  col *= vignette * (0.65 + 0.8*u_intensity);

  gl_FragColor = vec4(col, 1.0);
}
