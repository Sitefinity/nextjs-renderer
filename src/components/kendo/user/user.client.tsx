'use client';

import { useEffect, useState } from 'react';
import { KendoHorizontal } from '../menu/horizontal';

export function UserClient() {
    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(true);

    const items = [
        {
            Title: user.FirstName,
            ChildNodes: [
                {
                    Title: 'Profile',
                    Url: '/home'
                },
                {
                    Title: 'Settings',
                    Url: '/home'
                },
                {
                    Title: 'Log out',
                    Url: '/Sitefinity/SignOut'
                }
            ]
        }
    ];


    useEffect(() => {
        fetch('/sf/system/users/current').then((response) => {
            response.json().then((data) => {
                const user = data.value;

                setUser(user);
                setLoading(false);
            });
        });
    }, []);

    return (
      !loading && <div className="k-d-flex k-align-items-center">
        <img src={user.Avatar} width={32} height={32} className="k-rounded-full k-mr-2" />
        <KendoHorizontal items={items} />
      </div>
    );
}

interface User {
    FirstName?: string;
    Avatar?: string;
}
