import React, { useCallback, useState } from "react";

type UseSwaipeArgs = {
  onClose?: () => void;
};

export const useSwipeClose = (args: UseSwaipeArgs) => {
  const [swaipeYState, setSwaipeYState] = useState({ start: 0, move: 0 });

  const isCloseable = swaipeYState.move > 70;

  const handleStart: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setSwaipeYState((prev) => ({ ...prev, start: event.touches[0].pageY }));
    },
    []
  );

  const handleMove: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setSwaipeYState((prev) => {
        const start = prev.start;
        const move = event.touches[0].pageY - start;
        console.log(event.touches[0].pageY - start);

        return move > 0 ? { ...prev, move } : prev;
      });
    },
    []
  );

  const handleEnd: React.TouchEventHandler<HTMLDivElement> = useCallback(() => {
    if (swaipeYState.move > 70) {
      args.onClose ? args.onClose() : null;
      return;
    }
    setSwaipeYState({ start: 0, move: 0 });
  }, [args, swaipeYState.move]);

  const TouchBarComponent = (
    <div
      className="absolute top-2 flex h-[600px] w-screen justify-center  "
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="h-1 w-20 -translate-x-1/2 rounded-xl bg-gray-400" />
    </div>
  );

  return { isCloseable, swaipeYState, setSwaipeYState, TouchBarComponent };
};
