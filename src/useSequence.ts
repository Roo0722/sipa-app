import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useRef, useState } from "react";
import { playSound } from "./sound";
import type { Step } from "./types";

// Integer-millisecond timing: every step end is computed from the previous end,
// so there is no drift and a slow frame never loses time.
export function useSequence(steps: Step[], onDone: () => void) {
  const [index, setIndex] = useState(0);
  const [remainingMs, setRemainingMs] = useState(steps[0] ? steps[0].seconds * 1000 : 0);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);

  const idx = useRef(0);
  const endAt = useRef(0);
  const pausedLeft = useRef(0);
  const lastBeep = useRef(-1);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);
  useEffect(() => {
    endAt.current = Date.now() + (steps[0] ? steps[0].seconds * 1000 : 0);
  }, [steps]);

  const cue = useCallback(
    (i: number) => {
      const k = steps[i]?.kind;
      playSound(k === "work" ? "go" : "rest");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    },
    [steps],
  );

  const finish = useCallback(() => {
    setFinished(true);
    setRunning(false);
    setRemainingMs(0);
    playSound("done");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    doneRef.current();
  }, []);

  useEffect(() => {
    if (!running || finished) return;
    const t = setInterval(() => {
      const now = Date.now();
      let left = endAt.current - now;
      while (left <= 0) {
        const next = idx.current + 1;
        if (next >= steps.length) {
          finish();
          return;
        }
        idx.current = next;
        endAt.current += steps[next].seconds * 1000;
        lastBeep.current = -1;
        setIndex(next);
        cue(next);
        left = endAt.current - now;
      }
      setRemainingMs(left);
      const sec = Math.ceil(left / 1000);
      if (sec <= 3 && sec > 0 && sec !== lastBeep.current) {
        lastBeep.current = sec;
        playSound("tick");
      }
    }, 100);
    return () => clearInterval(t);
  }, [running, finished, steps, cue, finish]);

  const toggle = useCallback(() => {
    if (finished) return;
    if (running) {
      pausedLeft.current = Math.max(0, endAt.current - Date.now());
      setRemainingMs(pausedLeft.current);
      setRunning(false);
    } else {
      endAt.current = Date.now() + pausedLeft.current;
      setRunning(true);
    }
  }, [running, finished]);

  const jump = useCallback(
    (delta: number) => {
      if (finished) return;
      const next = Math.min(steps.length - 1, Math.max(0, idx.current + delta));
      idx.current = next;
      endAt.current = Date.now() + steps[next].seconds * 1000;
      pausedLeft.current = steps[next].seconds * 1000;
      lastBeep.current = -1;
      setIndex(next);
      setRemainingMs(steps[next].seconds * 1000);
      cue(next);
    },
    [steps, finished, cue],
  );

  return { index, remainingMs, running, finished, toggle, jump };
}
