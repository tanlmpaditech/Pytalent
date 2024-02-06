
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assessment_games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      game_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'game_id',
        allowNull: false,
      },
      assessment_id: {
        type: Sequelize.DataTypes.STRING,
        field: 'assessment_id',
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
    await queryInterface.dropTable('assessment_games');
  }
};