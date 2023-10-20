import { type Signal, useSignal, useTask$ } from "@builder.io/qwik";

export function useDebounce(signal: Signal, milliSeconds: number) {
  // create the debounced Signal
  const debouncedSig = useSignal("");

  useTask$(({ track, cleanup }) => {
    // track the signal
    track(() => signal.value);

    // start timeout
    const debounced = setTimeout(async () => {
      // 1. invoke the function
      // 2. update the debouncedSig signal
      debouncedSig.value = signal.value;
    }, milliSeconds);

    // clean setTimeout each time the tracked signal changes
    cleanup(() => clearTimeout(debounced));
  });

  // Return the debouncedSig
  return debouncedSig;
}
