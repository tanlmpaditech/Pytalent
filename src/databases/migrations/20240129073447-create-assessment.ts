
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
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
      type: {
        type: Sequelize.DataTypes.STRING,
        field: 'type',
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