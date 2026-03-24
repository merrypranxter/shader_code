# ShaderForge3 Prompt Block (Lovecraft OS Pack)

Use this as a drop-in library block or prompt seed for your generation pipeline.

```text
[LIBRARY: LOVECRAFT_OS_PHASE1]
MISSION:
Generate cinematic GLSL shaders inspired by Lovecraft core aesthetics blended with modular style overlays.

CORE THEMES:
- cosmic dread, void architecture, non-euclidean folding, occult glyph systems

STYLE MODULATORS:
- op_art_style: moire, optical tension, radial interference
- glitchcore_style: signal breaks, scan tears, data corruption
- vintage_blacklight_poster_style: fluorescent high-contrast glow over black
- fantastic_planet_style: surreal organic biome-like shape language
- garbage-enlightenment-style: playful grotesque mutation
- psychedelic_pop_style: ornate symbolic rhythm and saturated accents
- merry-style: glam-prismatic shimmer + dreamy analog distortion

OUTPUT FORMAT:
- Provide GLSL fragment shader (and optional vertex shader)
- Use uniforms: u_resolution, u_time, u_mouse, u_intensity, u_glow, u_distort, u_glitch
- Include a short "Art Direction" section after the code

QUALITY RULES:
- avoid flat color fields unless intentional for dramatic contrast
- preserve readability in center frame at default parameters
- include at least one motion layer (pulse, swirl, drift, corruption)
- keep effects parameterized for easy live tweaking

PRESET PROFILES:
- eldritch_blacklight (0.55 lovecraft / 0.30 blacklight / 0.15 op_art)
- signal_of_rlyeh (0.50 lovecraft / 0.30 glitchcore / 0.20 op_art)
- cosmic_glam_cult (0.45 lovecraft / 0.30 merry / 0.15 blacklight / 0.10 psy_pop)
- mutant_grimoire (0.50 lovecraft / 0.30 garbage_enlightenment / 0.20 fantastic_planet)
- hypnosis_cathedral (0.40 lovecraft / 0.40 op_art / 0.20 glitchcore)
```

## Suggested integration in `src/App.tsx`
- Add a new selectable library key: `LOVECRAFT_OS_PHASE1`
- Load `presets/lovecraft_blends.json`
- Surface preset-controlled uniforms in your UI sliders
