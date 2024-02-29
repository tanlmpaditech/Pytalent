
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidate_assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      candidate_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'candidate_id',
        allowNull: false,
      },
      assessment_id: {
        type: Sequelize.DataTypes.INTEGER,
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
    await queryInterface.dropTable('candidate_assessments');
  }
};