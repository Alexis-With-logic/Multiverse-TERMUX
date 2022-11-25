let levelling = require('../lib/levelling')

let handler = m => {
  let user = global.db.data.users[m.sender]
  if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    throw `
Level *${user.level} (${user.exp - min}/${xp})*
No es suficiente 💥*${max - user.exp}*🌌!
`.trim()
  }
  let before = user.level * 1
	while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
	if (before !== user.level) {
            m.reply(`
🌌𝐄𝐧𝐡𝐨𝐫𝐚𝐛𝐮𝐞𝐧𝐚, 𝐇𝐚𝐬 𝐬𝐮𝐛𝐢𝐝𝐨 𝐝𝐞 𝐧𝐢𝐯𝐞𝐥, 𝐚𝐡𝐨𝐫𝐚 𝐞𝐫𝐞𝐬 𝐥𝐚 𝐞𝐬𝐭𝐫𝐞𝐥𝐥𝐚 𝐪𝐮𝐞 𝐦𝐚𝐬 𝐛𝐫𝐢𝐥𝐥𝐚🌌.!
*${before}* -> *${user.level}*
Usar *.my* check
	`.trim())
        }
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = /^level(|up)$/i

module.exports = handler
