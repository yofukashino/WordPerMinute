import { React } from "replugged/common";
import { Text } from "replugged/components";
export default ({ textValue }: { textValue: string }) => {
  const [initialText, setInitialText] = React.useState<string>("");
  const [wpm, setWPM] = React.useState(0);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const updateWPM = () => {
    const words = textValue
      .replace(initialText, "")
      .split(" ")
      .filter((word) => word !== "" && word !== " ");
    const elapsedTime = (new Date().getTime() - startTime) / 1000 / 60;
    const currentWPM = words.length / elapsedTime;

    setWPM(isFinite(currentWPM) ? Math.floor(currentWPM) : 0);
  };
  React.useEffect(() => {
    if (textValue.trim().length > 0 && !startTime) {
      setInitialText(textValue);
      setStartTime(new Date().getTime() - 1000);
    }

    if (textValue.trim().length === 0 && startTime) {
      setStartTime(null);
      setWPM(0);
    }

    if (startTime != null) {
      updateWPM();
    }
    const interval = setInterval(() => {
      if (startTime != null) {
        updateWPM();
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [textValue, startTime]);
  return (
    <div className="wpm-counter">
      <Text.Eyebrow>WPM: {isFinite(wpm) ? Math.floor(wpm) : 0}</Text.Eyebrow>
    </div>
  );
};
