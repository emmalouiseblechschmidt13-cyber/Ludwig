import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Sendet das Registrierungsformular')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const button = new ButtonBuilder()
            .setCustomId('register_button')
            .setLabel('Jetzt registrieren')
            .setEmoji('📝')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({
            content:
                '## 🦢 Registrierung\n\n' +
                'Klicke auf **📝 Jetzt registrieren**, um dich für den Club zu registrieren.\n\n' +
                'Du wirst nach deinem **Spitznamen** und deinem **Star Stable Namen** gefragt.',
            components: [row],
        });
    },
};
