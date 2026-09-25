import {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
} from 'discord.js';

export default {
    name: 'register_button',

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('register_modal')
            .setTitle('Star Stable Registrierung');

        const nicknameInput = new TextInputBuilder()
            .setCustomId('nickname')
            .setLabel('Dein Spitzname')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('z. B. Taro')
            .setRequired(true)
            .setMaxLength(20);

        const starStableInput = new TextInputBuilder()
            .setCustomId('star_stable_name')
            .setLabel('Dein Star Stable Name')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('z. B. Crystal Purplecry')
            .setRequired(true)
            .setMaxLength(25);

        const nicknameRow = new ActionRowBuilder().addComponents(
            nicknameInput
        );

        const starStableRow = new ActionRowBuilder().addComponents(
            starStableInput
        );

        modal.addComponents(nicknameRow, starStableRow);

        await interaction.showModal(modal);
    },
};
