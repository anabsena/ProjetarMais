import { useEffect, useState } from "react";
import useUserHook from "../../../../hooks/useUserHook";
import { ResponseUserDto } from "../../../../services/api-back";
import { Button } from "../../../../components/ui/button";
import { HiOutlineDotsVertical, HiOutlinePlus, HiOutlineUserCircle, HiOutlineXCircle, HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ListAdmin = () => {
    const { userControllerFindAll, userControllerDelete } = useUserHook();
    const navigate = useNavigate()

    const [users, setUsers] = useState<ResponseUserDto[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<ResponseUserDto | null>(null);
    const [isDeleted, setIsDeleted] = useState(false);
    useEffect(() => {
        const fecthUser = async () => {
            try {
                const response = await userControllerFindAll('', 1, 10);
                if (response.status === 200) {
                    if (response.data) {
                        setUsers(response.data.data);
                    }
                } else {
                    console.error("Error fetching users:", response.message);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fecthUser()
    }, [isDeleted])
    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };
    const handleOpenModal = (user: ResponseUserDto) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleClickNewUser = () => {
        navigate('/new-user');
    };
    const handleDeleteUser = async (userId: string) => {
        try {
            const response = await userControllerDelete(userId);
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== userId));
                setIsDeleted(true);
                handleCloseModal();
            } else {
                console.error("Error deleting user:", response.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <>
            <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
                Administradores(as)
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2 w-full justify-end">
                <Button onClick={handleClickNewUser}><HiOutlinePlus />Novo usuário</Button>
                <input
                    type="text"
                    placeholder="Pesquisar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 bg-transparent border border-secondary text-secondary rounded-xl focus:outline-none"
                />
                <HiSearch className="text-primary text-3xl hidden md:flex" />
            </div>
            {currentUsers.map((user) => (
                <div key={user.id} className="bg-[#CACEED] w-full rounded-xl p-4 flex gap-4 mt-4 items-center justify-between" >
                    <div className="flex gap-4 ">
                        <HiOutlineUserCircle className="text-6xl text-[#2F2E59] hidden md:flex" />
                        <div>
                            <h1 className="text-xl text-secondary font-semibold" style={{ fontFamily: "Mulish, sans-serif" }}>
                                Nome: {user.name}
                            </h1>
                            <h1 className="text-md text-secondary" style={{ fontFamily: "Mulish, sans-serif" }}>
                                Email: {user.email}
                            </h1>
                        </div>
                    </div>
                    <div className="relative">
                        <HiOutlineDotsVertical
                            className="text-4xl text-[#2F2E59] cursor-pointer"
                            onClick={() => {
                                if (showModal && selectedUser && selectedUser.id === user.id) {
                                    handleCloseModal();
                                } else {
                                    handleOpenModal(user);
                                }
                            }}
                        />
                        {showModal && selectedUser && selectedUser.id === user.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-[#1E1D40] rounded-xl shadow-lg z-10 border border-[#D9B341]">
                                <div className="flex flex-col gap-4 p-2">
                                    <button onClick={() => handleDeleteUser(user.id)} className="flex gap-2 items-center">
                                        <HiOutlineXCircle className="text-xl text-[#D9B341]" />
                                        <p className="text-white">Excluir</p>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))
            }
            {
                totalPages > 1 && (
                    <div className="mt-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => paginate(page)}
                                className={`mx-1 p-2 rounded-md ${currentPage === page ? 'bg-[#636BA6] text-white' : 'bg-[#1E1D40] text-[#F2F4FF]'}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default ListAdmin;