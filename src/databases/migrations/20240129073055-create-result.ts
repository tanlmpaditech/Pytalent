
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      candidate_email: {
        type: Sequelize.DataTypes.STRING,
        field: 'email',
        allowNull: false,
      },
      assessment_game_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'assessment_game_id',
        allowNull: false,
      },
      score: {
        type: Sequelize.DataTypes.STRING,
        field: 'score',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('results');
  }
};