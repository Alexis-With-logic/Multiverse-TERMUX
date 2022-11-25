const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Ya estás registrado\¿Quieres volver a registrarte?? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Formato incorrecto\n*${usedPrefix}lista nombre.años*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Los nombres no pueden estar vacíos (Alphanumeric)'
  if (!age) throw 'La edad no puede estar vacía (Número)'
  age = parseInt(age)
  if (age > 120) throw '*𝙴𝚁𝙴𝚂 𝙳𝙴𝙼𝙰𝚂𝙸𝙰𝙳𝙾 𝚅𝙸𝙴𝙹𝙾/𝙰*'
  if (age < 5) throw '*𝙻𝙾𝚂 𝙱𝙴𝙱𝙴𝚂 𝙿𝚄𝙴𝙳𝙴𝙽 𝙴𝚂𝙲𝚁𝙸𝙱𝙸𝚁 𝚂𝙴𝙶𝚄𝙽 𝙴𝙻 𝙿𝙾𝙳𝙴𝚁 𝙶𝙰𝙻𝙰𝙲𝚃𝙸𝙲𝙾*'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
𝐄𝐗𝐈𝐓𝐎 𝐔𝐒𝐓𝐄𝐃 𝐘𝐀 𝐄𝐒𝐓𝐀 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐃𝐎 𝐄𝐍 𝐄𝐋 𝐁𝐎𝐓

╭─「🌌 𝐈𝐍𝐅𝐎 🌌」
│ *𝙽𝙾𝙼𝙱𝚁𝙴*: ${name}
│ *𝙴𝙳𝙰𝙳*: ${age} año 
╰────
Serial Number: 
${sn}
`.trim())
}
handler.help = ['lista', 'reg', 'register'].map(v => v + ' <nombre>.<años>')
handler.tags = ['xp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler
