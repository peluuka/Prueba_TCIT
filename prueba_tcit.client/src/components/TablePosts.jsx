export default function TablePosts({ posts, onClick }) {
    
    return (
        <div className="overflow-x-auto my-3">
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripci�n</th>
                        <th>Acci�n</th>
                    </tr>
                </thead>
                <tbody>
                    {posts &&
                        <>
                            {posts.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.nombre}</td>
                                    <td>{post.descripcion}</td>
                                    <td>
                                        <button onClick={() => onClick(post.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                            }
                        </>
                    }
                </tbody>
            </table>
            {!posts && <>
                <p className="text-center font-medium mt-3">No hay ning�n post publicado</p>
            </>}
        </div>
    )
}