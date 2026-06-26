# Changelog

## 2026-06-26 - Improve post-workout coach tip loading

The workout completion screen now shows an immediate deterministic coach tip instead of blank space while the personalized AI insight loads. Personalized insights still replace the fallback when ready, and feedback controls only appear for the AI-generated insight. The `/api/insight` prompt was also shortened to reduce response size.
