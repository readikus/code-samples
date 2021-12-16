var fs = require('fs');

const processLine = line => {
    const a = line.split(' ')
    const date = `${a[0].substring(1, a[0].length)} ${a[1].substring(0,a[1].length-1)}`
    const action = a[3]
    return { date, action }
}

const uniqueGuards = records =>
  Array.from(records.reduce((acc, rec) => {
    if (rec.action.startsWith('#')){
      acc.add(rec.action)
    }
    return acc
  }, new Set))

const guardSleepingRecords = records => {
    // get all the unique guards
    const guards = uniqueGuards(records)
  
    const sleepCounts = guards.reduce((acc, guard) => {
      const sleepRecord = guardSleepRecords(guard, records)
      const total = sleepRecord.reduce((acc, sleep) => acc + (sleep.end - sleep.start), 0)
      const sleeping = countTimeSleeping(guard, records)
      const minute = mostCommonMinute(sleepRecord)

      acc.push({ guard, sleeping, sleepRecord, total, minute })
      return acc
    }, [])
  
    return sleepCounts
}

const mostMinutesAsleep = records => {
  const sleepCounts = guardSleepingRecords(records)
  sleepCounts.sort((a, b) => b.sleeping - a.sleeping)
  console.log('sleepCounts', sleepCounts)
  return sleepCounts[0]
}


const mostCommonMinute = (sleepRecords) => {
  const freq = []
  for(let minute = 0; minute < 60; minute++) {
    freq.push({minute, count: sleepRecords.reduce((acc, record) =>
        acc + (record.start <= minute && record.end > minute ? 1 : 0)
    , 0) })
  }

  freq.sort((a, b) => b.count - a.count)
  console.log('freq', freq)
  return freq[0]
//  const sleepCounts = guards.reduce((acc, guard) => {
//    acc.push({ guard, sleeping: countTimeSleeping(guard, records) })
//    return acc
//  }, [])
    
}

const countTimeSleeping = (guard, records) => {
  let sleepStart = 0
  let active = false
  return records.reduce((acc, record) => {
    if (record.action.startsWith(guard)) {
      active = true
    } else if(record.action.startsWith('#')) {
      active = false
    }
  
    if (active && record.action === 'asleep') {
      sleepStart = parseInt(record.date.substring(record.date.length - 2))
      console.log(sleepStart, record.date)
    }
    if (active && record.action === 'up') {
      acc += (parseInt(record.date.substring(record.date.length - 2)) - sleepStart)
    }
    return acc
  }, 0)
}

const guardSleepRecords = (guard, records) => {
  let start = 0
  let active = false
  return records.reduce((acc, record) => {
    if (record.action.startsWith(guard)) {
      active = true
    } else if(record.action.startsWith('#')) {
      active = false
    }

    if (active && record.action === 'asleep') {
      start = parseInt(record.date.substring(record.date.length - 2))
      console.log(' setting start ')
    }
    if (active && record.action === 'up') {
      acc.push( { start, end: parseInt(record.date.substring(record.date.length - 2)) })
    }
    return acc
  }, [])
}

const fileLines = fs.readFileSync('input').toString().split("\n")  
// transfer strings into objects
const records = fileLines.reduce((acc, line) => {
  acc.push(processLine(line))
  return acc
}, [])
// sort into date order
records.sort((a, b) => a.date.localeCompare(b.date))
// 
const mostSleeping = mostMinutesAsleep(records)
const minute = mostCommonMinute(mostSleeping.sleepRecord)


console.log('mostSleeping', mostSleeping)
console.log('minute', minute)
console.log('Answer (part 1): ', parseInt(mostSleeping.guard.substring(1)) * minute.minute)

const allSleepingRecords = guardSleepingRecords(records)
console.log('allSleepingRecords', allSleepingRecords)
allSleepingRecords.sort((a, b) => b.minute.count - a.minute.count)

console.log('Answer (part 2): ', parseInt(allSleepingRecords[0].guard.substring(1)) * allSleepingRecords[0].minute.minute)
