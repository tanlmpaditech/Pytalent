
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      assessment_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'assessment_id',
        allowNull: false,
      },
      start: {
        type: Sequelize.DataTypes.DATE,
        field: 'start',
        allowNull: false,
      },
      end: {
        type: Sequelize.DataTypes.DATE,
        field: 'end',
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        field: 'status',
        allowNull: false,
      },
      hr_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'hr_id',
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
    await queryInterface.dropTable('assessments');
  }
};