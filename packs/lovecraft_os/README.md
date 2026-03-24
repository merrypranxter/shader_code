# Lovecraft OS Shader Pack (Phase 1)

This pack is designed for ShaderForge-style generation and direct use as standalone GLSL templates.

## Contents
- `shaders/eldritch_blacklight.frag`: Blacklight + op-art + cosmic dread surface shader.
- `shaders/signal_of_rlyeh.frag`: Glitchcore ritual signal shader.
- `shaders/ritual_portal.frag`: Portal-ring ritual vortex shader.
- `shaders/rlyeh_fold.vert`: Non-euclidean-inspired vertex fold deformation.
- `presets/lovecraft_blends.json`: Blend presets mixing Lovecraft core with style modulators.
- `integrations/shaderforge3_prompt_block.md`: Drop-in prompt template text for ShaderForge3.

## Uniform contract (common)
- `u_resolution` (`vec2`) viewport in pixels
- `u_time` (`float`) seconds since start
- `u_mouse` (`vec2`) pointer position in pixels
- `u_intensity` (`float`) thematic strength
- `u_glitch` (`float`) glitch corruption amount
- `u_glow` (`float`) emissive multiplier
- `u_distort` (`float`) geometric deformation amount

## Notes
- These are intentionally stylized and cinematic, not physically based.
- Default values should target readability first, then theatrical effects.
