import data from "./lib/kinch.json";
import type { KinchEntry } from './KinchEntry';
import Row from './Row';
import { eventOrder } from './utils';
const records = data as KinchEntry[];

export default function Table() {
  const headerClass = 'border-collapse border-1 border-gray-700 bg-gray-900 text-white text-center p-2 text-sm';
  return (
    <table className='w-full'>
      <thead>
        <tr className='sticky top-4'>
          <th className={headerClass}>Rank</th>
          <th className={headerClass}>Region</th>
          <th className={headerClass}>Score</th>
          {eventOrder.map(id => (
            <th className={headerClass}><i className={`cubing-icon event-${id}`}></i></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((row, i) => (
          <Row row={row} key={i}/>
        ))}
      </tbody>
    </table>
  );
}