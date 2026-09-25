import { getFromDb, setInDb } from '../../../utils/database.js';

function getEventKey(messageId) {
    return `event:${messageId}:participants`;
}

export default {
    name: 'event_join',

    async execute(interaction) {
        const key = getEventKey(interaction.message.id);

        const participants = (await getFromDb(key)) || [];

        if (participants.includes(interaction.user.id)) {
            return interaction.reply({
                content: '🟢 Du bist bereits für das Event eingetragen!',
                ephemeral: true,
            });
        }

        participants.push(interaction.user.id);

        await setInDb(key, participants);

        await interaction.reply({
            content: '🦢 Du bist für das Event eingetragen! 🟢',
            ephemeral: true,
        });
    },
};
