function convertSecondsToHMS(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  const formattedHours: string = hours.toString().padStart(2, '0');
  const formattedMinutes: string = minutes.toString().padStart(2, '0');
  const formattedSeconds: string = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export default convertSecondsToHMS;
