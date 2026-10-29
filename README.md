# SIPA!

A sepak takraw training guide. Free, offline, no accounts, no website scraping.

Expo SDK 57 / React Native 0.86 / expo-router. Dark theme, portrait only.

## What is inside
- Full session: Warm-Up, HIIT and Flexibility & Kicking back to back
- Warm-Up Guide (24 steps, left/right colour coding), HIIT Interval Timer, Flexibility & Kicking
- Training Log & Rank (stored on the phone only)
- What's New (edit `src/changelog.ts` for every release)

Exercise lists live in `src/data/` and are draft content to be optimised.

## Develop
```
npm install
npx expo start
npm run typecheck
```

## Assets
`python tools/make_assets.py` regenerates the beep sounds and placeholder icons (needs Pillow).
Replace `assets/images/*` with the real emblem when it is ready.

## Build the APK (free, GitHub Actions)
Push to `main`, or run the "Build APK" workflow by hand. The APK appears under Releases.
The APK is signed with the debug key for now. A stable release key (so updates install over each other) is a later step; never commit keystores or secrets (`.gitignore` blocks them).
