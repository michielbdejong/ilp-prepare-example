const packet = require('ilp-packet')
const crypto = require('crypto')
function sha256 (preimage) { return crypto.createHash('sha256').update(preimage).digest() }

module.exports = function () {
  const fulfillment = crypto.randomBytes(32)
  const condition = sha256(fulfillment)
  
  const binaryPrepare = packet.serializeIlpPrepare({
    amount: '10',
    executionCondition: condition,
    destination: 'g.us.nexus.bob', // this field was called 'account' in older packet types
    data: Buffer.from(['hello world']),
    expiresAt: new Date(new Date().getTime() + 10000)
  })
  process.stdout.write(binaryPrepare)
}
