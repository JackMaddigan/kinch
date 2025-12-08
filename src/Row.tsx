import type { EventId } from '@wca/helpers';
import type { KinchEntry } from './KinchEntry';
import Flag from "react-world-flags";
import { eventOrder } from './utils';
import Cell from './Cell';

interface Props {
  row: KinchEntry;
}

export default function Row({row}: Props) {
  const styles = "border-1 border-collapse border-gray-700 text-center text-sm text-white";
  const headerStyles = styles + " bg-gray-900";
  return (
    <tr>
      <td className={headerStyles}>{row.rank}</td>
      <td className={headerStyles}>
        <div className='flex flex-row justify-center'>
          <Flag code={row.iso2.toUpperCase()} className='w-8 h-auto shadow-lg'/>
        </div>
      </td>
      <td className={`${headerStyles} font-bold`}>{row.overall.toFixed(2)}</td>
      {eventOrder.map((eventId: EventId, i) => (
        <Cell score={row.scores[eventId]} key={i} />
      ))}
    </tr>
  )
}
