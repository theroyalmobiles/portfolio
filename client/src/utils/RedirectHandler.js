import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const checkRedirect = async () => {
            try {
                const response = await fetch(location.pathname, { method: "HEAD" });
                if (response.status === 301) {
                    setShouldRedirect(true);
                }
            } catch (error) {
                console.error("Error checking redirect status:", error);
            }
        };
        checkRedirect();
    }, [location.pathname]);

    useEffect(() => {
        if (shouldRedirect) {
            navigate("/redt", { replace: true });
        }
    }, [shouldRedirect, navigate]);

    return null;
};

export default RedirectHandler;
