import { NbAccessControl } from "@nebular/security";

export const AccessControl: NbAccessControl[] = [
    {
        guest: {
            create: ['pages:dashboard', 'pages:other'],
            read: ['pages:dashboard', ],
            update: ['pages:dashboard', 'pages:other'],
            delete: ['pages:dashboard', 'pages:other'],
        },
        user: {
            parent: 'guest',
            create: [],
            read: ['pages:other'],
            update: [],
            delete: [],
        }
    }
]