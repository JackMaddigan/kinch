import type { KinchEntry } from './KinchEntry';
import { eventOrder } from './utils';
import data from "./lib/kinch.json";
import Flag from 'react-world-flags';
import Cell from './Cell';
const records = data as KinchEntry[];

export default function KinchTable () {
  const border = 'border-1 border-gray-600 p-2';
  return (
    <section>
      <table className="border-collapse w-full">
        <thead className="sticky top-0 bg-gray-800 text-white z-50">
          <tr className="sticky top-0 left-0">
            <th className={`${border} sticky left-0 z-50 bg-gray-800`}>
              <div className="flex flex-row gap-4 text-xs">
                <div className='flex-1'>Rank</div>
                <div className='flex-0.5'>Region</div>
                <div className='flex-1'>Score</div>
              </div>
            </th>
            {eventOrder.map((eventId, i) => (
              <th key={i} className={`${border}`}>
                <i className={`cubing-icon event-${eventId}`} key={i}></i>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((row, i) => (
            <tr key={i} className='bg-gray-800 border-1 border-gray-800'>
              <td className={`sticky left-0 bg-gray-800 border-1 border-gray-800 text-white text-center`}>
                <div className="flex flex-row">
                  <div className='flex-1'>{row.rank}</div>
                  <div className='flex-0.5'>
                    <Flag
                      code={row.iso2.toUpperCase()}
                      className="w-8 h-auto shadow-lg"
                    />
                  </div>
                  <div className='flex-1'>{row.overall.toFixed(2)}</div>
                </div>
              </td>
              {Object.entries(row.scores).map(([, score], i) => (
                  <Cell score={score} key={i}/>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}