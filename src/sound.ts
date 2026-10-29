import { createAudioPlayer, type AudioPlayer } from "expo-audio";

const sources = {
  tick: require("../assets/sounds/tick.wav"),
  go: require("../assets/sounds/go.wav"),
  rest: require("../assets/sounds/rest.wav"),
  done: require("../assets/sounds/done.wav"),
} as const;

export type SoundName = keyof typeof sources;

const players: Partial<Record<SoundName, AudioPlayer>> = {};

export function playSound(name: SoundName) {
  try {
    let p = players[name];
    if (!p) {
      p = createAudioPlayer(sources[name]);
      players[name] = p;
    }
    p.seekTo(0);
    p.play();
  } catch {
    // Sound is a nicety; never crash a workout over it.
  }
}
