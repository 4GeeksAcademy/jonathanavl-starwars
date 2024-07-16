const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            planets: [],
            vehicles: [],
            favorites: [],
            showSplash: true,
        },
        actions: {
            fetchPeople: async () => {
                try {
                    const response = await fetch('https://www.swapi.tech/api/people');
                    if (!response.ok) throw new Error('Failed to fetch people');
                    const data = await response.json();

                    const detailedPeople = await Promise.all(
                        data.results.map(async (person) => {
                            const detailResponse = await fetch(person.url);
                            if (!detailResponse.ok) throw new Error(`Failed to fetch details for ${person.name}`);
                            const detailData = await detailResponse.json();
                            return {
                                ...detailData.result.properties,
                                uid: person.uid,
                                type: 'person',
                            };
                        })
                    );

                    setStore({ people: detailedPeople });
                } catch (error) {
                    console.error('Error fetching people from SWAPI', error);
                }
            },
            fetchPlanets: async () => {
                try {
                    const response = await fetch('https://www.swapi.tech/api/planets');
                    if (!response.ok) throw new Error('Failed to fetch planets');
                    const data = await response.json();

                    const detailedPlanets = await Promise.all(
                        data.results.map(async (planet) => {
                            const detailResponse = await fetch(planet.url);
                            if (!detailResponse.ok) throw new Error(`Failed to fetch details for ${planet.name}`);
                            const detailData = await detailResponse.json();
                            return {
                                ...detailData.result.properties,
                                uid: planet.uid,
                                type: 'planets',
                            };
                        })
                    );

                    setStore({ planets: detailedPlanets });
                } catch (error) {
                    console.error('Error fetching planets from SWAPI', error);
                }
            },
            fetchVehicles: async () => {
                try {
                    const response = await fetch('https://www.swapi.tech/api/vehicles');
                    if (!response.ok) throw new Error('Failed to fetch vehicles');
                    const data = await response.json();

                    const detailedVehicles = await Promise.all(
                        data.results.map(async (vehicle) => {
                            const detailResponse = await fetch(vehicle.url);
                            if (!detailResponse.ok) throw new Error(`Failed to fetch details for ${vehicle.name}`);
                            const detailData = await detailResponse.json();
                            return {
                                ...detailData.result.properties,
                                uid: vehicle.uid,
                                type: 'vehicles',
                            };
                        })
                    );

                    setStore({ vehicles: detailedVehicles });
                } catch (error) {
                    console.error('Error fetching vehicles from SWAPI', error);
                }
            },
            hideSplashScreen: () => {
                setStore({ showSplash: false });
            },
            addFavorite: (item) => {
                const store = getStore();
                if (!store.favorites.some((fav) => fav.uid === item.uid)) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },
            removeFavorite: (item) => {
                const store = getStore();
                setStore({ favorites: store.favorites.filter((fav) => fav.uid !== item.uid) });
            },
        },
    };
};

export default getState;
