import {MenuItem} from "primeng/api";
import {ROUTE_NAMES} from "../../constants/route-names";

export const NAV_OPTIONS: MenuItem[] = [
    {
        label: 'About Me',
        icon: 'pi pi-fw pi-user',
        route: `/${ROUTE_NAMES.ABOUT_ME}`
    }, {
        label: 'Work Experience',
        icon: 'pi pi-fw pi-briefcase',
        route: `/${ROUTE_NAMES.EXPERIENCE}`
    }, {
        label: 'Contact',
        icon: 'pi pi-fw pi-envelope',
        route: `/${ROUTE_NAMES.CONTACT}`
    },
    
]
