
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logicals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      question: {
        type: Sequelize.DataTypes.STRING,
        field: 'question',
        allowNull: false,
      },
      answer: {
        type: Sequelize.DataTypes.STRING,
        field: 'answer',
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
    await queryInterface.dropTable('logical_games');
  }
};