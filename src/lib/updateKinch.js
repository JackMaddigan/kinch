import fs from "fs";

const eventOrder = ["333","222","444","555","666","777","333bf","333fm","333oh",
"clock","minx","pyram","skewb","sq1","444bf","555bf","333mbf"];

async function wcaFetch(path) {
  const res = await fetch("https://www.worldcubeassociation.org/api/v0/"+path);
  if(!res.ok) throw new Error("Failed WCA fetch");
  return await res.json();
}

async function updateKinch(){
  const {world_records, national_records} = await wcaFetch("records");
  const countries = await wcaFetch("countries");

  const data = [];
  Object.entries(national_records).forEach(([country, events]) => {
    let sumOfUnroundedScores = 0;
    const scores = eventOrder.reduce((acc, eventId) => {
      const record = events[eventId];
      const score = record === undefined ? 0 : getKinchFor(eventId, world_records[eventId], record);
      sumOfUnroundedScores += score;
      acc[eventId] = Math.round(score*1e4, 2) / 100;
      return acc;
    }, {});

    const overall = Math.round((sumOfUnroundedScores / eventOrder.length)*1e4)/100;
    const iso2 = countries.find(c => c.id === country)?.iso2;

    data.push({
      country, iso2, scores, overall
    });
  })

  data.sort((a, b) => b.overall - a.overall);

  // assign rankings
  data.forEach((entry, i) => entry.rank = i+1);

  // potential for ties
  for(let i=1; i<data.length; i++){
    if(data[i-1].overall === data[i].overall) { data[i].rank = data[i-1].rank; }
  }

  fs.writeFileSync("./src/lib/kinch.json", JSON.stringify(data, null, 2));


}

function getKinchFor(eventId, wr, nr){
  if(eventId === '333mbf') return getMbldKinch(wr, nr);
  if(['333bf', '444bf', '555bf', '333fm'].includes(eventId)) return getEitherKinch(wr, nr);
  return getAverageKinch(wr, nr);
}

function getMbldKinch(wr, nr) {
  if(nr.single <= 0) return 0;
  return getMbldKinchScore(nr.single) / getMbldKinchScore(wr.single);
}

function getAverageKinch(wr, nr) {
  if(!nr || !nr.average ||  nr.average <= 0) return 0;
  return wr.average / nr.average;
}

function getSingleKinch(wr, nr) {
  if(nr.single <= 0) return 0;
  return wr.single / nr.single;
}

function getEitherKinch(wr, nr) {
  const avg = getAverageKinch(wr, nr);
  const single = getSingleKinch(wr, nr);
  return Math.max(avg, single);
}

function getMbldKinchScore(code){
  // 0DDTTTTTMM
  const missed = code % 100;
  const seconds = Math.floor(code / 100) % 1e5;
  const difference = 99 - Math.floor(code / 1e7);

  // return a kinch score
  const fracHourLeft = 1 - seconds / 3600;
  return difference + fracHourLeft;
}


updateKinch();