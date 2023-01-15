import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_dnsName}/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('buy-sell-power-tools-token', data.accessToken);
                        setToken(data.accessToken);
                    }
                })
        }
    }, [email]);
    return [token];
}

export default useToken;