interface Props {
  score: number;
}

export default function Cell({ score }: Props) {
  const cols = [
    'bg-fuchsia-600',
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-yellow-300',
    'bg-lime-300',
    'bg-lime-400',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700',
  ];
  const textStyle = score === 0 ? cols[0] : score === 100 ? cols[cols.length - 1] : cols[Math.floor(score / 10)+1];
  const styles = `border-1 border-collapse border-gray-700 text-center text-sm p-2 ${textStyle}`;

  return <td className={styles}>{score.toFixed(2)}</td>;
}
