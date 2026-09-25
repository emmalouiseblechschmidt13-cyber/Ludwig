import { getFromDb, setInDb } from '../../../utils/database.js';

function getEventKey(messageId) {
    return `event:${messageId}:participants`;
}

export default {
    name: 'event_leave',

    async execute(interaction) {
        const key = getEventKey(interaction.message.id);

        const participants = (await getFromDb(key)) || [];

        if (!participants.includes(interaction.user.id)) {
            return interaction.reply({
                content: '🔴 Du bist aktuell nicht für das Event eingetragen.',
                ephemeral: true,
            });
        }

        const updatedParticipants = participants.filter(
            userId => userId !== interaction.user.id
        );

        await setInDb(key, updatedParticipants);

        await interaction.reply({
            content: '🔴 Du wurdest vom Event ausgetragen.',
            ephemeral: true,
        });
    },
};
