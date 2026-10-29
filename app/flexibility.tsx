import { useMemo } from "react";
import { buildFlex } from "../src/data/flexibility";
import { StagePreview } from "../src/StagePreview";

export default function Flexibility() {
  const steps = useMemo(() => buildFlex(), []);
  return (
    <StagePreview
      intro="Seven stretches and kicking-range drills. Ease into each one, never force the range, and breathe slowly."
      steps={steps}
      startHref="/run?kind=flex"
    />
  );
}
