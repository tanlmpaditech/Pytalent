
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      role_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'role_id',
        allowNull: false,
      },
      role_type: {
        type: Sequelize.DataTypes.STRING,
        field: 'role_type',
        allowNull: false,
      },
      url: {
        type: Sequelize.DataTypes.STRING,
        field: 'url',
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
    await queryInterface.dropTable('roles');
  }
};