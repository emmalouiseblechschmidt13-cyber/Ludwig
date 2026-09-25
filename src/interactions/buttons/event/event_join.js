import { getFromDb, setInDb } from '../../../utils/database.js';
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

function getEventKey(messageId) {
    return `event:${messageId}:participants`;
}

async function updateEventMessage(interaction, participants) {
    const names = await Promise.all(
        participants.map(async userId => {
            try {
                const member = await interaction.guild.members.fetch(userId);
                return `• ${member.displayName}`;
            } catch {
                return null;
            }
        })
    );

    const participantList = names.filter(Boolean);

    const text =
        '## 🦢 Dark Swans Inc. – Wochen-Event\n\n' +
        '📅 **Event: Mittwoch**\n\n' +
        '### 🟢 Teilnehmer\n' +
        (participantList.length
            ? participantList.join('\n')
            : 'Noch niemand eingetragen.') +
        '\n\n' +
        'Klicke auf **Teilnehmen**, um dich einzutragen.\n' +
        'Klicke auf **Austragen**, wenn du doch nicht teilnehmen kannst.';

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('event_join')
            .setLabel('Teilnehmen')
            .setEmoji('🟢')
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId('event_leave')
            .setLabel('Austragen')
            .setEmoji('🔴')
            .setStyle(ButtonStyle.Danger)
    );

    await interaction.message.edit({
        content: text,
        components: [row],
    });
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

        await updateEventMessage(interaction, participants);

        await interaction.reply({
            content: '🦢 Du bist für das Event eingetragen! 🟢',
            ephemeral: true,
        });
    },
};
