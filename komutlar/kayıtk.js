const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı3 = message.guild.roles.find(r => r.id === "769618707550306325"); //buraya kayıtlı rolünüzün id'sini koyun.
  const kayıtlı2 = message.guild.roles.find(r => r.id === "769618814592876565"); //buraya kayıtlı rolünüzün id'sini koyun.
  const kayıtlı = message.guild.roles.find(r => r.id === "767786562040627230"); //buraya kayıtlı rolünüzün id'sini koyun.
  const misafir = message.guild.roles.find(r => r.id === "769620074519855115"); //buraya misafir rolünüzün id'sini koyun.
  const misafir2 = message.guild.roles.find(r => r.id === "767786569285238816"); //buraya misafir rolünüzün id'sini koyun.
  const log = message.guild.channels.find(c => c.id === "767786740639203359"); //buraya kayıt log id koyun
  const tag = "マ";
  if(!message.member.roles.array().filter(r => r.id === "769603830161211402")[0]) { //buraya kayıt sorumlusu rolünün id'sini giriniz. SUNUCU AYARLARINDAN kopyalayın.
    return message.channel.send("**Bu İşlemi Sadece Kayıt Sorumluları Gerçekleştirebilir.**");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("**Bir Kullanıcı Girin.**")
    const c = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("**Bir İsim Girin.**")
      if(!yas) return message.channel.send("**Bir Yaş Girin.**")
    c.addRole(kayıtlı3)
    c.addRole(kayıtlı2)
    c.addRole(kayıtlı)
    c.removeRole(misafir)
    c.removeRole(misafir2)
    c.setNickname(`${tag} ${nick} | ${yas}`)
    const embed = new Discord.RichEmbed()
    .setAuthor("✔️ Kayıt Yapıldı")
    .addField(`Kaydı yapılan\n`, `${c.user.tag}`)
    .addField(`Kaydı yapan\n`, `${message.author.tag}`)
    .addField(`Yeni isim\n`, `${tag} ${nick} | ${yas}`)
    .setFooter("Riverdale Kayıt Sistemi")
    .setColor("#db6dc6")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k","kız"],
  permLevel: 0
};
exports.help = {
  name: "k",
  description: "k",
  usage: "k"
};
