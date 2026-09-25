import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Verwaltet die wöchentlichen Club-Events')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)

        .addSubcommand(subcommand =>
            subcommand
                .setName('setup')
                .setDescription('Erstellt die Event-Anmeldung')
        ),

    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'setup') {
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

            await interaction.reply({
                content:
                    '## 🦢 Dark Swans Inc. – Wochen-Event\n\n' +
                    '📅 **Event: Mittwoch**\n\n' +
                    'Möchtest du am nächsten Club-Event teilnehmen?\n\n' +
                    '🟢 Klicke auf **Teilnehmen**\n' +
                    '🔴 Klicke auf **Austragen**',
                components: [row],
            });
        }
    },
};
