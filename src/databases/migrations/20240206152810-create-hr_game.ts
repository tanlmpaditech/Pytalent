
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hr_games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      hr_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'hr_id',
        allowNull: false,
      },
      game_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'game_id',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hr_games');
  }
};