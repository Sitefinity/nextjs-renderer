'use client';

import { useEffect, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';

const THEME_KEY = 'quTheme';
const DEFAULT_BUTTON_CLASS = 'fa fa-';
const LIGHT_THEME_ICON_CLASS = 'sun-o';
const DARK_THEME_ICON_CLASS = 'moon-o';
const DARK_THEME_CLASS = 'dark-theme';

export function ThemeButtonClient() {
    const [loading, setLoading] = useState(true);
    const [buttonClass, setButtonClass] = useState('fa fa-sun-o');
    const [currentTheme, setCurrentTheme] = useState(Themes.Light);

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
        if (localStorage.getItem(THEME_KEY)) {
            changeTheme(localStorage.getItem(THEME_KEY) as Themes, true);
            setLoading(false);
        }
    }, []);

    return (
        !loading && <div className="k-d-flex k-align-items-center">
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
