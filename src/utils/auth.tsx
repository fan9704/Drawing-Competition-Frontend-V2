import reactUseCookie from "react-use-cookie";

import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const [, setTeamToken] = reactUseCookie("teamToken");

    const navigate = useNavigate();

    const onLogout = () => {
        setTeamToken("", {
            days: -1,
        });
        navigate("/");
    };

    return onLogout;
}
