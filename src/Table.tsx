import data from "./lib/kinch.json";
import Flag from 'react-world-flags';
import Cell from './Cell';
import type { KinchEntry } from './KinchEntry';
import { eventOrder } from './utils';
const rows = data as KinchEntry[];

export default function Table () {
  return (
    <section>
      {/* X-scrollable header row with sticky y */}
      <div className='sticky top-0 bg-gray-800 text-white grid grid-cols-20 text-center min-w-300 z-50 py-2 text-sm'>
        <h3>Rank</h3>
        <h3>Region</h3>
        <h3>Score</h3>
        {eventOrder.map((eventId, i) => (
          <i className={`cubing-icon event-${eventId}`} key={i}></i>
        ))}
      </div>
      {/* Y-scrollable col with sticky x */}
      <div>
        {rows.map((row, i) => (
          <div key={i} className='grid grid-cols-20 bg-gray-800 text-white min-w-300 z-30 text-center'>
            <h4 className='flex flex-col justify-center'>{row.rank}</h4>
            <h4 className='sticky left-0 z-40 bg-gray-800 flex flex-row justify-center'>
              <Flag
                code={row.iso2.toUpperCase()}
                className="w-8 h-auto shadow-lg"
              />
            </h4>
            <h4 className='flex flex-col justify-center'>{row.overall.toFixed(2)}</h4>
            {eventOrder.map((eventId, i) => (
              <Cell score={row.scores[eventId]} key={i}/>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}