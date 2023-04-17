const bcrypt = require('bcrypt');
const saltRounds = 10;

const passwords = ["alice01", "12345", "qwerty", "root", "admin", "pass"]

async function getPassHash(password) {
  return await bcrypt.hash(password, saltRounds)
}

async function check(pass, hash) {
  return await bcrypt.compare(pass, hash)
}

const temp = [{
  res: true,
  pass: 'alice01',
  hash: '$2b$10$jsNxMCdFR0rFwlmTtNJigu8jFvpS4p5ps.MG2umOnjCtYQC.Z2sI2'
},
{
  res: true,
  pass: '12345',
  hash: '$2b$10$hyDYbjv1fOYzyOU1KsOzUeW39fTSqkOtq90TbKbfIxOeKFZpdgSDG'
},
{
  res: true,
  pass: 'qwerty',
  hash: '$2b$10$nvqTvTQ81b355bSMBZsmZu8ldTJIrTMzZu/ohBXT45b4y8r3D8bnq'
},
{
  res: true,
  pass: 'admin',
  hash: '$2b$10$lHfHum5ng8E8H0Jj1NaO5.5KX4Tw7CnqyIxAnrdgQcrKvqYLts0Ly'
},
{
  res: true,
  pass: 'root',
  hash: '$2b$10$nWHbTQcQ/i3GfOsRth1jUe/DErpQoZRbZDYjrrmiFIbUcA518wNVm'
},
{
  res: true,
  pass: 'pass',
  hash: '$2b$10$5Pq3k/fB0IlprfWM5nCCsudiRVpKhfPXPrLHfGPU1z/1fjzgBpbiO'
}]

const hashes = []

for (const pass of passwords) {
  getPassHash(pass).then(hash => {
    hashes.push({ pass, hash })
  })
}

setTimeout(() => {
  // for (const { pass, hash } of hashes) {
  //   check(pass, hash).then(res => {
  //     console.log({ res, pass, hash })
  //   })
  // }
  for (const { pass, hash } of temp) {
    check(pass, hash).then(res => {
      console.log({ res, pass, hash })
    })
  }
}, 1000)