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
