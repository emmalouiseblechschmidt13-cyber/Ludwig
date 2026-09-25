import { getFromDb, setInDb } from '../utils/database.js';

const PROBEZEIT = 'Probezeit ~ 2 Wochen';
const NEWBIE = 'Newbie';
const MITGLIED = 'Mitglied';

const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

function getRegistrationKey(guildId, userId) {
    return `guild:${guildId}:member_registration:${userId}`;
}

export async function saveRegistration(guildId, userId) {
    const key = getRegistrationKey(guildId, userId);

    await setInDb(key, {
        registeredAt: new Date().toISOString(),
    });
}

export async function checkMemberRoles(client) {
    for (const guild of client.guilds.cache.values()) {
        for (const member of guild.members.cache.values()) {
            if (member.user.bot) continue;

            const key = getRegistrationKey(guild.id, member.id);
            const data = await getFromDb(key, null);

            if (!data?.registeredAt) continue;

            const registeredAt = new Date(data.registeredAt).getTime();
            const age = Date.now() - registeredAt;

            const probezeitRole = guild.roles.cache.find(
                role => role.name === PROBEZEIT
            );

            const newbieRole = guild.roles.cache.find(
                role => role.name === NEWBIE
            );

            const mitgliedRole = guild.roles.cache.find(
                role => role.name === MITGLIED
            );

            if (age >= ONE_MONTH) {
                if (mitgliedRole) {
                    await member.roles.add(mitgliedRole);
                }

                if (probezeitRole) {
                    await member.roles.remove(probezeitRole);
                }

                if (newbieRole) {
                    await member.roles.remove(newbieRole);
                }
            } else if (age >= TWO_WEEKS) {
                if (newbieRole) {
                    await member.roles.add(newbieRole);
                }

                if (probezeitRole) {
                    await member.roles.remove(probezeitRole);
                }
            }
        }
    }
}
