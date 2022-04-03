import { ChangeEventHandler, useEffect, useRef, useState } from "react";

function useInput<T>(
  initialValue: T,
  handler?: ChangeEventHandler<HTMLInputElement>
) {
  const [value, setValue] = useState(initialValue);
  const onChange: ChangeEventHandler<HTMLInputElement> =
    handler ??
    ((e) => {
      setValue(e.target.value as unknown as T);
    });
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return [{ onChange, value }, ref.current] as const;
}

export default useInput;
