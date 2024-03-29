module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },

      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false,
      },

      name: {
        type: Sequelize.DataTypes.STRING(255),
        field: 'name',
        allowNull: false,
      },

      email: {
        type: Sequelize.DataTypes.STRING(255),
        field: 'email',
        allowNull: false,
      },

      password: {
        type: Sequelize.DataTypes.TEXT,
        field: 'password',
        allowNull: false,
      },

      role_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    })

    await Promise.all([
      QueryInterface.addIndex('users', ['email'], {
        name: ['users', 'email', 'unique'].join('_'),
        indicesType: 'unique',
        type: 'unique',
      }),
    ])
  },

  down: async (queryInterface) => queryInterface.dropTable('users'),
}
