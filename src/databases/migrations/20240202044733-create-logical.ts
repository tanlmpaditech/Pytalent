
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logicals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.DATE,
        field: 'question',
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING,
        field: 'answer',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logicals');
  }
};