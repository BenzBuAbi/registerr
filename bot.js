const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');//Lordcreative
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');//Lordcreative
const { Client, Util } = require('discord.js');
const weather = require('weather-js')//Lordcreative//Lordcreative
const fs = require('fs');
const db = require('quick.db');//Lordcreative
const http = require('http');
const express = require('express');//Lordcreative
require('./util/eventLoader.js')(client);
const path = require('path');//Lordcreative
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();//Lordcreative
app.get("/", (request, response) => {
  console.log(Date.now() + "Riverdale | Public");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};//Lordcreative

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });//Lordcreative
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   lordCreative(chalk.bgBlue.green(e.replace(regTokenfynx 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\

//--------------------------------Hg Kanalı---------------------------------\\

client.on('guildMemberAdd', async member => {
  await member.addRole(`769620074519855115`) //id yazan yere verilecek rol (unregistered)
let member2 = member.user 
let zaman = new Date().getTime() - member2.createdAt.getTime()
var user = member2 
var takizaman = [];
if(zaman < 604800000) {
takizaman = '<a:rd_31:770335185073209384> Tehlikeli'
} else {
takizaman = `<a:rd_32:770335271082131546> Güvenli`}require("moment-duration-format");
 let zaman1 = new Date().getTime() - user.createdAt.getTime()
 const gecen = moment.duration(zaman1).format(` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 
 let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
 let message = member.guild.channels.find(x => x.id === `770685229400719400`) //id yazan kısma kanal id'si [orn: register-chat]
  const taki = new Discord.RichEmbed()
 .setTitle(
     "Hoş Geldin"
   )
   .setDescription(`<a:rd_9:769655763403800587>**・** **Sunucumuza Hoş geldin** ${member} 

<a:rd_33:770351638698262569>**・** **Seninle beraber tamı tamına sunucumuz __${message.guild.memberCount}__ Kişiye ulaşmış bulunmaktadır!**

<a:rd_34:770352319744573520>**・** **Hesabın toplam __${gecen}__ önce kurulmuş!**

<a:rd_7:769655752348401705>**・** **Bu Kullanıcı** **|** **${takizaman}**
`)
.setImage("https://i.pinimg.com/originals/b8/a7/cf/b8a7cfdf05a6114c20a1c313b8b637cc.gif")
.setTimestamp()
.setFooter(`❤︎ Riverdale`)
.setColor('RANDOM')
message.send(taki)
 });
////////////
client.on('guildMemberAdd', member  => {
  let rol = "767786569285238816"
  client.channels.get("767786569285238816").send(`${member} Adlı Kullanıya Başarıyla Otorol Verıldı`)
  member.addRole(rol)
})

