module.exports = {
    up: async queryInterface => {
        await queryInterface.bulkInsert('plans', [
            {
                uuid: '632ad245-3d05-4346-9a8d-2ac27d1189b1',
                name: 'Standard',
                price: 50,
                updatedAt: '2021-02-08T13:30:07.592Z',
                createdAt: '2021-02-08T13:30:07.592Z'
            },
            {
                uuid: 'b4ee2776-6743-4b14-abb3-68275b3ea844',
                name: 'Elite',
                price: 75,
                updatedAt: '2021-02-08T13:32:07.592Z',
                createdAt: '2021-02-08T13:32:07.592Z'
            },
            {
                uuid: '5b6ea5a5-377f-42f0-8901-a84f9a182695',
                name: 'Ultimate',
                price: 100,
                updatedAt: '2021-02-08T13:31:07.592Z',
                createdAt: '2021-02-08T13:31:07.592Z'
            }
        ], {});
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('plans', null, {});
    }
};
