import React, { useState } from "react";
        import { Button, Form, Modal } from "react-bootstrap";
        import { useFormik } from "formik";
        import { toast } from 'react-toastify';

        import { User } from "../../../../types/User";
        import { ModalType } from "../../../../types/ModalType";
        import { UserService } from "../../../../services/UserService";

        type UserModalProps = {
        show: boolean;
        onHide: () => void;
        title: string;
        modalType: ModalType;
        user: User;
        refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserModal: React.FC<UserModalProps> = ({
    show,
    onHide,
    title,
    modalType,
    user,
    refreshData,
    }) => {
    const formik = useFormik({
    initialValues: user,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (formData: User) => handleSave(formData),
    });

    const handleSave = async (formData: User) => {
    try {
    if (modalType === ModalType.CREATE) {
    await UserService.createUser(formData);
    } else if (modalType === ModalType.UPDATE) {
    await UserService.updateUser(formData.id!, formData);
    }

    toast.success(modalType === ModalType.CREATE ? "Usuario Creado" : "Usuario Actualizado", {
    position: "top-center",
    });

    onHide();
    refreshData(prevState => !prevState);
    } catch (error) {
    console.error("Error saving user:", error);
    toast.error('Ha ocurrido un error');
    }
    };

    const handleDelete = async () => {
    try {
    // Lógica para dar de baja al usuario
    } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Ha ocurrido un error al eliminar el usuario");
    }
    };

    const handleRestore = async () => {
    try {
    // Lógica para dar de alta al usuario
    } catch (error) {
    console.error("Error restoring user:", error);
    toast.error("Ha ocurrido un error al restaurar el usuario");
    }
    };

    return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
    <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {/* Campos del formulario adaptados a la entidad User */}
        <Form onSubmit={formik.handleSubmit}>
        {/* ... Otros campos de formulario ... */}

        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
            Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={!formik.isValid}>
        Guardar
    </Button>
</Modal.Footer>
</Form>
        </Modal.Body>
        </Modal>
        );
        };

        export default UserModal;