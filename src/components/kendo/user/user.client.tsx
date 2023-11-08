'use client';

import { useEffect, useState } from 'react';
import { KendoHorizontal } from '../menu/horizontal';
import { Button } from '@progress/kendo-react-buttons';

const THEME_KEY = 'quTheme';
const DEFAULT_BUTTON_CLASS = 'fa fa-';
const LIGHT_THEME_ICON_CLASS = 'sun-o';
const DARK_THEME_ICON_CLASS = 'moon-o';
const DARK_THEME_CLASS = 'dark-theme';

export function UserClient(props: UserClientModel) {
    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(true);
    const [buttonClass, setButtonClass] = useState('fa fa-sun-o');
    const [currentTheme, setCurrentTheme] = useState(Themes.Light);

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

    const changeTheme = (theme: Themes, isInitial: boolean = false) => {
        let newTheme: Themes = isInitial ? theme : getNextTheme(theme);
        let themeClass;
        if (newTheme === Themes.Dark) {
            themeClass = DARK_THEME_ICON_CLASS;
            document.documentElement.classList.add(DARK_THEME_CLASS);
        } else {
            newTheme = Themes.Light;
            themeClass = LIGHT_THEME_ICON_CLASS;
            document.documentElement.classList.remove(DARK_THEME_CLASS);
        }

        setCurrentTheme(newTheme);
        setButtonClass(`${DEFAULT_BUTTON_CLASS}${themeClass}`);

        if (!isInitial) {
            localStorage.setItem(THEME_KEY, newTheme);
        }
    };

    const getNextTheme = (currentTheme: Themes) => {
        if (currentTheme === Themes.Light) {
            return Themes.Dark;
        }

        return Themes.Light;
    };


    useEffect(() => {
        fetch('/sf/system/users/current').then((response) => {
            response.json().then((data) => {
                const user = data.value;

                setUser(user);
                setLoading(false);
            });
        });

        if (localStorage.getItem(THEME_KEY)) {
            changeTheme(localStorage.getItem(THEME_KEY) as Themes, true);
        }
    }, []);

    return (
      !loading && <div className="k-d-flex k-align-items-center">
        <img src={user.Avatar} width={32} height={32} className="k-rounded-full k-mr-2" />
        <KendoHorizontal items={items} />
        <Button
          onClick={() => changeTheme(currentTheme)}
          className="k-rounded-full k-ml-1"
          iconClass={buttonClass}
        />
      </div>
    );
}

enum Themes {
    Light = 'light',
    Dark = 'dark'
}

interface User {
    FirstName?: string;
    Avatar?: string;
}

export interface UserClientModel {
}
