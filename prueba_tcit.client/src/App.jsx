import { useState, useEffect } from "react";
import InputText from "./components/InputText";
import TablePosts from "./components/TablePosts";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
    const [posts, setPosts] = useState();
    const [post, setPost] = useState({
        Id: "",
        Nombre: "",
        Descripcion: ""
    });
    const [query, setQuery] = useState(null)

    useEffect(() => {
        getAllPost()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setPost({ ...post, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (post.Nombre === "" || post.Nombre === undefined) {
            window.alert("El campo nombre no puede estar vacio")
            return
        }
        if (post.Descripcion === "" || post.Descripcion === undefined) {
            window.alert("El campo descripción no puede estar vacio")
            return
        }

        try {
            const res = await fetch("api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
            const data = await res.json();
            posts.push(data)
            setPosts([...posts])
            setPost({ Nombre: "", Descripcion: "" });
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch("api/posts/" + id, {
                method: "Delete"
            })
            if (res.ok) {
                const filterPost = posts.filter(post => post.id !== id)
                setPosts([...filterPost])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearch = useDebouncedCallback(async (e) => {
        const { value } = e.target;
        if (value === "") {
            setQuery(null)
            return
        }
        console.log(value)
        try {
            const nombre = value.replace(" ", "%20")
            const res = await fetch("api/posts/" + nombre)
            const data = await res.json()
            console.log(data)
            setQuery([data])
        } catch (error) {
            console.log(error)
        }
    }, 1000)

    return (
        <div className="flex container mx-auto max-w-2xl">
            <div className="h-screen content-center">
                <div className="justify-center">
                    <form>
                        <InputText name="Nombre" placeholder="Nombre" onChange={handleChange} value={post.Nombre} />
                        <InputText name="Descripcion" placeholder="Descripción" onChange={handleChange} value={post.Descripcion} />
                        <button type="submit" className="btn" onClick={handleSubmit}>Crear</button>
                    </form>
                </div>
                <InputText type="search" name="Search" placeholder="Buscar por nombre" onChange={handleSearch} />
                <TablePosts posts={query === null ? posts : query} onClick={handleDelete} />
            </div>
        </div>
    )

    async function getAllPost() {
        const res = await fetch("api/posts");
        const data = await res.json();
        setPosts(data)
    }
}