export const getRoleFromToken = () => {

    const token = localStorage.getItem("token");

    if (!token) return null;

    try {

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        return payload.role;

    } catch (error) {

        console.log(error);
        return null;
    }
};