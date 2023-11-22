import React, { useState, useEffect } from "react";
        import { UserService } from "../../../../services/UserService";
        import { PencilFill, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
        import { Button, Table } from "react-bootstrap";
        import { User } from "../../../../types/User";
        import { ModalType } from "../../../../types/ModalType";
        import UserModal from "./UserModal";

        const UserTable = () => {
        const [users, setUsers] = useState<User[]>([]);
        const [refreshData, setRefreshData] = useState(false);

        useEffect(() => {
        const fetchUsers = async () => {
        const users = await UserService.getUsers();
        setUsers(users);
        };

        fetchUsers();
        }, [refreshData]);

        const initializeNewUser = (): User => {
        return {
        id: 0,
        username: "",
        lastname: "",
        firstname: "",
        country: "",
        password: "",
        };
        };

        const [user, setUser] = useState<User>(initializeNewUser);

const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    const handleClick = (newTitle: string, user: User, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setUser(user);
    setShowModal(true);
    };

    return (
    <div className="m-3">
        <Button onClick={() => handleClick("CargarUsuario", initializeNewUser(), ModalType.CREATE)}>
        Cargar Usuario
    </Button>


    <Table>
        <thead>
            <tr>
                <th>ID</th>
                <th>NombreUsuario</th>
                <th>Apellido</th>
                <th>Nombre</th>
                <th>País</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
            <tr key={user.id} className={user.fechaBaja ? 'table-danger' : ''}>
            <td> {user.id} </td>
            <td> {user.username} </td>
            <td> {user.lastname} </td>
            <td> {user.firstname} </td>
            <td> {user.country} </td>
            <td>
                <Button variant="light" onClick={() => handleClick("Editar usuario", user, ModalType.UPDATE)}>
                <PencilFill color='orange' />
            </Button>
            {user.fechaBaja !== null && (
            <Button variant="light" onClick={() => handleClick("Dar de alta usuario", user, ModalType.RESTORE)}>
            <ArrowUp color='green' />
        </Button>
        )}
        {user.fechaBaja === null && (
        <Button variant="light" onClick={() => handleClick("Dar de baja usuario", user, ModalType.DELETE)}>
        <ArrowDown color='red' />
    </Button>
    )}
</td>
</tr>
        ))}
        </tbody>
        </Table>

        {showModal && (
<UserModal show={showModal} onHide={() => setShowModal(false)} title={title} modalType={modalType} user={user} refreshData={setRefreshData} /> )}
        </div>
        );
        };
        export default UserTable;