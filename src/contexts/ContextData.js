import { useState, createContext, useEffect } from 'react'
import { db } from "../firebase"
import axios from "axios"

export const CounterContext = createContext();

export function CounterContextProvider({ children }) {
    const [count, setCount] = useState(0)
    const [countSub, setCountSub] = useState(0)
    const [countUser, setCountUser] = useState(0)

    const [movies, setMovies] = useState([])
    const [members, serMembers] = useState([])
    const [users, setUsers] = useState([])

    const [premissionsList, setPremissionsList] = useState([])

    useEffect(() => {
        db.collection("movies")
            .orderBy("id")
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    axios.get("https://api.tvmaze.com/shows")
                        .then(resp => resp.data.map(item => {
                            db.collection("movies")
                                .add({
                                    id: item.id,
                                    title: item.name,
                                    Genres: item.genres,
                                    Premiered: item.premiered,
                                    Image: item.image.original
                                })
                            return resp
                        }))
                    console.log("movies data set to the  DB")

                } else {
                    const ArrMovies = []
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        ArrMovies.push(data)
                    })
                    setMovies(ArrMovies)
                    console.log("movies list has been updated")

                }
            })
            .catch(error => console.log(error))


    }, [count])

    useEffect(() => {
        db.collection("Members")
            .orderBy("id")
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    axios.get("http://jsonplaceholder.typicode.com/users")
                        .then(resp => resp.data.map(item => {
                            db.collection("Members")
                                .add({
                                    id: item.id,
                                    name: item.name,
                                    Email: item.email,
                                    City: item.address.city,
                                    subscribe_movie_name: [],
                                })
                            return resp
                        }))
                } else {
                    const membersArr = []
                    snapshot.forEach(doc => {
                        membersArr.push(doc.data())
                    })
                    serMembers(membersArr)
                    console.log("members list has been updated is State")

                }
            })
            .catch(error => console.log(error))
    }, [countSub])



    useEffect(() => {
        db.collection("Permissons")
            .get()
            .then(snapshotPremissions => {
                if (snapshotPremissions.empty) {
                    db.collection("Permissons")
                        .add({
                            view_subs: "View Subscriptions",
                            create_subs: "Create Subscriptions",
                            delete_subs: "Delete Subscriptions",
                            update_subs: "Update Subscriptions",
                            view_movies: "View movies",
                            create_movies: "Create movies",
                            delete_movies: "Delete movies",
                            update_movies: "Update movies"
                        })
                    console.log("Permissons Update in DB")
                }
            }).catch(err => console.log(err))
        console.log("Permissons already in DB")


    }, [])

    useEffect(async () => {
        const preData = db.collection("Permissons")
        const snapshotPre = await preData.get()
        const data = []
        snapshotPre.forEach(doc => {
            data.push(doc.data())
        })
        setPremissionsList(data)
        console.log("Permissons Update is State")

    }, [])



    useEffect(async () => {
        const usersRef = db.collection('users').orderBy("id");
        const snapshot = await usersRef.get();
        const data = []
        snapshot.forEach(doc => {
            const UID = doc.data()
            UID.doc = doc.id
            data.push(UID);


        });
        setUsers(data)

    }, [countUser])


    const value = { premissionsList, movies, setMovies, count, setCount, members, serMembers, users, setUsers, countSub, setCountSub,countUser,setCountUser }
    return (
        <CounterContext.Provider value={value}>

            {children}

        </CounterContext.Provider>
    )
}