import { setInDb } from '../../../utils/database.js';
import { getRegistrationDateKey } from '../../../utils/database/keys.js';
export default {
    name: 'register_modal',

    async execute(interaction) {
        const nickname = interaction.fields.getTextInputValue('nickname').trim();
        const starStableName = interaction.fields
            .getTextInputValue('star_stable_name')
            .trim();

        const newNickname = `${nickname} | ${starStableName}`;

        try {
            await interaction.member.setNickname(newNickname);
const probezeitRole = interaction.guild.roles.cache.find(
    role => role.name === 'Probezeit ~ 2 Wochen'
);

if (!probezeitRole) {
    throw new Error('Rolle "Probezeit ~ 2 Wochen" wurde nicht gefunden.');
}

await interaction.member.roles.add(probezeitRole);
       await setInDb(
    getRegistrationDateKey(interaction.guild.id, interaction.user.id),
    new Date().toISOString()
);
            await interaction.reply({
                content:
                    `✅ **Registrierung erfolgreich!**\n\n` +
                    `👤 Spitzname: **${nickname}**\n` +
                    `🐴 Star Stable: **${starStableName}**\n\n` +
                    `Dein Discord-Name wurde zu **${newNickname}** geändert.`,
                ephemeral: true,
            });
        } catch (error) {
            console.error('Fehler beim Ändern des Nicknames:', error);

            await interaction.reply({
                content:
                    '❌ Ich konnte deinen Discord-Namen leider nicht ändern. ' +
                    'Bitte stelle sicher, dass ich die Berechtigung **„Spitznamen verwalten“** habe und meine Bot-Rolle über deiner Rolle steht.',
                ephemeral: true,
            });
        }
    },
};
