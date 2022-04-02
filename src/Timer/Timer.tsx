import { useEffect, useState } from "react";
interface Props {
  initialMinutes?: number;
  initialSeconds?: number;
  onEnd?: () => any;
}

export const Timer = (props: Props) => {
  const { initialMinutes = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          handleEnd();
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleEnd = () => {
    props.onEnd?.();
  };

  const pad = (number: number) => {
    return number.toString().padStart(2, "0");
  };

  return (
    <div>
      {pad(minutes)}:{pad(seconds)}
    </div>
  );
};
