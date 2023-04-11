import RootStore from "./RootStore";

const storeProvider = RootStore.create({
    contents:[
        {
            id: '1',
            title: 'First Name',
            description: 'Type the first name',
            seen: false,
            notes: '',
        },
        {
            id: '2',
            title: 'Second Name',
            description: 'Type the second name',
            seen: false,
            notes: '',
        },
        {
            id: '3',
            title: 'Nickname',
            description: 'Type the nickname',
            seen: false,
            notes: '',
        },
        {
            id: '4',
            title: 'GTX series',
            description: 'Type the GTX model',
            seen: true,
            notes: 'Gtx 1070',
        }
    ]
})

export default storeProvider;